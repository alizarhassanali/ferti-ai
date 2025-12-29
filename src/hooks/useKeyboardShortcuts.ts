import { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface KeyboardShortcutHandlers {
  onToggleSessionsPane?: () => void;
  onNewSession?: () => void;
  onSaveDraft?: () => void;
  onSend?: () => void;
  onCloseModal?: () => void;
}

/**
 * Global keyboard shortcuts hook
 * Alt+S: Toggle Sessions Pane
 * Alt+N: New Session
 * Ctrl+S: Save Draft
 * Ctrl+Enter: Send Letter/Note
 * Esc: Close Modal
 */
export const useKeyboardShortcuts = (handlers: KeyboardShortcutHandlers = {}) => {
  const navigate = useNavigate();

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    // Don't trigger shortcuts when typing in inputs
    const target = event.target as HTMLElement;
    const isInputField = target.tagName === 'INPUT' || 
                         target.tagName === 'TEXTAREA' || 
                         target.isContentEditable;

    // Alt + S: Toggle Sessions Pane
    if (event.altKey && event.key.toLowerCase() === 's') {
      event.preventDefault();
      handlers.onToggleSessionsPane?.();
      return;
    }

    // Alt + N: New Session
    if (event.altKey && event.key.toLowerCase() === 'n') {
      event.preventDefault();
      if (handlers.onNewSession) {
        handlers.onNewSession();
      } else {
        navigate('/new-session');
      }
      return;
    }

    // Ctrl/Cmd + S: Save Draft (allow in input fields)
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
      event.preventDefault();
      handlers.onSaveDraft?.();
      return;
    }

    // Ctrl/Cmd + Enter: Send (allow in input fields)
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
      event.preventDefault();
      handlers.onSend?.();
      return;
    }

    // Esc: Close Modal (only when not in input)
    if (event.key === 'Escape' && !isInputField) {
      handlers.onCloseModal?.();
      return;
    }
  }, [handlers, navigate]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);
};

/**
 * Hook for Tab/Shift+Tab navigation focus management
 */
export const useFocusTrap = (containerRef: React.RefObject<HTMLElement>, isActive: boolean) => {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    container.addEventListener('keydown', handleTabKey);
    firstElement?.focus();

    return () => container.removeEventListener('keydown', handleTabKey);
  }, [containerRef, isActive]);
};
