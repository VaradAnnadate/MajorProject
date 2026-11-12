const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
let summaryCache = { sessions: [], enabled: false };
let summaryCacheUntil = 0;
let summaryRequest = null;

export async function fetchClassroomSummaries() {
  if (Date.now() < summaryCacheUntil) return summaryCache;
  if (summaryRequest) return summaryRequest;

  summaryRequest = fetch(`${API_BASE_URL}/api/classroom/summaries`, {
    credentials: 'omit',
    headers: { accept: 'application/json' },
  })
    .then(async (response) => {
      if (!response.ok) throw new Error('Classroom summaries are unavailable.');
      const result = await response.json();
      summaryCache = {
        sessions: Array.isArray(result.sessions) ? result.sessions : [],
        enabled: result.enabled === true,
      };
      summaryCacheUntil = Date.now() + 15_000;
      return summaryCache;
    })
    .finally(() => { summaryRequest = null; });
  return summaryRequest;
}

export async function sendMitraMessages(messages) {
  const response = await fetch(`${API_BASE_URL}/api/mitra/chat`, {
    method: 'POST',
    credentials: 'omit',
    headers: { 'content-type': 'application/json', accept: 'application/json' },
    body: JSON.stringify({ messages }),
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || 'Mitra could not answer right now.');
  return result.answer;
}
