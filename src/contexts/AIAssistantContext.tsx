import { createContext, useContext, useState, ReactNode } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  title: string;
  lastMessagePreview: string;
  updatedAt: Date;
  messages: Message[];
}

interface AIAssistantContextType {
  conversations: Conversation[];
  selectedConversationId: string | null;
  selectedConversation: Conversation | null;
  createNewChat: () => void;
  selectConversation: (id: string) => void;
  sendMessage: (content: string) => void;
  renameConversation: (id: string, newTitle: string) => void;
  deleteConversation: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredConversations: Conversation[];
  isLoading: boolean;
}

const AIAssistantContext = createContext<AIAssistantContextType | undefined>(undefined);

// Demo conversations
const initialConversations: Conversation[] = [
  {
    id: '1',
    title: 'Medication counseling',
    lastMessagePreview: 'What are the common side effects of Letrozole?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 30),
    messages: [
      {
        id: '1-1',
        role: 'user',
        content: 'What are the common side effects of Letrozole?',
        createdAt: new Date(Date.now() - 1000 * 60 * 35),
      },
      {
        id: '1-2',
        role: 'assistant',
        content: 'Common side effects of Letrozole include hot flashes, headaches, fatigue, and joint pain. Some patients may also experience dizziness or nausea. These effects are typically mild and temporary.',
        createdAt: new Date(Date.now() - 1000 * 60 * 34),
      },
    ],
  },
  {
    id: '2',
    title: 'Template feedback',
    lastMessagePreview: 'Can you help me improve my consultation note template?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    messages: [
      {
        id: '2-1',
        role: 'user',
        content: 'Can you help me improve my consultation note template?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
      },
      {
        id: '2-2',
        role: 'assistant',
        content: 'Of course! I\'d be happy to help improve your consultation note template. Could you share the current template or describe what sections you\'d like to include?',
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2 + 1000 * 60),
      },
    ],
  },
  {
    id: '3',
    title: 'IVF protocol questions',
    lastMessagePreview: 'What is the standard monitoring schedule for an antagonist protocol?',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    messages: [],
  },
];

export const AIAssistantProvider = ({ children }: { children: ReactNode }) => {
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const selectedConversation = conversations.find(c => c.id === selectedConversationId) || null;

  const filteredConversations = conversations.filter(c => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      c.title.toLowerCase().includes(query) ||
      c.lastMessagePreview.toLowerCase().includes(query)
    );
  });

  const createNewChat = () => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New chat',
      lastMessagePreview: '',
      updatedAt: new Date(),
      messages: [],
    };
    setConversations(prev => [newConversation, ...prev]);
    setSelectedConversationId(newConversation.id);
  };

  const selectConversation = (id: string) => {
    setSelectedConversationId(id);
  };

  const renameConversation = (id: string, newTitle: string) => {
    setConversations(prev =>
      prev.map(conv =>
        conv.id === id ? { ...conv, title: newTitle.trim() || 'Untitled' } : conv
      )
    );
  };

  const deleteConversation = (id: string) => {
    const currentIndex = conversations.findIndex(c => c.id === id);
    
    setConversations(prev => prev.filter(conv => conv.id !== id));
    
    // If deleting the selected conversation, select the next one
    if (selectedConversationId === id) {
      const remainingConversations = conversations.filter(c => c.id !== id);
      if (remainingConversations.length > 0) {
        // Select the next conversation or the previous one if we deleted the last
        const nextIndex = Math.min(currentIndex, remainingConversations.length - 1);
        setSelectedConversationId(remainingConversations[nextIndex].id);
      } else {
        setSelectedConversationId(null);
      }
    }
  };

  const sendMessage = (content: string) => {
    if (!selectedConversationId || !content.trim()) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: 'user',
      content: content.trim(),
      createdAt: new Date(),
    };

    // Add user message immediately
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id !== selectedConversationId) return conv;
        
        const isNewChat = conv.title === 'New chat' && conv.messages.length === 0;
        
        return {
          ...conv,
          title: isNewChat ? content.trim().slice(0, 30) + (content.length > 30 ? '...' : '') : conv.title,
          lastMessagePreview: content.trim(),
          updatedAt: new Date(),
          messages: [...conv.messages, userMessage],
        };
      })
    );

    // Show loading state
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: `msg-${Date.now() + 1}`,
        role: 'assistant',
        content: `Thank you for your question about "${content.trim().slice(0, 50)}${content.length > 50 ? '...' : ''}". I'm here to help with clinical, workflow, or product questions. How can I assist you further?`,
        createdAt: new Date(),
      };

      setConversations(prev =>
        prev.map(conv => {
          if (conv.id !== selectedConversationId) return conv;
          return {
            ...conv,
            messages: [...conv.messages, aiMessage],
          };
        })
      );
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AIAssistantContext.Provider
      value={{
        conversations,
        selectedConversationId,
        selectedConversation,
        createNewChat,
        selectConversation,
        sendMessage,
        renameConversation,
        deleteConversation,
        searchQuery,
        setSearchQuery,
        filteredConversations,
        isLoading,
      }}
    >
      {children}
    </AIAssistantContext.Provider>
  );
};

export const useAIAssistant = () => {
  const context = useContext(AIAssistantContext);
  if (!context) {
    throw new Error('useAIAssistant must be used within an AIAssistantProvider');
  }
  return context;
};
