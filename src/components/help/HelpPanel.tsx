import { useState } from 'react';
import { X, Search, ExternalLink, ArrowRight, Home, MessageSquare, HelpCircle, ChevronRight } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPortal,
} from '@/components/ui/drawer';

interface HelpPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const helpArticles = [
  {
    id: 1,
    icon: "⭐",
    title: "Getting Started with NotesAI",
    category: "basics"
  },
  {
    id: 2,
    icon: "📦",
    title: "Understanding Your Subscription",
    category: "billing"
  },
  {
    id: 3,
    icon: "⚠️",
    title: "Troubleshooting Common Issues",
    category: "support"
  },
  {
    id: 4,
    icon: "💻",
    title: "Desktop & Mobile Apps",
    category: "platforms"
  },
  {
    id: 5,
    icon: "🎙️",
    title: "Recording & Transcription Guide",
    category: "features"
  },
  {
    id: 6,
    icon: "📝",
    title: "Creating & Using Templates",
    category: "features"
  }
];

export const HelpPanel = ({ open, onOpenChange }: HelpPanelProps) => {
  const [activeTab, setActiveTab] = useState<'home' | 'messages' | 'help'>('home');
  const [selectedArticle, setSelectedArticle] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredArticles = helpArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBack = () => {
    setSelectedArticle(null);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerPortal>
        <DrawerContent className="fixed inset-y-0 right-0 h-screen w-full sm:w-[380px] mt-0 rounded-none border-l bg-background flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            {selectedArticle ? (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleBack}
                className="gap-2"
              >
                <ChevronRight className="h-4 w-4 rotate-180" />
                Back
              </Button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xl">🩺</span>
                <span className="font-semibold text-lg">NotesAI</span>
              </div>
            )}
            
            {!selectedArticle && (
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs">JD</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs">SK</AvatarFallback>
                  </Avatar>
                  <Avatar className="h-8 w-8 border-2 border-background">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs">AL</AvatarFallback>
                  </Avatar>
                </div>
              </div>
            )}
            
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </DrawerClose>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'home' && !selectedArticle && (
              <div className="p-5 space-y-5">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search for help"
                    className="pl-9 bg-muted"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Help Articles */}
                <div className="space-y-1">
                  {filteredArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => setSelectedArticle(article.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-muted transition-colors text-left group"
                    >
                      <span className="text-lg">{article.icon}</span>
                      <span className="flex-1 text-sm font-medium">{article.title}</span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                  ))}
                </div>

                {/* External Resources */}
                <a
                  href="https://docs.example.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-sm mb-1">NotesAI Guides</p>
                      <p className="text-xs text-muted-foreground">
                        Detailed courses to help you get the most out of NotesAI.
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors flex-shrink-0" />
                  </div>
                </a>

                {/* Contact Support */}
                <button
                  onClick={() => setActiveTab('messages')}
                  className="w-full p-4 border border-border rounded-lg hover:bg-muted transition-colors group"
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-left">
                      <p className="font-semibold text-sm mb-1">Send us a message</p>
                      <p className="text-xs text-muted-foreground">
                        We typically reply in under 10 minutes
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              </div>
            )}

            {activeTab === 'home' && selectedArticle && (
              <div className="p-5 space-y-4">
                <h2 className="text-xl font-semibold">
                  {helpArticles.find(a => a.id === selectedArticle)?.title}
                </h2>
                <div className="h-px bg-border" />
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground">
                    Article content goes here. This would contain detailed help information,
                    instructions, screenshots, and other relevant content to assist users.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="flex flex-col items-center justify-center h-full p-5 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Our team typically replies in under 10 minutes
                </p>
                <Button className="gap-2">
                  Send us a message
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            )}

            {activeTab === 'help' && (
              <div className="p-5">
                <h3 className="text-lg font-semibold mb-4">Additional Help Resources</h3>
                <div className="space-y-3">
                  <a
                    href="https://docs.example.com/faq"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Frequently Asked Questions</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </a>
                  <a
                    href="https://docs.example.com/videos"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Video Tutorials</span>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-border">
            <div className="grid grid-cols-3">
              <button
                onClick={() => {
                  setActiveTab('home');
                  setSelectedArticle(null);
                }}
                className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                  activeTab === 'home'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="text-xs font-medium">Home</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('messages');
                  setSelectedArticle(null);
                }}
                className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                  activeTab === 'messages'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-xs font-medium">Messages</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('help');
                  setSelectedArticle(null);
                }}
                className={`flex flex-col items-center gap-1 py-3 transition-colors ${
                  activeTab === 'help'
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <HelpCircle className="h-5 w-5" />
                <span className="text-xs font-medium">Help</span>
              </button>
            </div>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
