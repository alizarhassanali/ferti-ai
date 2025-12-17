import { useState } from 'react';
import { Plus, Search, MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAIAssistant } from '@/contexts/AIAssistantContext';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

const formatTimestamp = (date: Date) => {
  if (isToday(date)) {
    return format(date, 'h:mm a');
  }
  if (isYesterday(date)) {
    return 'Yesterday';
  }
  return formatDistanceToNow(date, { addSuffix: true });
};

export const ConversationList = () => {
  const {
    filteredConversations,
    selectedConversationId,
    createNewChat,
    selectConversation,
    renameConversation,
    deleteConversation,
    searchQuery,
    setSearchQuery,
  } = useAIAssistant();

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const handleStartRename = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleFinishRename = () => {
    if (editingId) {
      renameConversation(editingId, editingTitle);
      setEditingId(null);
      setEditingTitle('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleFinishRename();
    } else if (e.key === 'Escape') {
      setEditingId(null);
      setEditingTitle('');
    }
  };

  return (
    <div className="h-full flex flex-col bg-muted">
      {/* Header */}
      <div className="px-5 pt-5 pb-3">
        <h2 className="text-xl font-semibold text-foreground">AI Assistant</h2>
        <p className="text-sm text-muted-foreground mt-0.5">Your clinical AI companion</p>
      </div>

      {/* Search & New Chat */}
      <div className="px-4 pb-3 space-y-2.5">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/50 stroke-[1.5]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search chats..."
            className="w-full h-9 pl-9 pr-3 rounded-lg border border-border bg-white text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary transition-all"
          />
        </div>
        
        {/* New Chat Button */}
        <button
          onClick={createNewChat}
          className="w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-full bg-brand text-brand-foreground text-sm font-medium cursor-pointer hover:bg-brand/90 active:bg-brand/80 transition-colors"
        >
          <Plus className="h-4 w-4 stroke-[1.5]" />
          <span>New chat</span>
        </button>
      </div>

      {/* Conversation List */}
      <ScrollArea className="flex-1">
        <div className="px-3 py-1 space-y-1">
          {filteredConversations.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No conversations found
            </div>
          ) : (
            filteredConversations.map((conversation) => {
              const isSelected = selectedConversationId === conversation.id;
              const isEditing = editingId === conversation.id;
              const isHovered = hoveredId === conversation.id;

              return (
                <div
                  key={conversation.id}
                  className="relative"
                  onMouseEnter={() => setHoveredId(conversation.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  <button
                    onClick={() => selectConversation(conversation.id)}
                    className={`
                      flex items-start justify-between gap-2 w-full text-left px-3 py-2.5 rounded-lg transition-all duration-150 cursor-pointer
                      ${isSelected
                        ? 'bg-white shadow-sm'
                        : 'hover:bg-white/60'
                      }
                    `}
                  >
                    {/* Text content */}
                    <div className="flex flex-col gap-0.5 flex-1 min-w-0">
                      {isEditing ? (
                        <Input
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onBlur={handleFinishRename}
                          onKeyDown={handleKeyDown}
                          autoFocus
                          className="h-6 text-sm font-medium px-1 py-0"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <span className="font-medium text-sm text-foreground truncate">
                          {conversation.title}
                        </span>
                      )}
                      
                      {conversation.lastMessagePreview && !isEditing && (
                        <p className="text-[13px] text-muted-foreground break-words line-clamp-2">
                          {conversation.lastMessagePreview}
                        </p>
                      )}
                    </div>
                    
                    {/* Timestamp and menu - fixed width */}
                    <div className="flex items-center gap-1 flex-shrink-0 pt-0.5">
                      {!isEditing && (
                        <span className="text-[11px] text-muted-foreground whitespace-nowrap">
                          {formatTimestamp(conversation.updatedAt)}
                        </span>
                      )}
                      
                      {/* Context menu */}
                      {(isHovered || isSelected) && !isEditing && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-60 hover:opacity-100"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-40">
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStartRename(conversation.id, conversation.title);
                              }}
                            >
                              <Pencil className="h-4 w-4 mr-2" />
                              Rename chat
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteConversation(conversation.id);
                              }}
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete chat
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </button>
                </div>
              );
            })
          )}
        </div>
      </ScrollArea>
    </div>
  );
};