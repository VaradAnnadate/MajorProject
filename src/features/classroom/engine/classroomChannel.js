function defaultWebSocketUrl() {
  const configuredUrl = import.meta.env.VITE_CLASSROOM_WS_URL;
  if (configuredUrl) return configuredUrl;

  const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${protocol}//${window.location.hostname}:8787/classroom`;
}

export function createClassroomChannel({ onMessage, onStatus, onError, initialMessage, url = defaultWebSocketUrl() }) {
  if (typeof window === 'undefined' || typeof window.WebSocket !== 'function') {
    onError?.('Live classroom rooms need a browser with WebSocket support.');
    return null;
  }

  onStatus?.('connecting');
  let socket;
  try {
    socket = new WebSocket(url);
  } catch {
    onStatus?.('disconnected');
    onError?.('The classroom server could not be reached. Check the connection settings.');
    return null;
  }

  socket.addEventListener('open', () => {
    onStatus?.('connected');
    if (initialMessage) socket.send(JSON.stringify(initialMessage));
  });
  socket.addEventListener('message', (event) => {
    try {
      onMessage?.(JSON.parse(event.data));
    } catch {
      onError?.('A classroom update could not be read. Please reconnect.');
    }
  });
  socket.addEventListener('error', () => {
    onStatus?.('disconnected');
    onError?.('The classroom server is unavailable. Ask the facilitator to reconnect.');
  });
  socket.addEventListener('close', () => onStatus?.('disconnected'));

  return {
    send(message) {
      if (socket.readyState !== WebSocket.OPEN) return false;
      socket.send(JSON.stringify(message));
      return true;
    },
    close() {
      if (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING) {
        socket.close(1000, 'Leaving classroom');
      }
    },
  };
}
