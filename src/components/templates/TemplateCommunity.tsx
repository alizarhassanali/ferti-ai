import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, MapPin, Stethoscope, FileText, Users } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface TemplateCardProps {
  type: 'Note' | 'Document';
  title: string;
  author: {
    name: string;
    avatar: string;
    specialty: string;
    country: string;
    verified: boolean;
  };
  usageCount: number;
}

const TemplateCard = ({ type, title, author, usageCount }: TemplateCardProps) => {
  return (
    <div className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-card">
      <div className="flex flex-col gap-3">
        <div>
          <p className="text-xs text-muted-foreground mb-1">{type}</p>
          <h3 className="font-semibold text-foreground">{title}</h3>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={author.avatar} alt={author.name} />
              <AvatarFallback>{author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium">{author.name}</span>
                {author.verified && (
                  <div className="h-3 w-3 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-[8px] text-primary-foreground">✓</span>
                  </div>
                )}
              </div>
              <span className="text-xs text-muted-foreground">{author.specialty}</span>
            </div>
          </div>
          
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="h-3 w-3" />
            <span className="text-xs">{usageCount.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const TemplateCommunity = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('Most Popular');
  const [location, setLocation] = useState('All');
  const [specialty, setSpecialty] = useState('All');
  const [category, setCategory] = useState('All');

  // Sample data - replace with actual data
  const templates: TemplateCardProps[] = [
    {
      type: 'Note',
      title: 'GB NHS GP Consult',
      author: {
        name: 'Naveen Nandakumar',
        avatar: '/placeholder.svg',
        specialty: 'General Practitioner',
        country: 'GB',
        verified: true
      },
      usageCount: 5125
    },
    {
      type: 'Note',
      title: 'Meeting Minutes',
      author: {
        name: 'Louise Jones',
        avatar: '/placeholder.svg',
        specialty: 'Psychologist',
        country: 'EU',
        verified: true
      },
      usageCount: 3031
    },
    {
      type: 'Note',
      title: 'Initial Clinical Interview',
      author: {
        name: 'Olga Lavalle',
        avatar: '/placeholder.svg',
        specialty: 'Psychologist',
        country: 'EU',
        verified: true
      },
      usageCount: 2681
    },
    {
      type: 'Note',
      title: 'Psychology Session Notes',
      author: {
        name: 'Olga Lavalle',
        avatar: '/placeholder.svg',
        specialty: 'Psychologist',
        country: 'EU',
        verified: true
      },
      usageCount: 2274
    },
    {
      type: 'Note',
      title: 'Main template GP consult',
      author: {
        name: 'Brett Ogilvie',
        avatar: '/placeholder.svg',
        specialty: 'General Practitioner',
        country: 'EU',
        verified: true
      },
      usageCount: 1949
    },
    {
      type: 'Document',
      title: 'Comprehensive Psychiatric Intake',
      author: {
        name: 'Elena del Busto',
        avatar: '/placeholder.svg',
        specialty: 'Psychiatrist',
        country: 'US',
        verified: true
      },
      usageCount: 1744
    },
    {
      type: 'Document',
      title: 'Problem Based Primary Clinic Note',
      author: {
        name: 'David Janese',
        avatar: '/placeholder.svg',
        specialty: 'Family Medicine Specialist',
        country: 'US',
        verified: true
      },
      usageCount: 1635
    },
    {
      type: 'Document',
      title: 'ADHD DSM-5 Criteria',
      author: {
        name: 'Kieran McLeod',
        avatar: '/placeholder.svg',
        specialty: 'Psychiatrist',
        country: 'EU',
        verified: true
      },
      usageCount: 1433
    },
    {
      type: 'Document',
      title: 'Case Formulation [4Ps]',
      author: {
        name: 'Olga Lavalle',
        avatar: '/placeholder.svg',
        specialty: 'Psychologist',
        country: 'EU',
        verified: true
      },
      usageCount: 1352
    },
    {
      type: 'Note',
      title: 'Supervision Template',
      author: {
        name: 'Sheyan Gunapala',
        avatar: '/placeholder.svg',
        specialty: 'Psychologist',
        country: 'US',
        verified: true
      },
      usageCount: 1320
    },
    {
      type: 'Note',
      title: 'Simple Meeting Points and Action Plans',
      author: {
        name: 'Melissa Lemon',
        avatar: '/placeholder.svg',
        specialty: 'General Practitioner',
        country: 'GB',
        verified: true
      },
      usageCount: 1155
    },
    {
      type: 'Note',
      title: 'Mental Health Appointment',
      author: {
        name: 'Kieran Dang',
        avatar: '/placeholder.svg',
        specialty: 'General Practitioner',
        country: 'EU',
        verified: true
      },
      usageCount: 1129
    },
    {
      type: 'Note',
      title: 'Emergency Room Assessment',
      author: {
        name: 'Sarah Mitchell',
        avatar: '/placeholder.svg',
        specialty: 'Emergency Medicine',
        country: 'US',
        verified: true
      },
      usageCount: 987
    },
    {
      type: 'Document',
      title: 'Discharge Summary Template',
      author: {
        name: 'James Wong',
        avatar: '/placeholder.svg',
        specialty: 'Internal Medicine',
        country: 'US',
        verified: true
      },
      usageCount: 856
    },
    {
      type: 'Note',
      title: 'Pediatric Well-Child Visit',
      author: {
        name: 'Amanda Rodriguez',
        avatar: '/placeholder.svg',
        specialty: 'Pediatrician',
        country: 'US',
        verified: true
      },
      usageCount: 742
    },
    {
      type: 'Document',
      title: 'Referral Letter Template',
      author: {
        name: 'Thomas Baker',
        avatar: '/placeholder.svg',
        specialty: 'General Practitioner',
        country: 'GB',
        verified: true
      },
      usageCount: 698
    },
    {
      type: 'Note',
      title: 'Telemedicine Consultation',
      author: {
        name: 'Maria Santos',
        avatar: '/placeholder.svg',
        specialty: 'Family Medicine',
        country: 'EU',
        verified: true
      },
      usageCount: 645
    },
    {
      type: 'Document',
      title: 'Pre-Operative Assessment',
      author: {
        name: 'Robert Chen',
        avatar: '/placeholder.svg',
        specialty: 'Anesthesiologist',
        country: 'US',
        verified: true
      },
      usageCount: 589
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-serif">Template Hub</h1>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for a template"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Sort
                <Badge variant="secondary" className="ml-1">{sortBy}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSortBy('Most Popular')}>Most Popular</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Newest')}>Newest</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy('Most Used')}>Most Used</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <MapPin className="h-4 w-4" />
                Location
                <Badge variant="secondary" className="ml-1">{location}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setLocation('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation('US')}>United States</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation('GB')}>United Kingdom</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setLocation('EU')}>Europe</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <Stethoscope className="h-4 w-4" />
                Specialty
                <Badge variant="secondary" className="ml-1">{specialty}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setSpecialty('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSpecialty('General Practice')}>General Practice</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSpecialty('Psychology')}>Psychology</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSpecialty('Psychiatry')}>Psychiatry</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
                <FileText className="h-4 w-4" />
                Category
                <Badge variant="secondary" className="ml-1">{category}</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setCategory('All')}>All</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategory('Clinical Notes')}>Clinical Notes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategory('Consultation')}>Consultation</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setCategory('Assessment')}>Assessment</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template, index) => (
            <TemplateCard key={index} {...template} />
          ))}
        </div>
      </div>
    </div>
  );
};
