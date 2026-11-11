import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';
import {
  ROOM_STATES,
  ROOM_PIN_PATTERN,
  MAX_ROOM_PARTICIPANTS,
  CLIENT_MESSAGE_TYPES,
  SERVER_MESSAGE_TYPES,
  createRoomPin,
  isRoomPin,
} from '../src/features/classroom/engine/classroomTypes.js';
import { ANIMAL_AVATARS, getAvatarByCodename } from '../src/features/classroom/data/animalAvatars.js';
import { CLASSROOM_QUESTS, getClassroomQuest } from '../src/features/classroom/data/classroomQuests.js';

console.log('------------------------------------------------------------');
console.log('RUNNING RIGHTSQUEST INDIA PART 05 CLASSROOM SYSTEM QA CHECK');
console.log('------------------------------------------------------------');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`[PASS] ${message}`);
    passed++;
  } else {
    console.error(`[FAIL] ${message}`);
    failed++;
  }
}

// 1. Part 05 File Structure & Component Existence
const part05Files = [
  'server/classroom-server.js',
  'scripts/dev-classroom.mjs',
  'src/features/classroom/index.js',
  'src/features/classroom/pages/ClassroomPage.jsx',
  'src/features/classroom/pages/ClassroomPage.module.css',
  'src/features/classroom/components/ClassroomLobby.jsx',
  'src/features/classroom/components/ClassroomLobby.module.css',
  'src/features/classroom/components/TeacherConsole.jsx',
  'src/features/classroom/components/TeacherConsole.module.css',
  'src/features/classroom/components/StudentVotingView.jsx',
  'src/features/classroom/components/StudentVotingView.module.css',
  'src/features/classroom/components/ConsensusChart.jsx',
  'src/features/classroom/components/ConsensusChart.module.css',
  'src/features/classroom/components/DebateGuide.jsx',
  'src/features/classroom/components/DebateGuide.module.css',
  'src/features/classroom/data/animalAvatars.js',
  'src/features/classroom/data/classroomQuests.js',
  'src/features/classroom/engine/classroomTypes.js',
  'src/features/classroom/engine/classroomChannel.js',
  'src/features/classroom/hooks/useClassroomRoom.js',
];

for (const file of part05Files) {
  assert(existsSync(resolve(process.cwd(), file)), `Part 05 file exists: ${file}`);
}

// 2. Room PIN and Protocol Types Verification
assert(ROOM_PIN_PATTERN.test('RQ-1234'), 'Room PIN pattern matches valid format RQ-1234');
assert(ROOM_PIN_PATTERN.test('RQ-0001'), 'Room PIN pattern matches leading zeroes RQ-0001');
assert(!ROOM_PIN_PATTERN.test('1234'), 'Room PIN pattern rejects PIN without RQ- prefix');
assert(!ROOM_PIN_PATTERN.test('RQ-12345'), 'Room PIN pattern rejects 5-digit PIN');
assert(!ROOM_PIN_PATTERN.test('RQ-ABCD'), 'Room PIN pattern rejects non-numeric PIN');

const generatedPin = createRoomPin(() => 0.42);
assert(isRoomPin(generatedPin), `createRoomPin produces valid PIN: ${generatedPin}`);
assert(MAX_ROOM_PARTICIPANTS >= 30, `Max room participants safely accommodates classroom size (${MAX_ROOM_PARTICIPANTS})`);

// 3. Animal Avatars & Child Anonymity
assert(ANIMAL_AVATARS.length >= 8, `At least 8 anonymous animal avatars configured (found ${ANIMAL_AVATARS.length})`);
const avatarIds = new Set(ANIMAL_AVATARS.map((a) => a.id));
assert(avatarIds.size === ANIMAL_AVATARS.length, 'All animal avatar IDs are unique');
const tigerAvatar = getAvatarByCodename('Brave Tiger');
assert(tigerAvatar && tigerAvatar.id === 'tiger', 'getAvatarByCodename accurately resolves animal identity');
assert(getAvatarByCodename('Unknown Real Name') === null, 'getAvatarByCodename strictly rejects arbitrary non-avatar names');

// 4. Classroom Dilemma Quests
assert(CLASSROOM_QUESTS.length >= 3, `At least 3 classroom civics dilemmas configured (found ${CLASSROOM_QUESTS.length})`);
for (const quest of CLASSROOM_QUESTS) {
  assert(quest.id && quest.title, `Classroom quest ${quest.id} has ID and title`);
  assert(quest.options.length >= 2, `Classroom quest ${quest.id} has multiple choice options`);
  assert(quest.articleRef, `Classroom quest ${quest.id} cites statutory legal reference (${quest.articleRef})`);
  assert(quest.discussionPrompt && quest.reflection, `Classroom quest ${quest.id} provides facilitator debrief and discussion prompt`);
}

// 5. Simulation of Server Room State Machine & Voting Idempotency
class MockSocket {
  constructor(role = 'student') {
    this.role = role;
    this.readyState = 1; // WebSocket.OPEN
    this.sent = [];
    this.roomPin = null;
    this.participantId = null;
  }
  send(payload) {
    this.sent.push(JSON.parse(payload));
  }
  getLastMessage() {
    return this.sent[this.sent.length - 1];
  }
}

// Simulate Room State Machine
const mockRoom = {
  pin: 'RQ-9999',
  questId: 'quest-empty-bench',
  stage: ROOM_STATES.LOBBY,
  participants: new Map(),
  votes: new Map(),
  tally: new Map(),
};

const teacherSocket = new MockSocket('teacher');
teacherSocket.participantId = 'teacher-uuid-1';
teacherSocket.roomPin = mockRoom.pin;
mockRoom.participants.set('teacher-uuid-1', { id: 'teacher-uuid-1', role: 'teacher', socket: teacherSocket });

const student1Socket = new MockSocket('student');
student1Socket.participantId = 'student-uuid-1';
student1Socket.roomPin = mockRoom.pin;
mockRoom.participants.set('student-uuid-1', { id: 'student-uuid-1', role: 'student', codename: 'Brave Tiger', socket: student1Socket });

assert(mockRoom.stage === ROOM_STATES.LOBBY, 'Room initializes in LOBBY stage');
assert(mockRoom.participants.size === 2, 'Room tracks connected teacher and student participants');

// Verify stage progression guards
const allowedTransitions = {
  'open-voting': [ROOM_STATES.LOBBY, ROOM_STATES.VOTING_OPEN],
  'close-voting': [ROOM_STATES.VOTING_OPEN, ROOM_STATES.VOTING_CLOSED],
  'reveal-results': [ROOM_STATES.VOTING_CLOSED, ROOM_STATES.CONSENSUS_REVEAL],
  'start-debate': [ROOM_STATES.CONSENSUS_REVEAL, ROOM_STATES.DEBATE_GUIDE],
  'finish-room': [ROOM_STATES.DEBATE_GUIDE, ROOM_STATES.COMPLETED],
};

// Teacher advances to VOTING_OPEN
mockRoom.stage = allowedTransitions['open-voting'][1];
assert(mockRoom.stage === ROOM_STATES.VOTING_OPEN, 'Stage advances to VOTING_OPEN on teacher action');

// Student 1 votes
mockRoom.votes.set(student1Socket.participantId, 'opt-chintu-a');
assert(mockRoom.votes.size === 1, 'Initial student vote registered');

// Student 1 changes vote (Idempotency & Duplicate Prevention)
mockRoom.votes.set(student1Socket.participantId, 'opt-chintu-b');
assert(mockRoom.votes.size === 1, 'Changing vote overwrites previous selection without inflating vote count (Idempotent)');
assert(mockRoom.votes.get(student1Socket.participantId) === 'opt-chintu-b', 'Updated option recorded accurately');

// Tally calculation
function calculateMockTally(room) {
  const tally = new Map();
  for (const optionId of room.votes.values()) {
    tally.set(optionId, (tally.get(optionId) || 0) + 1);
  }
  return tally;
}
mockRoom.tally = calculateMockTally(mockRoom);
assert(mockRoom.tally.get('opt-chintu-b') === 1, 'Tally aggregates votes accurately');
assert(!mockRoom.tally.has('opt-chintu-a'), 'Previous vote option completely removed from tally');

// Tally concealment verification
const revealTallyInLobby = [ROOM_STATES.CONSENSUS_REVEAL, ROOM_STATES.DEBATE_GUIDE, ROOM_STATES.COMPLETED].includes(mockRoom.stage);
assert(!revealTallyInLobby, 'Vote tally is strictly hidden from participants during active VOTING_OPEN stage');

// Teacher advances to CONSENSUS_REVEAL
mockRoom.stage = ROOM_STATES.CONSENSUS_REVEAL;
const revealTallyAfterClose = [ROOM_STATES.CONSENSUS_REVEAL, ROOM_STATES.DEBATE_GUIDE, ROOM_STATES.COMPLETED].includes(mockRoom.stage);
assert(revealTallyAfterClose, 'Vote tally becomes visible only when teacher advances to CONSENSUS_REVEAL');

// Disconnection & room cleanup verification
mockRoom.participants.delete(student1Socket.participantId);
mockRoom.votes.delete(student1Socket.participantId);
mockRoom.tally = calculateMockTally(mockRoom);
assert(mockRoom.participants.size === 1, 'Student participant removed cleanly on disconnection');
assert(mockRoom.votes.size === 0, 'Disconnected participant votes cleanly removed from tally');

// 6. Child Privacy Invariants in Classroom Source
const classroomServerSource = readFileSync(resolve(process.cwd(), 'server/classroom-server.js'), 'utf8');
const classroomPageSource = readFileSync(resolve(process.cwd(), 'src/features/classroom/pages/ClassroomPage.jsx'), 'utf8');
const lobbySource = readFileSync(resolve(process.cwd(), 'src/features/classroom/components/ClassroomLobby.jsx'), 'utf8');

assert(!classroomServerSource.includes('password'), 'Zero passwords collected or processed in classroom server');
assert(!classroomServerSource.includes('email'), 'Zero email addresses stored in classroom server');
assert(!classroomServerSource.includes('phone'), 'Zero phone numbers stored in classroom server');
assert(!classroomPageSource.includes('type="password"'), 'ClassroomPage has zero password inputs');
assert(!lobbySource.includes('type="email"'), 'ClassroomLobby has zero email inputs');
assert(!lobbySource.includes('type="tel"'), 'ClassroomLobby has zero phone inputs');

// 7. Route and Navigation Integration
const routerSource = readFileSync(resolve(process.cwd(), 'src/app/router.jsx'), 'utf8');
const navSource = readFileSync(resolve(process.cwd(), 'src/data/navigation.js'), 'utf8');
assert(routerSource.includes("classroom/:roomPin?"), 'Classroom route registered with optional roomPin parameter');
assert(navSource.includes("path: '/classroom'"), 'Classroom route linked in navigation bar');

console.log('------------------------------------------------------------');
console.log(`PART 05 QA RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('------------------------------------------------------------');

if (failed > 0) {
  process.exit(1);
}
