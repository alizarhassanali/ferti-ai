import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, Trash2, Copy, Calendar, Globe, Zap, Mic, ThumbsUp, ThumbsDown, X, ArrowUpRight, Edit } from 'lucide-react';
import { useSessionsLayout } from '@/contexts/SessionsLayoutContext';
import { useSessions } from '@/contexts/SessionsContext';
import { useToast } from '@/hooks/use-toast';

export const SessionDetail = () => {
  const { selectedSessionId } = useSessionsLayout();
  const { getSession, updateSession, deleteSession } = useSessions();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const selectedSession = selectedSessionId ? getSession(selectedSessionId) : null;
  
  const [activeTab, setActiveTab] = useState(() => {
    if (!selectedSession) return 'dictation';
    if (selectedSession.hasTranscript || selectedSession.transcriptContent) return 'transcript';
    return 'dictation';
  });

  // Reset tab when session changes
  useEffect(() => {
    if (selectedSession) {
      if (selectedSession.transcriptContent || selectedSession.hasTranscript) {
        setActiveTab('transcript');
      } else if (selectedSession.dictationContent) {
        setActiveTab('dictation');
      }
    }
  }, [selectedSessionId, selectedSession]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const formatDateTime = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) + 
      ' ' + d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const handleEditSession = () => {
    if (selectedSession) {
      navigate(`/new-session?id=${selectedSession.id}`);
    }
  };

  const handleDeleteSession = () => {
    if (selectedSession) {
      deleteSession(selectedSession.id);
      toast({
        title: 'Session deleted',
        description: 'The session has been removed.',
        variant: 'destructive',
      });
    }
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied',
      description: 'Content copied to clipboard.',
    });
  };

  if (!selectedSession) {
    return (
      <div className="flex-1 h-screen overflow-hidden bg-background flex items-center justify-center">
        <div className="text-center text-muted-foreground space-y-2">
          <p>Select a session to view details</p>
        </div>
      </div>
    );
  }

  const hasContent = selectedSession.status !== 'empty' && selectedSession.status !== 'draft' && 
    (selectedSession.transcriptContent || selectedSession.dictationContent || selectedSession.hasTranscript);

  return (
    <div className="flex-1 h-screen overflow-hidden bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-1">
            <Input
              placeholder="Add patient details"
              defaultValue={selectedSession.patientName || selectedSession.title}
              className="max-w-md"
              readOnly
            />
            <Button variant="ghost" size="icon" onClick={handleDeleteSession}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="default" size="sm" onClick={handleEditSession}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
            <Badge 
              variant={selectedSession.status === 'complete' ? 'default' : 'secondary'}
              className={selectedSession.status === 'complete' ? 'bg-green-500' : ''}
            >
              {selectedSession.status === 'complete' ? 'Complete' : 'Draft'}
            </Badge>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>{formatDateTime(selectedSession.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe className="h-3 w-3" />
            <span>{selectedSession.language}</span>
          </div>
          <Badge variant="secondary" className="gap-1 bg-green-500/10 text-green-600">
            <Zap className="h-3 w-3" />
            14 days trial
          </Badge>
          <div className="flex items-center gap-1">
            ⏱️ <span>{formatDuration(selectedSession.duration)}</span>
          </div>
          <div className="flex items-center gap-0.5">
            <Mic className="h-3 w-3" />
            <span className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map(i => (
                <span key={i} className="h-1 w-1 rounded-full bg-muted-foreground" />
              ))}
            </span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-border px-4 bg-transparent">
          {(selectedSession.transcriptContent || selectedSession.hasTranscript) && (
            <TabsTrigger value="transcript" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              📝 Transcript
            </TabsTrigger>
          )}
          <TabsTrigger value="dictation" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
            🎙️ Dictation
          </TabsTrigger>
          {selectedSession.contextContent && (
            <TabsTrigger value="context" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary">
              📋 Context
            </TabsTrigger>
          )}
          {selectedSession.notes?.map((note) => (
            <TabsTrigger 
              key={note.id} 
              value={note.id} 
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary gap-2"
            >
              {note.type === 'clinical_note' && '📋'}
              {note.type === 'letter_to_gp' && '📄'}
              {note.title}
              {note.isClosable && (
                <X className="h-3 w-3 hover:text-destructive" onClick={(e) => e.stopPropagation()} />
              )}
            </TabsTrigger>
          ))}
          <TabsTrigger value="add" className="rounded-none border-b-2 border-transparent">
            <Plus className="h-4 w-4" />
          </TabsTrigger>
        </TabsList>

        {/* Empty State */}
        {!hasContent && (
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="text-center space-y-6 max-w-md">
              <ArrowUpRight className="h-12 w-12 mx-auto text-muted-foreground" />
              <div className="space-y-2">
                <p className="text-lg font-medium">This session is a draft</p>
                <p className="text-sm text-muted-foreground">
                  Click Edit to continue recording and add content to this session
                </p>
              </div>
              <Button variant="outline" className="gap-2" onClick={handleEditSession}>
                <Edit className="h-4 w-4" />
                Continue editing
              </Button>
            </div>
          </div>
        )}

        {/* Context Tab */}
        {selectedSession.contextContent && (
          <TabsContent value="context" className="flex-1 overflow-y-auto m-0 p-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-end mb-4">
                <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleCopy(selectedSession.contextContent)}>
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
              <pre className="whitespace-pre-wrap text-sm">{selectedSession.contextContent}</pre>
            </div>
          </TabsContent>
        )}

        {/* Transcript Tab */}
        {(selectedSession.transcriptContent || selectedSession.hasTranscript) && (
          <TabsContent value="transcript" className="flex-1 overflow-y-auto m-0 p-6 space-y-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-end mb-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleCopy(selectedSession.transcriptContent || selectedSession.transcript?.fullText || '')}
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
              <div className="space-y-4">
                {selectedSession.transcriptContent ? (
                  <p className="text-sm">{selectedSession.transcriptContent}</p>
                ) : selectedSession.transcript?.segments.map((segment, idx) => (
                  <div key={idx} className="space-y-1">
                    {segment.timestamp && (
                      <div className="text-xs text-muted-foreground">{segment.timestamp}</div>
                    )}
                    <p className="text-sm">{segment.text}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-8 pt-4 border-t">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        )}

        {/* Dictation Tab */}
        <TabsContent value="dictation" className="flex-1 overflow-y-auto m-0 p-6">
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm" className="gap-2">
                ✨ Smart dictation
              </Button>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Mic className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => handleCopy(selectedSession.dictationContent || selectedSession.dictation || '')}
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
              </div>
            </div>
            <Textarea
              value={selectedSession.dictationContent || selectedSession.dictation || ''}
              placeholder="No dictation content"
              className="min-h-[400px] resize-none"
              readOnly
            />
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <ThumbsUp className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>⚙️ Personalisation off</span>
                <span>📋 0 tasks</span>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* Note Tabs */}
        {selectedSession.notes?.map((note) => (
          <TabsContent key={note.id} value={note.id} className="flex-1 overflow-y-auto m-0 p-6">
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <Badge variant="outline">{note.title}</Badge>
                  <Badge variant="secondary" className="bg-purple-500/10 text-purple-600">⚡ Pro</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Sync changes
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2" onClick={() => handleCopy(note.content)}>
                    <Copy className="h-4 w-4" />
                    Copy
                  </Button>
                </div>
              </div>
              <Textarea
                value={note.content}
                className="min-h-[400px] resize-none font-mono text-sm"
                readOnly
              />
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ThumbsDown className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>⚙️ Personalisation off</span>
                  <span>📋 0 tasks</span>
                </div>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {/* AI Assistant Input */}
      <div className="border-t border-border p-4 space-y-2">
        <div className="flex items-center gap-2">
          <Input
            placeholder="🤖 Ask FertiAI to do anything..."
            className="flex-1"
          />
          <Button size="icon" variant="ghost">
            <Mic className="h-4 w-4" />
          </Button>
          <Button size="icon">
            ➤
          </Button>
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>⚠️ Review your note before use to ensure it accurately represents the visit</span>
          <span>Tutorials 28% 🟢</span>
        </div>
      </div>
    </div>
  );
};
