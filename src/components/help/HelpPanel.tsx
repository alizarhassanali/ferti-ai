import { useState } from 'react';
import { X, Home, MessageSquare, ArrowLeft, Book, Paperclip, Send } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Sheet, SheetContent } from '@/components/ui/sheet';
interface HelpPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}
export const HelpPanel = ({
  open,
  onOpenChange
}: HelpPanelProps) => {
  const [activeTab, setActiveTab] = useState<'home' | 'messages'>('home');
  const [chatStarted, setChatStarted] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleStartChat = () => {
    setChatStarted(true);
  };
  const handleBackToStart = () => {
    setChatStarted(false);
  };
  const handleSendEmail = () => {
    if (email) {
      toast({
        title: "Support chat coming soon",
        description: "Zendesk integration will be available soon."
      });
    }
  };
  const handleSendMessage = () => {
    if (message) {
      toast({
        title: "Support chat coming soon",
        description: "Zendesk integration will be available soon."
      });
      setMessage('');
    }
  };
  return <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[350px] sm:w-[400px] p-0 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">Otto Notes</span>
          </div>
          
          <div className="flex items-center gap-2">
            
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => onOpenChange(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'home' && <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <Book className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Otto Notes Guides</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Detailed courses to help you get the most out of Otto Notes.
              </p>
              <Badge variant="secondary" className="text-xs">
                Coming Soon
              </Badge>
            </div>}

          {activeTab === 'messages' && !chatStarted && <div className="flex flex-col items-center justify-center h-full p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-6">
                <MessageSquare className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Start a conversation</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Our team typically replies in under 10 minutes
              </p>
              <Button onClick={handleStartChat} className="gap-2">
                Send us a message
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            </div>}

          {activeTab === 'messages' && chatStarted && <div className="flex flex-col h-full">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleBackToStart}>
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div className="flex -space-x-1">
                  <Avatar className="h-6 w-6 border-2 border-background">
                    <AvatarFallback className="bg-primary text-primary-foreground text-[10px]">CP</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-sm text-muted-foreground">
                  Started 9 Dec at 19:48
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Timestamp */}
                <div className="text-center">
                  <span className="text-xs text-muted-foreground">19:48</span>
                </div>

                {/* Bot Message */}
                <div className="flex gap-2">
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">CP</AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3 max-w-[85%]">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Clinic Portal</p>
                    <p className="text-sm">
                      Hi, Thank you for connecting with us. We are connecting you with a Live Agent.
                    </p>
                  </div>
                </div>

                {/* Email Collection Card */}
                <div className="bg-muted rounded-lg p-4 space-y-3">
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="bg-background" />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">1 of 1</span>
                    <Button size="sm" onClick={handleSendEmail}>
                      Send
                    </Button>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div className="border-t border-border p-3">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Input placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSendMessage()} className="flex-1" />
                  <Button variant="ghost" size="icon" className="h-9 w-9 flex-shrink-0" onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Zendesk Footer */}
              <div className="py-2 text-center border-t border-border">
                <span className="text-xs text-muted-foreground">Built with Zendesk</span>
              </div>
            </div>}
        </div>

        {/* Bottom Navigation - Only show when not in chat */}
        {!(activeTab === 'messages' && chatStarted) && <div className="border-t border-border">
            <div className="grid grid-cols-2">
              <button onClick={() => setActiveTab('home')} className={`flex flex-col items-center gap-1 py-3 transition-colors ${activeTab === 'home' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                <Home className="h-5 w-5" />
                <span className="text-xs font-medium">Home</span>
              </button>
              <button onClick={() => setActiveTab('messages')} className={`flex flex-col items-center gap-1 py-3 transition-colors ${activeTab === 'messages' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}>
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs font-medium">Messages</span>
              </button>
            </div>
          </div>}
      </SheetContent>
    </Sheet>;
};