import { useState, useMemo } from 'react';
import { DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Play, Calendar, Clock } from 'lucide-react';
import { addDays, format, isWeekend } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Props {
  onBack: () => void;
  onSkip: () => void;
  onFinish: () => void;
}

const TRAINING_VIDEOS = [
  { title: 'How to use Otto Notes: A Basic Guide', duration: '4 min' },
  { title: 'How to generate a note, document, or letter', duration: '3 min' },
  { title: 'How to create your own template', duration: '2 min' },
];

function getNextBusinessDays(count: number): Date[] {
  const days: Date[] = [];
  let current = new Date();
  current = addDays(current, 1);
  while (days.length < count) {
    if (!isWeekend(current)) days.push(new Date(current));
    current = addDays(current, 1);
  }
  return days;
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour < 17; hour++) {
    for (let min = 0; min < 60; min += 15) {
      const h = hour % 12 || 12;
      const ampm = hour < 12 ? 'AM' : 'PM';
      slots.push(`${h}:${min.toString().padStart(2, '0')} ${ampm}`);
    }
  }
  return slots;
}

export const OnboardingStepThree = ({ onBack, onSkip, onFinish }: Props) => {
  const [bookDemo, setBookDemo] = useState(false);
  const [noTraining, setNoTraining] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const businessDays = useMemo(() => getNextBusinessDays(5), []);
  const timeSlots = useMemo(() => generateTimeSlots(), []);

  const handleFinish = () => {
    if (noTraining) {
      localStorage.setItem('otto-training-dismissed', 'true');
    }
    if (selectedSlot) {
      localStorage.setItem('otto-demo-booking', JSON.stringify({
        slot: selectedSlot,
        bookedAt: new Date().toISOString(),
      }));
    }
    onFinish();
  };

  const handleSkip = () => {
    localStorage.setItem('otto-training-skipped-at', Date.now().toString());
    onSkip();
  };

  return (
    <div className="overflow-y-auto max-h-[90vh] p-8 pb-6">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </button>

      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <DialogTitle className="text-2xl font-semibold text-foreground text-center">
          Training & Resources
        </DialogTitle>
        <DialogDescription className="text-sm text-muted-foreground text-center mt-1">
          Get started with Otto Notes — watch a quick guide or book a live demo.
        </DialogDescription>
      </div>

      {/* Training Videos */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick start videos</h3>
        <div className="grid grid-cols-3 gap-3">
          {TRAINING_VIDEOS.map((video) => (
            <button
              key={video.title}
              className="group rounded-xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors text-left overflow-hidden"
            >
              {/* Thumbnail placeholder */}
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                <div className="w-10 h-10 rounded-full bg-brand/90 text-white flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="h-4 w-4 ml-0.5" />
                </div>
              </div>
              <div className="p-2.5">
                <p className="text-xs font-medium text-foreground leading-snug line-clamp-2">
                  {video.title}
                </p>
                <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {video.duration}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Book a Demo */}
      <div className="mb-5">
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="book-demo-step3"
            checked={bookDemo}
            onCheckedChange={(checked) => {
              setBookDemo(checked === true);
              if (!checked) setSelectedSlot(null);
            }}
            className="mt-0.5"
          />
          <label htmlFor="book-demo-step3" className="text-sm text-foreground leading-snug cursor-pointer font-medium flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-brand" />
            Book a 1-on-1 demo with an Otto Notes expert
          </label>
        </div>

        {bookDemo && (
          <div className="mt-3 ml-6 rounded-lg border border-border overflow-hidden">
            {/* Day headers */}
            <div className="grid grid-cols-5 border-b border-border bg-muted/40">
              {businessDays.map((day) => (
                <div key={day.toISOString()} className="text-center py-2 px-1">
                  <p className="text-[11px] font-medium text-foreground">
                    {format(day, 'EEE')}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {format(day, 'MMM d')}
                  </p>
                </div>
              ))}
            </div>
            {/* Time slots grid */}
            <ScrollArea className="h-48">
              <div className="grid grid-cols-5">
                {businessDays.map((day) => (
                  <div key={day.toISOString()} className="border-r border-border last:border-r-0">
                    {timeSlots.map((slot) => {
                      const slotKey = `${format(day, 'yyyy-MM-dd')}_${slot}`;
                      const isSelected = selectedSlot === slotKey;
                      return (
                        <button
                          key={slotKey}
                          onClick={() => setSelectedSlot(isSelected ? null : slotKey)}
                          className={`w-full text-[11px] py-1.5 px-1 border-b border-border/50 transition-colors ${
                            isSelected
                              ? 'bg-brand text-white font-medium'
                              : 'text-foreground hover:bg-brand/10'
                          }`}
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
            {selectedSlot && (
              <div className="px-3 py-2 bg-brand/5 border-t border-border text-xs text-foreground">
                Selected: <span className="font-medium">{selectedSlot.replace('_', ' at ')}</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Opt-out */}
      <div className="mb-6">
        <div className="flex items-start gap-2.5">
          <Checkbox
            id="no-training"
            checked={noTraining}
            onCheckedChange={(checked) => setNoTraining(checked === true)}
            className="mt-0.5"
          />
          <label htmlFor="no-training" className="text-sm text-muted-foreground leading-snug cursor-pointer">
            I don't need training to use Otto Notes
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={handleSkip} className="text-muted-foreground">
          Skip for now
        </Button>
        <Button onClick={handleFinish} size="lg">
          {noTraining ? 'Finish setup' : bookDemo && selectedSlot ? 'Book & continue' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};
