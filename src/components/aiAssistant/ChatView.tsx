import { useState, useRef, useEffect } from 'react';
import { Mic, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIAssistant } from '@/contexts/AIAssistantContext';

const EmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center px-8">
    <h1 className="text-2xl font-semibold text-foreground mb-2">
      What's on your mind today?
    </h1>
    <p className="text-muted-foreground text-center">
      Ask clinical, workflow, or product questions.
    </p>
  </div>
);

const MessageBubble = ({ message }: { message: { role: 'user' | 'assistant'; content: string } }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`
          max-w-[80%] px-4 py-3 rounded-2xl
          ${isUser
            ? 'bg-primary text-primary-foreground rounded-br-md'
            : 'bg-muted text-foreground rounded-bl-md'
          }
        `}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};

export const ChatView = () => {
  const { selectedConversation, sendMessage } = useAIAssistant();
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasMessages = selectedConversation && selectedConversation.messages.length > 0;

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [selectedConversation?.messages]);

  useEffect(() => {
    // Focus input when conversation changes
    inputRef.current?.focus();
  }, [selectedConversation?.id]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!selectedConversation) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-background text-muted-foreground">
        <p>Select a conversation or start a new chat</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Messages Area */}
      {hasMessages ? (
        <ScrollArea className="flex-1 px-6 py-4" ref={scrollRef}>
          <div className="max-w-3xl mx-auto">
            {selectedConversation.messages.map((message) => (
              <MessageBubble key={message.id} message={message} />
            ))}
          </div>
        </ScrollArea>
      ) : (
        <EmptyState />
      )}

      {/* Chat Input */}
      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-2 bg-muted/50 rounded-xl p-2 border border-border">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <Mic className="h-5 w-5" />
            </Button>
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              size="icon"
              className="h-9 w-9"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
