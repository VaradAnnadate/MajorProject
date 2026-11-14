const DATABASE_NAME = 'rightsquest-offline-quests';
const DATABASE_VERSION = 1;
const QUEST_STORE = 'quests';

function openQuestDatabase() {
  if (typeof indexedDB === 'undefined') return Promise.resolve(null);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(QUEST_STORE)) {
        database.createObjectStore(QUEST_STORE, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Could not open the offline quest store.'));
  });
}

export async function cacheOfflineQuests(scenarios) {
  const database = await openQuestDatabase();
  if (!database) return 0;

  const uniqueScenarios = [...new Map(
    (Array.isArray(scenarios) ? scenarios : [])
      .filter((scenario) => scenario?.id && Array.isArray(scenario.chapters))
      .map((scenario) => [scenario.id, scenario])
  ).values()];

  try {
    await new Promise((resolve, reject) => {
      const transaction = database.transaction(QUEST_STORE, 'readwrite');
      const store = transaction.objectStore(QUEST_STORE);
      uniqueScenarios.forEach((scenario) => store.put({
        id: scenario.id,
        title: scenario.title,
        cachedAt: new Date().toISOString(),
        scenario,
      }));
      transaction.oncomplete = resolve;
      transaction.onerror = () => reject(transaction.error || new Error('Could not save offline quests.'));
      transaction.onabort = () => reject(transaction.error || new Error('Offline quest save was cancelled.'));
    });
    return uniqueScenarios.length;
  } finally {
    database.close();
  }
}

export async function getOfflineQuest(scenarioId) {
  const database = await openQuestDatabase();
  if (!database) return null;

  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(QUEST_STORE, 'readonly');
      const request = transaction.objectStore(QUEST_STORE).get(scenarioId);
      request.onsuccess = () => resolve(request.result?.scenario || null);
      request.onerror = () => reject(request.error || new Error('Could not read the saved quest.'));
    });
  } finally {
    database.close();
  }
}

export async function getOfflineQuestCount() {
  const database = await openQuestDatabase();
  if (!database) return 0;

  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(QUEST_STORE, 'readonly');
      const request = transaction.objectStore(QUEST_STORE).count();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not count saved quests.'));
    });
  } finally {
    database.close();
  }
}

export async function listOfflineQuests() {
  const database = await openQuestDatabase();
  if (!database) return [];

  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(QUEST_STORE, 'readonly');
      const request = transaction.objectStore(QUEST_STORE).getAll();
      request.onsuccess = () => {
        const records = Array.isArray(request.result) ? request.result : [];
        resolve(records.map((r) => ({
          id: r.id,
          title: r.title,
          cachedAt: r.cachedAt,
        })));
      };
      request.onerror = () => reject(request.error || new Error('Could not list saved quests.'));
    });
  } finally {
    database.close();
  }
}

export async function removeOfflineQuest(scenarioId) {
  const database = await openQuestDatabase();
  if (!database) return false;

  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(QUEST_STORE, 'readwrite');
      const request = transaction.objectStore(QUEST_STORE).delete(scenarioId);
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error || new Error('Could not remove the saved quest.'));
    });
  } finally {
    database.close();
  }
}

export async function clearOfflineQuests() {
  const database = await openQuestDatabase();
  if (!database) return false;

  try {
    return await new Promise((resolve, reject) => {
      const transaction = database.transaction(QUEST_STORE, 'readwrite');
      const request = transaction.objectStore(QUEST_STORE).clear();
      request.onsuccess = () => resolve(true);
      request.onerror = () => reject(request.error || new Error('Could not clear saved quests.'));
    });
  } finally {
    database.close();
  }
}
