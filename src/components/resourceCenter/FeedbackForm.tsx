import { useState } from 'react';
import { MessageSquare, Bug, Star, Upload, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

type FeedbackType = 'general' | 'bug_report' | 'rating';

const emojiRatings = [
  { value: 1, emoji: '😞', label: 'Very Poor' },
  { value: 2, emoji: '😕', label: 'Poor' },
  { value: 3, emoji: '😐', label: 'Okay' },
  { value: 4, emoji: '🙂', label: 'Good' },
  { value: 5, emoji: '😍', label: 'Excellent' },
];

export const FeedbackForm = () => {
  const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const [severity, setSeverity] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setSubject('');
    setMessage('');
    setRating(null);
    setSeverity('');
    setScreenshot(null);
  };

  const handleSubmit = async () => {
    if (!feedbackType) return;

    if (feedbackType === 'rating' && !rating) {
      toast({ title: 'Please select a rating', variant: 'destructive' });
      return;
    }
    if (feedbackType === 'general' && !message.trim()) {
      toast({ title: 'Please enter a message', variant: 'destructive' });
      return;
    }
    if (feedbackType === 'bug_report' && !message.trim()) {
      toast({ title: 'Please describe the bug', variant: 'destructive' });
      return;
    }

    setSubmitting(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        toast({ title: 'Please sign in to submit feedback', variant: 'destructive' });
        setSubmitting(false);
        return;
      }

      let screenshotUrl: string | null = null;

      if (screenshot && feedbackType === 'bug_report') {
        const filePath = `${user.id}/${Date.now()}-${screenshot.name}`;
        const { error: uploadError } = await supabase.storage
          .from('feedback-screenshots')
          .upload(filePath, screenshot);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('feedback-screenshots')
          .getPublicUrl(filePath);
        screenshotUrl = urlData.publicUrl;
      }

      const { error } = await supabase.from('feedback').insert({
        user_id: user.id,
        type: feedbackType,
        subject: subject.trim() || null,
        message: message.trim() || null,
        rating: feedbackType === 'rating' ? rating : null,
        severity: feedbackType === 'bug_report' && severity ? severity : null,
        screenshot_url: screenshotUrl,
      });

      if (error) throw error;

      // Trigger email notification
      await supabase.functions.invoke('notify-feedback', {
        body: {
          type: feedbackType,
          subject: subject.trim(),
          message: message.trim(),
          rating,
          severity,
          userEmail: user.email,
        },
      });

      localStorage.setItem('otto-feedback-submitted', 'true');
      toast({ title: 'Thank you for your feedback!', description: 'Your submission has been received.' });
      resetForm();
      setFeedbackType(null);
    } catch (err) {
      console.error('Feedback submission error:', err);
      toast({ title: 'Failed to submit feedback', description: 'Please try again later.', variant: 'destructive' });
    } finally {
      setSubmitting(false);
    }
  };

  if (!feedbackType) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-2">Give Feedback</h3>
        <p className="text-sm text-muted-foreground mb-8 max-w-sm">
          Help us improve Otto Notes by sharing your thoughts, reporting bugs, or rating your experience.
        </p>
        <div className="flex flex-col gap-3 w-full max-w-sm">
          {[
            { type: 'rating' as FeedbackType, icon: Star, title: 'Quick Rating', desc: 'Rate your experience with a quick emoji' },
            { type: 'general' as FeedbackType, icon: MessageSquare, title: 'General Feedback', desc: 'Share suggestions, thoughts, or ideas' },
            { type: 'bug_report' as FeedbackType, icon: Bug, title: 'Bug Report', desc: 'Report an issue with steps and screenshots' },
          ].map(({ type, icon: Icon, title, desc }) => (
            <button
              key={type}
              onClick={() => setFeedbackType(type)}
              className="w-full text-left p-4 rounded-xl border border-border bg-card hover:bg-muted hover:border-primary/10 transition-all duration-200 group"
            >
              <div className="flex items-start gap-3">
                <div className="flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 bg-muted text-muted-foreground group-hover:text-foreground transition-colors">
                  <Icon className="h-[18px] w-[18px]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="max-w-md mx-auto p-8">
        <button
          onClick={() => { setFeedbackType(null); resetForm(); }}
          className="text-sm text-muted-foreground hover:text-foreground mb-6 inline-flex items-center gap-1"
        >
          ← Back
        </button>

        {feedbackType === 'rating' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">How's your experience?</h3>
              <p className="text-sm text-muted-foreground mt-1">Tap an emoji to rate Otto Notes</p>
            </div>
            <div className="flex justify-center gap-3">
              {emojiRatings.map(({ value, emoji, label }) => (
                <button
                  key={value}
                  onClick={() => setRating(value)}
                  className={`flex flex-col items-center gap-1 p-3 rounded-xl border transition-all duration-200 ${
                    rating === value
                      ? 'border-primary bg-primary/5 scale-110'
                      : 'border-border hover:border-primary/20 hover:bg-muted'
                  }`}
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-[10px] text-muted-foreground">{label}</span>
                </button>
              ))}
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Comment (optional)</Label>
              <Textarea
                placeholder="Anything else you'd like to share?"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        )}

        {feedbackType === 'general' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">General Feedback</h3>
              <p className="text-sm text-muted-foreground mt-1">Share your thoughts or suggestions</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Subject</Label>
              <Input
                placeholder="What's this about?"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Message</Label>
              <Textarea
                placeholder="Tell us what's on your mind..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
              />
            </div>
          </div>
        )}

        {feedbackType === 'bug_report' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground">Report a Bug</h3>
              <p className="text-sm text-muted-foreground mt-1">Help us fix issues faster</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Subject</Label>
              <Input
                placeholder="Brief description of the issue"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Description</Label>
              <Textarea
                placeholder="Steps to reproduce, what you expected, and what happened instead..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Severity</Label>
              <Select value={severity} onValueChange={setSeverity}>
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low — Cosmetic issue</SelectItem>
                  <SelectItem value="medium">Medium — Feature partially broken</SelectItem>
                  <SelectItem value="high">High — Feature unusable</SelectItem>
                  <SelectItem value="critical">Critical — App crash or data loss</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Screenshot (optional)</Label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => document.getElementById('screenshot-input')?.click()}
                >
                  <Upload className="h-3.5 w-3.5" />
                  {screenshot ? 'Change file' : 'Upload screenshot'}
                </Button>
                {screenshot && (
                  <span className="text-xs text-muted-foreground truncate max-w-[180px]">{screenshot.name}</span>
                )}
              </div>
              <input
                id="screenshot-input"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setScreenshot(e.target.files?.[0] || null)}
              />
            </div>
          </div>
        )}

        <div className="mt-8">
          <Button onClick={handleSubmit} disabled={submitting} className="w-full gap-2">
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            Submit Feedback
          </Button>
        </div>
      </div>
    </ScrollArea>
  );
};
