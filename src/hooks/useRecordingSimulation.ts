import { useState, useEffect, useCallback, useRef } from 'react';
import { DEMO_TRANSCRIPT } from '@/data/demoContent';

interface UseRecordingSimulationProps {
  onTranscriptUpdate: (text: string) => void;
  mode: 'transcribe' | 'dictate';
}

export const useRecordingSimulation = ({ onTranscriptUpdate, mode }: UseRecordingSimulationProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [duration, setDuration] = useState(0);
  const [audioLevel, setAudioLevel] = useState(0);
  const transcriptIndexRef = useRef(0);
  const wordsRef = useRef<string[]>([]);
  const currentTextRef = useRef('');

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setDuration(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Audio level simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
    } else {
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Transcript simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && duration >= 2) {
      interval = setInterval(() => {
        if (transcriptIndexRef.current < wordsRef.current.length) {
          const nextWord = wordsRef.current[transcriptIndexRef.current];
          currentTextRef.current += (currentTextRef.current ? ' ' : '') + nextWord;
          onTranscriptUpdate(currentTextRef.current);
          transcriptIndexRef.current++;
        }
      }, 150); // Add word every 150ms
    }
    return () => clearInterval(interval);
  }, [isRecording, duration, onTranscriptUpdate]);

  const startRecording = useCallback(() => {
    setDuration(0);
    transcriptIndexRef.current = 0;
    currentTextRef.current = '';
    wordsRef.current = DEMO_TRANSCRIPT.split(' ');
    setIsRecording(true);
  }, []);

  const stopRecording = useCallback(() => {
    setIsRecording(false);
  }, []);

  const toggleRecording = useCallback(() => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  }, [isRecording, startRecording, stopRecording]);

  const resetRecording = useCallback(() => {
    setIsRecording(false);
    setDuration(0);
    setAudioLevel(0);
    transcriptIndexRef.current = 0;
    currentTextRef.current = '';
  }, []);

  return {
    isRecording,
    duration,
    audioLevel,
    startRecording,
    stopRecording,
    toggleRecording,
    resetRecording
  };
};
