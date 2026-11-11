export const ROOM_STATES = Object.freeze({
  LOBBY: 'LOBBY',
  VOTING_OPEN: 'VOTING_OPEN',
  VOTING_CLOSED: 'VOTING_CLOSED',
  CONSENSUS_REVEAL: 'CONSENSUS_REVEAL',
  DEBATE_GUIDE: 'DEBATE_GUIDE',
  COMPLETED: 'COMPLETED',
});

export const ROOM_PIN_PREFIX = 'RQ-';
export const ROOM_PIN_PATTERN = /^RQ-\d{4}$/;
export const MAX_ROOM_PARTICIPANTS = 40;

export const CLIENT_MESSAGE_TYPES = Object.freeze({
  CREATE_ROOM: 'room:create',
  JOIN_ROOM: 'room:join',
  TEACHER_ACTION: 'teacher:action',
  STUDENT_VOTE: 'student:vote',
});

export const SERVER_MESSAGE_TYPES = Object.freeze({
  ROOM_CREATED: 'room:created',
  ROOM_JOINED: 'room:joined',
  ROOM_STATE: 'room:state',
  ROOM_ERROR: 'room:error',
});

export function createRoomPin(random = Math.random) {
  return `${ROOM_PIN_PREFIX}${String(Math.floor(random() * 10000)).padStart(4, '0')}`;
}

export function isRoomPin(value) {
  return ROOM_PIN_PATTERN.test(String(value || '').trim().toUpperCase());
}
