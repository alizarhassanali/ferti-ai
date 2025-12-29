import { useEffect } from 'react';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useSessionsPanel } from '@/contexts/SessionsPanelContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { showSaveSuccess } from '@/lib/toast';

/**
 * Global keyboard shortcuts handler component
 * Place this inside BrowserRouter to enable shortcuts
 */
export const KeyboardShortcutsHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Safely try to get sessions panel context (may not be available everywhere)
  let toggleSessionsPane: (() => void) | undefined;
  try {
    const panelContext = useSessionsPanel();
    toggleSessionsPane = panelContext.toggleSessionsPanel;
  } catch {
    // Context not available, that's okay
  }

  useKeyboardShortcuts({
    onToggleSessionsPane: toggleSessionsPane,
    onNewSession: () => navigate('/new-session'),
    onSaveDraft: () => {
      // Trigger save event that components can listen to
      window.dispatchEvent(new CustomEvent('keyboard:save'));
      showSaveSuccess();
    },
    onSend: () => {
      // Trigger send event that components can listen to
      window.dispatchEvent(new CustomEvent('keyboard:send'));
    },
  });

  return null;
};

/**
 * Hook for components to listen to keyboard save/send events
 */
export const useKeyboardSaveListener = (onSave: () => void) => {
  useEffect(() => {
    const handler = () => onSave();
    window.addEventListener('keyboard:save', handler);
    return () => window.removeEventListener('keyboard:save', handler);
  }, [onSave]);
};

export const useKeyboardSendListener = (onSend: () => void) => {
  useEffect(() => {
    const handler = () => onSend();
    window.addEventListener('keyboard:send', handler);
    return () => window.removeEventListener('keyboard:send', handler);
  }, [onSend]);
};
