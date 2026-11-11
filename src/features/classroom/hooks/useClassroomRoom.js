import { useCallback, useEffect, useRef, useState } from 'react';
import { CLIENT_MESSAGE_TYPES, SERVER_MESSAGE_TYPES } from '../engine/classroomTypes';
import { createClassroomChannel } from '../engine/classroomChannel';

function createParticipantId() {
  if (globalThis.crypto?.randomUUID) return globalThis.crypto.randomUUID();
  return `student-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

export function useClassroomRoom() {
  const channelRef = useRef(null);
  const [room, setRoom] = useState(null);
  const [role, setRole] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('idle');
  const [error, setError] = useState('');

  const handleMessage = useCallback((message) => {
    if (message.type === SERVER_MESSAGE_TYPES.ROOM_ERROR) {
      setError(message.message || 'The classroom could not complete that action.');
      return;
    }
    if ([
      SERVER_MESSAGE_TYPES.ROOM_CREATED,
      SERVER_MESSAGE_TYPES.ROOM_JOINED,
      SERVER_MESSAGE_TYPES.ROOM_STATE,
    ].includes(message.type)) {
      setError('');
      setRoom(message.room || null);
    }
  }, []);

  const connect = useCallback((firstMessage, nextRole) => {
    channelRef.current?.close();
    setRoom(null);
    setError('');
    setRole(nextRole);

    const channel = createClassroomChannel({
      onMessage: handleMessage,
      onStatus: setConnectionStatus,
      onError: setError,
      initialMessage: firstMessage,
    });
    channelRef.current = channel;
    if (!channel) return;
  }, [handleMessage]);

  const createRoom = useCallback((questId) => {
    connect({ type: CLIENT_MESSAGE_TYPES.CREATE_ROOM, questId }, 'teacher');
  }, [connect]);

  const joinRoom = useCallback(({ roomPin, codename }) => {
    connect({
      type: CLIENT_MESSAGE_TYPES.JOIN_ROOM,
      roomPin,
      codename,
      participantId: createParticipantId(),
    }, 'student');
  }, [connect]);

  const send = useCallback((message) => {
    const sent = channelRef.current?.send(message) || false;
    if (!sent) setError('The classroom connection is not active. Rejoin the room to continue.');
    return sent;
  }, []);

  const facilitatorAction = useCallback((action) => {
    return send({ type: CLIENT_MESSAGE_TYPES.TEACHER_ACTION, action });
  }, [send]);

  const castVote = useCallback((optionId) => {
    return send({ type: CLIENT_MESSAGE_TYPES.STUDENT_VOTE, optionId });
  }, [send]);

  const disconnect = useCallback(() => {
    channelRef.current?.close();
    channelRef.current = null;
    setRoom(null);
    setRole(null);
    setConnectionStatus('idle');
    setError('');
  }, []);

  const clearError = useCallback(() => setError(''), []);

  useEffect(() => () => channelRef.current?.close(), []);

  return {
    room,
    role,
    connectionStatus,
    error,
    createRoom,
    joinRoom,
    facilitatorAction,
    castVote,
    disconnect,
    clearError,
  };
}
