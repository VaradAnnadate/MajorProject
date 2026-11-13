export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) return;

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch((error) => {
      // Registration is optional; the site remains usable when storage or the browser blocks service workers.
      console.warn('RightsQuest offline support could not be enabled.', error);
    });
  }, { once: true });
}
