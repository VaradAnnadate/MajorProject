import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { WebSocket, WebSocketServer } from 'ws';
import { CLASSROOM_QUESTS } from '../src/features/classroom/data/classroomQuests.js';
import {
  CLIENT_MESSAGE_TYPES,
  MAX_ROOM_PARTICIPANTS,
  ROOM_PIN_PATTERN,
  ROOM_STATES,
  SERVER_MESSAGE_TYPES,
  createRoomPin,
} from '../src/features/classroom/engine/classroomTypes.js';
import { getAvatarByCodename } from '../src/features/classroom/data/animalAvatars.js';

const PORT = Number(process.env.CLASSROOM_PORT || 8787);
const HOST = process.env.CLASSROOM_HOST || '0.0.0.0';
const ROOM_TTL_MS = 3 * 60 * 60 * 1000;
const questIds = new Set(CLASSROOM_QUESTS.map((quest) => quest.id));
const allowedOrigins = new Set(
  (process.env.CLASSROOM_ALLOWED_ORIGINS || 'http://localhost:5173,http://127.0.0.1:5173')
    .split(',')
    .map((origin) => origin.trim())
    .filter(Boolean)
);
const rooms = new Map();

const httpServer = createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'content-type': 'application/json' });
    response.end(JSON.stringify({ ok: true, service: 'rightsquest-classroom' }));
    return;
  }

  response.writeHead(404, { 'content-type': 'text/plain' });
  response.end('Not found');
});

const socketServer = new WebSocketServer({
  noServer: true,
  maxPayload: 2048,
  perMessageDeflate: false,
});

function send(socket, type, payload = {}) {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({ type, ...payload }));
  }
}

function sendError(socket, message) {
  send(socket, SERVER_MESSAGE_TYPES.ROOM_ERROR, { message });
}

function buildRoomState(room, socket) {
  const revealTally = [
    ROOM_STATES.CONSENSUS_REVEAL,
    ROOM_STATES.DEBATE_GUIDE,
    ROOM_STATES.COMPLETED,
  ].includes(room.stage);
  const participants = socket.role === 'teacher'
    ? [...room.participants.values()]
      .filter((participant) => participant.role === 'student')
      .map(({ codename, avatarId }) => ({ codename, avatarId }))
    : [];

  return {
    roomPin: room.pin,
    questId: room.questId,
    stage: room.stage,
    participantCount: [...room.participants.values()].filter((participant) => participant.role === 'student').length,
    participants,
    voteCount: room.votes.size,
    tally: revealTally ? [...room.tally.entries()].map(([optionId, count]) => ({ optionId, count })) : null,
    myVoteOptionId: socket.role === 'student' ? room.votes.get(socket.participantId) || null : null,
    updatedAt: room.updatedAt,
  };
}

function broadcastRoom(room, type = SERVER_MESSAGE_TYPES.ROOM_STATE) {
  for (const participant of room.participants.values()) {
    send(participant.socket, type, { room: buildRoomState(room, participant.socket) });
  }
}

function recalculateTally(room) {
  const tally = new Map();
  for (const optionId of room.votes.values()) {
    tally.set(optionId, (tally.get(optionId) || 0) + 1);
  }
  room.tally = tally;
}

function createRoom(socket, message) {
  if (socket.roomPin) {
    sendError(socket, 'This connection already belongs to a room.');
    return;
  }

  if (!questIds.has(message.questId)) {
    sendError(socket, 'Choose one of the available classroom dilemmas.');
    return;
  }

  let pin = createRoomPin();
  for (let attempt = 0; rooms.has(pin) && attempt < 20; attempt += 1) pin = createRoomPin();
  if (rooms.has(pin)) {
    sendError(socket, 'A room could not be created just now. Please try again.');
    return;
  }

  const participantId = randomUUID();
  const room = {
    pin,
    questId: message.questId,
    stage: ROOM_STATES.LOBBY,
    participants: new Map(),
    votes: new Map(),
    tally: new Map(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  const participant = { id: participantId, role: 'teacher', socket };
  room.participants.set(participantId, participant);
  rooms.set(pin, room);
  socket.roomPin = pin;
  socket.participantId = participantId;
  socket.role = 'teacher';
  send(socket, SERVER_MESSAGE_TYPES.ROOM_CREATED, { room: buildRoomState(room, socket) });
}

function joinRoom(socket, message) {
  if (socket.roomPin) {
    sendError(socket, 'This connection already belongs to a room.');
    return;
  }

  const pin = String(message.roomPin || '').trim().toUpperCase();
  const avatar = getAvatarByCodename(message.codename);
  const participantId = String(message.participantId || '');
  if (!ROOM_PIN_PATTERN.test(pin) || !avatar || !/^[\w-]{8,80}$/.test(participantId)) {
    sendError(socket, 'Enter a valid room PIN and choose an animal codename.');
    return;
  }

  const room = rooms.get(pin);
  if (!room || room.stage === ROOM_STATES.COMPLETED) {
    sendError(socket, 'That room is no longer open. Check the PIN with your teacher.');
    return;
  }
  if (room.stage !== ROOM_STATES.LOBBY) {
    sendError(socket, 'This room has already started. Ask your teacher before joining.');
    return;
  }

  const oldParticipant = room.participants.get(participantId);
  if (!oldParticipant && room.participants.size - 1 >= MAX_ROOM_PARTICIPANTS) {
    sendError(socket, `This room has reached its limit of ${MAX_ROOM_PARTICIPANTS} students.`);
    return;
  }
  if (oldParticipant) oldParticipant.socket.close(4000, 'Reconnected in another tab');

  const participant = {
    id: participantId,
    role: 'student',
    codename: avatar.codename,
    avatarId: avatar.id,
    socket,
  };
  room.participants.set(participantId, participant);
  room.updatedAt = Date.now();
  socket.roomPin = pin;
  socket.participantId = participantId;
  socket.role = 'student';
  send(socket, SERVER_MESSAGE_TYPES.ROOM_JOINED, { room: buildRoomState(room, socket) });
  broadcastRoom(room);
}

function applyTeacherAction(socket, message) {
  const room = rooms.get(socket.roomPin);
  if (!room || socket.role !== 'teacher') {
    sendError(socket, 'Only the classroom facilitator can change the room.');
    return;
  }

  const allowedNextStages = {
    'open-voting': [ROOM_STATES.LOBBY, ROOM_STATES.VOTING_OPEN],
    'close-voting': [ROOM_STATES.VOTING_OPEN, ROOM_STATES.VOTING_CLOSED],
    'reveal-results': [ROOM_STATES.VOTING_CLOSED, ROOM_STATES.CONSENSUS_REVEAL],
    'start-debate': [ROOM_STATES.CONSENSUS_REVEAL, ROOM_STATES.DEBATE_GUIDE],
    'finish-room': [ROOM_STATES.DEBATE_GUIDE, ROOM_STATES.COMPLETED],
  };
  const nextStage = allowedNextStages[message.action];
  if (!nextStage || nextStage[0] !== room.stage) {
    sendError(socket, 'That facilitator action is not available at this point.');
    return;
  }

  room.stage = nextStage[1];
  room.updatedAt = Date.now();
  broadcastRoom(room);
}

function castVote(socket, message) {
  const room = rooms.get(socket.roomPin);
  const quest = CLASSROOM_QUESTS.find((item) => item.id === room?.questId);
  if (!room || socket.role !== 'student' || room.stage !== ROOM_STATES.VOTING_OPEN) {
    sendError(socket, 'Voting is not open yet.');
    return;
  }
  if (!quest.options.some((option) => option.id === message.optionId)) {
    sendError(socket, 'Choose one of the options on your screen.');
    return;
  }

  room.votes.set(socket.participantId, message.optionId);
  room.updatedAt = Date.now();
  recalculateTally(room);
  broadcastRoom(room);
}

function leaveRoom(socket) {
  const room = rooms.get(socket.roomPin);
  if (!room) return;

  if (socket.role === 'teacher') {
    for (const participant of room.participants.values()) {
      if (participant.socket !== socket) {
        sendError(participant.socket, 'The facilitator has closed this room.');
        participant.socket.close(1000, 'Room closed');
      }
    }
    rooms.delete(room.pin);
    return;
  }

  room.participants.delete(socket.participantId);
  room.votes.delete(socket.participantId);
  recalculateTally(room);
  room.updatedAt = Date.now();
  if (room.participants.size <= 1) {
    rooms.delete(room.pin);
    return;
  }
  broadcastRoom(room);
}

socketServer.on('connection', (socket) => {
  socket.isAlive = true;
  socket.on('pong', () => { socket.isAlive = true; });
  socket.on('error', () => {});
  socket.on('message', (rawMessage) => {
    let message;
    try {
      message = JSON.parse(rawMessage.toString());
    } catch {
      sendError(socket, 'The message could not be read. Please try again.');
      return;
    }

    if (!message || typeof message !== 'object' || Array.isArray(message)) {
      sendError(socket, 'The message could not be read. Please try again.');
      return;
    }
    switch (message.type) {
      case CLIENT_MESSAGE_TYPES.CREATE_ROOM:
        createRoom(socket, message);
        break;
      case CLIENT_MESSAGE_TYPES.JOIN_ROOM:
        joinRoom(socket, message);
        break;
      case CLIENT_MESSAGE_TYPES.TEACHER_ACTION:
        applyTeacherAction(socket, message);
        break;
      case CLIENT_MESSAGE_TYPES.STUDENT_VOTE:
        castVote(socket, message);
        break;
      default:
        sendError(socket, 'This classroom action is not recognized.');
    }
  });
  socket.on('close', () => leaveRoom(socket));
});

const heartbeat = setInterval(() => {
  for (const socket of socketServer.clients) {
    if (!socket.isAlive) {
      socket.terminate();
      continue;
    }
    socket.isAlive = false;
    socket.ping();
  }
  for (const room of rooms.values()) {
    if (Date.now() - room.createdAt > ROOM_TTL_MS) {
      for (const participant of room.participants.values()) {
        sendError(participant.socket, 'This classroom room has expired.');
        participant.socket.close(1000, 'Room expired');
      }
      rooms.delete(room.pin);
    }
  }
}, 30_000);
heartbeat.unref();

httpServer.on('upgrade', (request, socket, head) => {
  let pathname;
  try {
    pathname = new URL(request.url, 'http://localhost').pathname;
  } catch {
    socket.destroy();
    return;
  }

  if (pathname !== '/classroom' || !allowedOrigins.has(request.headers.origin)) {
    socket.write('HTTP/1.1 403 Forbidden\r\n\r\n');
    socket.destroy();
    return;
  }

  socketServer.handleUpgrade(request, socket, head, (client) => {
    socketServer.emit('connection', client, request);
  });
});

httpServer.listen(PORT, HOST, () => {
  console.log(`RightsQuest classroom relay listening on ${HOST}:${PORT}`);
});

function shutdown() {
  clearInterval(heartbeat);
  for (const socket of socketServer.clients) socket.close(1001, 'Server shutting down');
  socketServer.close(() => httpServer.close(() => process.exit(0)));
  setTimeout(() => process.exit(1), 3_000).unref();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
