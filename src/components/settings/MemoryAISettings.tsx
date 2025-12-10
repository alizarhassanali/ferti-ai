import { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { useToast } from '@/hooks/use-toast';

export const MemoryAISettings = () => {
  const { toast } = useToast();
  const [inputLanguage, setInputLanguage] = useState('English');
  const [outputLanguage, setOutputLanguage] = useState('English');
  const [temperature, setTemperature] = useState([0.7]);
  const [nucleusSampling, setNucleusSampling] = useState([0.9]);
  const [signatureName, setSignatureName] = useState('');
  const [signatureTitle, setSignatureTitle] = useState('');
  const [signatureSpecialty, setSignatureSpecialty] = useState('');
  const [signatureEmail, setSignatureEmail] = useState('');
  const [signatureCountryCode, setSignatureCountryCode] = useState('+1');
  const [signaturePhone, setSignaturePhone] = useState('');
  const [includeClinicName, setIncludeClinicName] = useState(false);

  const handleChange = (setting: string, value: string | number | boolean) => {
    toast({
      title: 'Setting updated',
      description: `${setting} changed to ${value}`,
    });
  };

  return (
    <div className="w-full">
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-foreground mb-1">Memory & AI Settings</h3>
        <p className="text-sm text-muted-foreground">Customize your AI preferences and language settings</p>
      </div>

      <div className="space-y-8">
        {/* Language Preferences Section */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-1">Language Preferences</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Set your preferred input and output languages for AI processing.
          </p>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <Label htmlFor="inputLanguage" className="text-sm font-medium mb-2 block">
                Default input language
              </Label>
              <Select 
                value={inputLanguage} 
                onValueChange={(value) => {
                  setInputLanguage(value);
                  handleChange('Default input language', value);
                }}
              >
                <SelectTrigger id="inputLanguage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="outputLanguage" className="text-sm font-medium mb-2 block">
                Default output language
              </Label>
              <Select 
                value={outputLanguage} 
                onValueChange={(value) => {
                  setOutputLanguage(value);
                  handleChange('Default output language', value);
                }}
              >
                <SelectTrigger id="outputLanguage">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="French">French</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="German">German</SelectItem>
                  <SelectItem value="Portuguese">Portuguese</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Note Preferences Section */}
        <div className="border border-border rounded-lg p-6 bg-card">
          <h4 className="text-sm font-semibold text-foreground mb-1">Note Preferences</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Configure AI model parameters and signature settings for your notes.
          </p>
          
          <div className="space-y-6">
            {/* Temperature */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">Temperature</Label>
                <span className="text-sm text-muted-foreground">{temperature[0].toFixed(1)}</span>
              </div>
              <Slider
                value={temperature}
                onValueChange={(value) => {
                  setTemperature(value);
                  handleChange('Temperature', value[0]);
                }}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0.0</span>
                <span>1.0</span>
              </div>
            </div>

            {/* Nucleus Sampling */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label className="text-sm font-medium">Nucleus Sampling</Label>
                <span className="text-sm text-muted-foreground">{nucleusSampling[0].toFixed(1)}</span>
              </div>
              <Slider
                value={nucleusSampling}
                onValueChange={(value) => {
                  setNucleusSampling(value);
                  handleChange('Nucleus Sampling', value[0]);
                }}
                min={0}
                max={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0.0</span>
                <span>1.0</span>
              </div>
            </div>

            {/* Signature Settings */}
            <div className="pt-4 border-t border-border">
              <h5 className="text-sm font-semibold text-foreground mb-4">Signature Settings</h5>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="signatureName" className="text-sm font-medium mb-2 block">
                    Name
                  </Label>
                  <Input
                    id="signatureName"
                    value={signatureName}
                    onChange={(e) => setSignatureName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="signatureTitle" className="text-sm font-medium mb-2 block">
                    Title
                  </Label>
                  <Input
                    id="signatureTitle"
                    value={signatureTitle}
                    onChange={(e) => setSignatureTitle(e.target.value)}
                    placeholder="Enter your title"
                  />
                </div>

                <div>
                  <Label htmlFor="signatureSpecialty" className="text-sm font-medium mb-2 block">
                    Specialty
                  </Label>
                  <Input
                    id="signatureSpecialty"
                    value={signatureSpecialty}
                    onChange={(e) => setSignatureSpecialty(e.target.value)}
                    placeholder="Enter your specialty"
                  />
                </div>

                <div>
                  <Label htmlFor="signatureEmail" className="text-sm font-medium mb-2 block">
                    Email
                  </Label>
                  <Input
                    id="signatureEmail"
                    type="email"
                    value={signatureEmail}
                    onChange={(e) => setSignatureEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Phone Number
                  </Label>
                  <div className="flex gap-2">
                    <Select
                      value={signatureCountryCode}
                      onValueChange={setSignatureCountryCode}
                    >
                      <SelectTrigger className="w-24">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="+1">+1</SelectItem>
                        <SelectItem value="+44">+44</SelectItem>
                        <SelectItem value="+33">+33</SelectItem>
                        <SelectItem value="+49">+49</SelectItem>
                        <SelectItem value="+61">+61</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      value={signaturePhone}
                      onChange={(e) => setSignaturePhone(e.target.value)}
                      placeholder="Enter phone number"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2 pt-2">
                  <Checkbox
                    id="includeClinicName"
                    checked={includeClinicName}
                    onCheckedChange={(checked) => setIncludeClinicName(checked as boolean)}
                  />
                  <Label
                    htmlFor="includeClinicName"
                    className="text-sm font-medium cursor-pointer"
                  >
                    Include Clinic Name
                  </Label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};