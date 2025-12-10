import { useState, useRef, useEffect } from 'react';
import { Mic, Send, MessageCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAIAssistant, Message } from '@/contexts/AIAssistantContext';
import { format, isToday, isYesterday, isSameDay } from 'date-fns';

const EmptyState = () => (
  <div className="flex-1 flex flex-col items-center justify-center px-8">
    <div className="w-16 h-16 rounded-full bg-muted/50 flex items-center justify-center mb-6">
      <MessageCircle className="h-8 w-8 text-muted-foreground/60" />
    </div>
    <h1 className="text-2xl font-semibold text-foreground mb-2 text-center">
      What's on your mind today?
    </h1>
    <p className="text-muted-foreground text-center max-w-sm">
      Ask clinical, workflow, or product questions.
    </p>
  </div>
);

const NoSelectionState = () => (
  <div className="h-full flex flex-col items-center justify-center bg-background text-muted-foreground px-8">
    <div className="w-16 h-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
      <MessageCircle className="h-8 w-8 text-muted-foreground/40" />
    </div>
    <p className="text-center">Select a conversation or start a new chat</p>
  </div>
);

const TypingIndicator = () => (
  <div className="flex justify-start mb-4">
    <div className="flex items-end gap-2">
      <Avatar className="h-8 w-8 flex-shrink-0">
        <AvatarFallback className="bg-muted text-muted-foreground">
          <Bot className="h-4 w-4" />
        </AvatarFallback>
      </Avatar>
      <div className="bg-muted text-foreground px-4 py-3 rounded-2xl rounded-bl-md">
        <div className="flex items-center gap-1">
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-muted-foreground/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  </div>
);

const DateDivider = ({ date }: { date: Date }) => {
  let label = format(date, 'MMMM d, yyyy');
  if (isToday(date)) label = 'Today';
  else if (isYesterday(date)) label = 'Yesterday';

  return (
    <div className="flex items-center justify-center my-4">
      <span className="text-xs text-muted-foreground bg-background px-3 py-1 rounded-full border border-border/50">
        {label}
      </span>
    </div>
  );
};

const MessageBubble = ({ message }: { message: Message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div className={`flex items-end gap-2 max-w-[80%] ${isUser ? 'flex-row-reverse' : ''}`}>
        <Avatar className="h-8 w-8 flex-shrink-0">
          <AvatarFallback className={isUser ? 'bg-primary text-primary-foreground text-xs' : 'bg-muted text-muted-foreground'}>
            {isUser ? 'SS' : <Bot className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div
            className={`
              px-4 py-3 rounded-2xl
              ${isUser
                ? 'bg-primary text-primary-foreground rounded-br-md'
                : 'bg-muted text-foreground rounded-bl-md'
              }
            `}
          >
            <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          </div>
          <span className={`text-[10px] text-muted-foreground ${isUser ? 'text-right' : 'text-left'}`}>
            {format(message.createdAt, 'h:mm a')}
          </span>
        </div>
      </div>
    </div>
  );
};

export const ChatView = () => {
  const { selectedConversation, sendMessage, isLoading } = useAIAssistant();
  const [inputValue, setInputValue] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const hasMessages = selectedConversation && selectedConversation.messages.length > 0;

  useEffect(() => {
    // Scroll to bottom when messages change or loading state changes
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [selectedConversation?.messages, isLoading]);

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
    return <NoSelectionState />;
  }

  // Group messages by date
  const renderMessages = () => {
    const messages = selectedConversation.messages;
    const elements: JSX.Element[] = [];
    let lastDate: Date | null = null;

    messages.forEach((message, index) => {
      const messageDate = new Date(message.createdAt);
      
      if (!lastDate || !isSameDay(lastDate, messageDate)) {
        elements.push(<DateDivider key={`date-${index}`} date={messageDate} />);
        lastDate = messageDate;
      }
      
      elements.push(<MessageBubble key={message.id} message={message} />);
    });

    return elements;
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Messages Area */}
      {hasMessages ? (
        <ScrollArea className="flex-1 px-4 py-4" ref={scrollAreaRef}>
          <div className="max-w-[960px] mx-auto">
            {renderMessages()}
            {isLoading && <TypingIndicator />}
          </div>
        </ScrollArea>
      ) : (
        <EmptyState />
      )}

      {/* Chat Input */}
      <div className="border-t border-border p-4 bg-background">
        <div className="max-w-[960px] mx-auto">
          <div className="flex items-center gap-2 bg-white rounded-xl p-2 border border-border shadow-sm">
            <Input
              ref={inputRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm"
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
              disabled={!inputValue.trim() || isLoading}
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
