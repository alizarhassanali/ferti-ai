import { Plus, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAIAssistant } from '@/contexts/AIAssistantContext';
import { formatDistanceToNow } from 'date-fns';

export const ConversationList = () => {
  const {
    filteredConversations,
    selectedConversationId,
    createNewChat,
    selectConversation,
    searchQuery,
    setSearchQuery,
  } = useAIAssistant();

  return (
    <div className="h-full flex flex-col bg-[hsl(38_35%_97%)] border-r border-border">
      {/* Header */}
      <div className="p-4 space-y-3 border-b border-border">
        <Button
          onClick={createNewChat}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Plus className="h-4 w-4 mr-2" />
          New chat
        </Button>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats"
            className="pl-9 bg-background"
          />
        </div>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No conversations found
            </div>
          ) : (
            filteredConversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => selectConversation(conversation.id)}
                className={`
                  w-full text-left p-3 rounded-lg transition-all duration-200
                  ${selectedConversationId === conversation.id
                    ? 'bg-primary/10 border border-primary/20'
                    : 'hover:bg-muted/50 border border-transparent'
                  }
                `}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className={`
                    font-medium text-sm truncate
                    ${selectedConversationId === conversation.id
                      ? 'text-primary'
                      : 'text-foreground'
                    }
                  `}>
                    {conversation.title}
                  </span>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(conversation.updatedAt, { addSuffix: true })}
                  </span>
                </div>
                {conversation.lastMessagePreview && (
                  <p className="text-xs text-muted-foreground mt-1 truncate">
                    {conversation.lastMessagePreview}
                  </p>
                )}
              </button>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};
