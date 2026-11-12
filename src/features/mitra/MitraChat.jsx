import React, { useEffect, useRef, useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { sendMitraMessages } from '../classroom/engine/classroomApi';
import styles from './MitraChat.module.css';

const enabled = import.meta.env.VITE_MITRA_AI_ENABLED === 'true';

export function MitraChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState('');
  const transcriptRef = useRef(null);
  const launcherRef = useRef(null);
  const textareaRef = useRef(null);
  const wasOpenRef = useRef(false);

  useEffect(() => {
    if (isOpen && transcriptRef.current) {
      transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
    }
  }, [isOpen, messages, isSending, error]);

  useEffect(() => {
    if (!isOpen) {
      if (wasOpenRef.current) launcherRef.current?.focus();
      wasOpenRef.current = false;
      return undefined;
    }

    wasOpenRef.current = true;
    textareaRef.current?.focus();
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isOpen]);

  if (!enabled) return null;

  async function submitMessage(event) {
    event.preventDefault();
    const content = draft.trim();
    if (!content || isSending) return;

    const nextMessages = [...messages, { role: 'user', content }].slice(-8);
    setMessages(nextMessages);
    setDraft('');
    setError('');
    setIsSending(true);
    try {
      const answer = await sendMitraMessages(nextMessages);
      setMessages((current) => [...current, { role: 'assistant', content: answer }].slice(-8));
    } catch (requestError) {
      setError(requestError.message || 'Mitra could not answer right now.');
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={styles.widget}>
      {isOpen && (
        <section id="mitra-panel" className={styles.panel} role="dialog" aria-labelledby="mitra-title" aria-modal="false">
          <header className={styles.header}>
            <div className={styles.identity}>
              <span className={styles.mascotIcon} aria-hidden="true">🦊</span>
              <div>
                <h2 id="mitra-title">Mitra, your guide</h2>
                <p>Ask about fairness, safety, or rights</p>
              </div>
            </div>
            <button className={styles.close} type="button" onClick={() => setIsOpen(false)} aria-label="Close Mitra chat">
              <X size={19} />
            </button>
          </header>

          <div className={styles.transcript} ref={transcriptRef} role="log" aria-live="polite" aria-relevant="additions text">
            {messages.length === 0 && (
              <p className={styles.welcome}>
                Namaste! I’m Mitra. I can help explain children’s rights and explore classroom dilemmas. For urgent help, talk to a trusted adult or call 1098.
              </p>
            )}
            {messages.map((message, index) => (
              <p className={message.role === 'user' ? styles.userMessage : styles.mitraMessage} key={`${message.role}-${index}`}>
                {message.content}
              </p>
            ))}
            {isSending && <p className={styles.mitraMessage} role="status">Mitra is thinking…</p>}
            {error && <p className={styles.error} role="alert">{error}</p>}
          </div>

          <form className={styles.composer} onSubmit={submitMessage}>
            <label className={styles.srOnly} htmlFor="mitra-message">Message Mitra</label>
            <textarea
              ref={textareaRef}
              id="mitra-message"
              value={draft}
              maxLength={800}
              rows={2}
              placeholder="Type a question…"
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && !event.shiftKey) {
                  event.preventDefault();
                  event.currentTarget.form?.requestSubmit();
                }
              }}
              disabled={isSending}
            />
            <button type="submit" aria-label="Send message to Mitra" disabled={!draft.trim() || isSending}>
              <Send size={17} />
            </button>
          </form>
          <p className={styles.providerNote}>AI can make mistakes. Mitra is not an emergency or counselling service. Groq may retain inference content for up to 30 days for reliability or abuse monitoring unless Zero Data Retention is enabled for your account.</p>
        </section>
      )}
      <button
        ref={launcherRef}
        className={styles.launcher}
        type="button"
        aria-expanded={isOpen}
        aria-controls="mitra-panel"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X size={19} /> : <Bot size={19} />}
        <span>{isOpen ? 'Close Mitra' : 'Ask Mitra'}</span>
      </button>
    </div>
  );
}

export default MitraChat;
