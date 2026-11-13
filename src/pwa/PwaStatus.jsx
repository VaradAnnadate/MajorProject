import React, { useEffect, useState } from 'react';
import { Download, WifiOff } from 'lucide-react';
import styles from './PwaStatus.module.css';

function isStandaloneDisplay() {
  return window.matchMedia?.('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

export function PwaStatus() {
  const [isOnline, setIsOnline] = useState(() => window.navigator.onLine);
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(isStandaloneDisplay);

  useEffect(() => {
    const updateOnlineStatus = () => setIsOnline(window.navigator.onLine);
    const captureInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const markInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    window.addEventListener('beforeinstallprompt', captureInstallPrompt);
    window.addEventListener('appinstalled', markInstalled);
    return () => {
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
      window.removeEventListener('beforeinstallprompt', captureInstallPrompt);
      window.removeEventListener('appinstalled', markInstalled);
    };
  }, []);

  async function installApp() {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const result = await installPrompt.userChoice;
    if (result?.outcome === 'accepted') setIsInstalled(true);
    setInstallPrompt(null);
  }

  if (isOnline && (!installPrompt || isInstalled)) return null;

  return (
    <aside className={styles.notice} aria-label="App status and installation">
      {!isOnline && (
        <span className={styles.message} role="status" aria-live="polite">
          <WifiOff size={17} aria-hidden="true" />
          Saved quests are ready offline.
        </span>
      )}
      {isOnline && installPrompt && !isInstalled && (
        <button className={styles.installButton} type="button" onClick={installApp}>
          <Download size={16} aria-hidden="true" />
          Install RightsQuest
        </button>
      )}
    </aside>
  );
}

export default PwaStatus;
