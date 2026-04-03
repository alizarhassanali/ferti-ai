import { useState, useEffect } from 'react';
import { X, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const FIRST_USE_KEY = 'otto-first-use-at';
const DISMISSED_KEY = 'otto-feedback-dismissed-at';
const SUBMITTED_KEY = 'otto-feedback-submitted';
const DAYS_BEFORE_SHOW = 7;
const DAYS_BEFORE_RESHOW = 30;

export const FeedbackNudgeBanner = () => {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Set first-use timestamp if not present
    if (!localStorage.getItem(FIRST_USE_KEY)) {
      localStorage.setItem(FIRST_USE_KEY, Date.now().toString());
    }

    // Never show if feedback already submitted
    if (localStorage.getItem(SUBMITTED_KEY) === 'true') return;

    // Don't show on the resource center page itself
    if (location.pathname === '/resource-center') return;

    const firstUse = parseInt(localStorage.getItem(FIRST_USE_KEY)!, 10);
    const daysSinceFirstUse = (Date.now() - firstUse) / (1000 * 60 * 60 * 24);
    if (daysSinceFirstUse < DAYS_BEFORE_SHOW) return;

    const dismissedAt = localStorage.getItem(DISMISSED_KEY);
    if (dismissedAt) {
      const daysSinceDismiss = (Date.now() - parseInt(dismissedAt, 10)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismiss < DAYS_BEFORE_RESHOW) return;
    }

    setVisible(true);
  }, [location.pathname]);

  const handleDismiss = () => {
    localStorage.setItem(DISMISSED_KEY, Date.now().toString());
    setVisible(false);
  };

  const handleGiveFeedback = () => {
    setVisible(false);
    navigate('/resource-center?category=feedback');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-16 left-1/2 -translate-x-1/2 z-50 animate-slide-in-bottom">
      <div className="flex items-center gap-3 rounded-xl border border-border bg-background shadow-lg px-5 py-3 max-w-lg">
        <MessageSquare className="h-5 w-5 text-brand flex-shrink-0" />
        <p className="text-sm text-foreground flex-1">
          How's Otto Notes working for you? We'd love your feedback.
        </p>
        <Button size="sm" onClick={handleGiveFeedback} className="flex-shrink-0">
          Give Feedback
        </Button>
        <button onClick={handleDismiss} className="text-muted-foreground hover:text-foreground transition-colors">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
