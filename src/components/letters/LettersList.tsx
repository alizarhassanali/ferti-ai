import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search } from 'lucide-react';
import { useLetters } from '@/contexts/LettersContext';
import { LetterCard } from './LetterCard';

export const LettersList = () => {
  const { letters, selectedLetterId, setSelectedLetterId } = useLetters();
  const [searchQuery, setSearchQuery] = useState('');

  const toBeSentLetters = letters.filter(l => l.status === 'to_be_sent' || l.status === 'returned');
  const sentLetters = letters.filter(l => l.status === 'sent');

  const filterLetters = (lettersList: typeof letters) => {
    return lettersList.filter(letter =>
      letter.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.templateType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.originatingDoctor.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric'
    });
  };

  const groupByDate = (lettersList: typeof letters) => {
    const grouped: Record<string, typeof letters> = {};
    lettersList.forEach(letter => {
      const dateKey = formatDate(letter.sessionDate);
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(letter);
    });
    return grouped;
  };

  return (
    <div className="h-full flex flex-col bg-content border-r border-border w-80 relative">
      {/* Header */}
      <div className="p-6 pb-2">
        <h2 className="text-2xl font-bold text-foreground mb-1">Letters</h2>
        <p className="text-sm text-muted-foreground">Manage outbound correspondence</p>
      </div>

      {/* Search */}
      <div className="p-4 pt-2 border-b border-border">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/60" />
          <Input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search letters..."
            className="pl-9 bg-white border-[hsl(216_20%_90%)] focus:border-primary"
          />
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="to-be-sent" className="flex-1 flex flex-col overflow-hidden">
        <TabsList className="w-full justify-start bg-transparent border-b border-border px-4 h-auto py-0 rounded-none">
          <TabsTrigger
            value="to-be-sent"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-foreground/60 data-[state=active]:text-foreground text-sm px-3 py-2 hover:text-foreground/80 hover:border-sidebar"
          >
            To be sent
            {toBeSentLetters.length > 0 && (
              <span className="ml-2 text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                {toBeSentLetters.length}
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="sent"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none bg-transparent text-foreground/60 data-[state=active]:text-foreground text-sm px-3 py-2 hover:text-foreground/80 hover:border-sidebar"
          >
            Sent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="to-be-sent" className="flex-1 overflow-y-auto m-0 p-4 space-y-4">
          {filterLetters(toBeSentLetters).length === 0 ? (
            <div className="text-center text-foreground/60 py-8">
              <p className="text-sm">No letters pending</p>
            </div>
          ) : (
            Object.entries(groupByDate(filterLetters(toBeSentLetters))).map(([date, dateLetters]) => (
              <div key={date} className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground/60 px-2 font-medium">
                  📅 {date}
                </div>
                <div className="space-y-2">
                  {dateLetters.map(letter => (
                    <LetterCard
                      key={letter.id}
                      letter={letter}
                      isActive={selectedLetterId === letter.id}
                      onClick={() => setSelectedLetterId(letter.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>

        <TabsContent value="sent" className="flex-1 overflow-y-auto m-0 p-4 space-y-4">
          {filterLetters(sentLetters).length === 0 ? (
            <div className="text-center text-foreground/60 py-8">
              <p className="text-sm">No sent letters</p>
            </div>
          ) : (
            Object.entries(groupByDate(filterLetters(sentLetters))).map(([date, dateLetters]) => (
              <div key={date} className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground/60 px-2 font-medium">
                  📅 {date}
                </div>
                <div className="space-y-2">
                  {dateLetters.map(letter => (
                    <LetterCard
                      key={letter.id}
                      letter={letter}
                      isActive={selectedLetterId === letter.id}
                      onClick={() => setSelectedLetterId(letter.id)}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
