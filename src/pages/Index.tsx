import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to NotesAI
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          AI-powered clinical documentation for healthcare
        </p>
        <Button onClick={() => navigate('/new-session')} size="lg">
          <ArrowRight className="mr-2 h-5 w-5" />
          Open NotesAI
        </Button>
      </div>
    </div>
  );
};

export default Index;
