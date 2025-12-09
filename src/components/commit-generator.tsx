'use client'

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CommitFormData, CommitMessageResponse, CommitType, CommitTypeOption } from '@/types/commit-form';
import { generateCommitMessage } from '@/utils/generate-commit-message';
import { CopyButton } from './copy-button';
import { InfoTooltip } from './info-tooltip';
import { commitTypes } from '../data/commit-types';

export default function CommitGenerator() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [formData, setFormData] = useState<CommitFormData>({
    type: 'feat',
    scope: '',
    message: '',
    tickets: '',
    ticketPrefix: '',
    body: '',
  });

  const [commitMessage, setCommitMessage] = useState<CommitMessageResponse>({commitMessage:"", commitMessageWithBody: ""});
  const [selectedTypeDescription, setSelectedTypeDescription] = useState(
    commitTypes.find(type => type.key === 'feat')?.description || ''
  );

  // Initialize ticketPrefix from URL query param
  useEffect(() => {
    const prefixFromUrl = searchParams.get('prefix');
    if (prefixFromUrl) {
      setFormData((prev: CommitFormData) => ({ ...prev, ticketPrefix: prefixFromUrl }));
    }
  }, [searchParams]);

  useEffect(() => {
    setCommitMessage(generateCommitMessage(formData));
  }, [formData]);

  const handleChange = (field: keyof CommitFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'type') {
      const selectedType = commitTypes.find(type => type.key === value);
      setSelectedTypeDescription(selectedType?.description || '');
    }
    // Update URL when ticketPrefix changes
    if (field === 'ticketPrefix') {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set('prefix', value);
      } else {
        params.delete('prefix');
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  };

  const handleGenerateClick = () => {
    setCommitMessage(generateCommitMessage(formData));
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Generate Your Commit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="type">Type</Label>
            <InfoTooltip content={selectedTypeDescription} />
          </div>
          <Select
            value={formData.type}
            onValueChange={(value: CommitType) => handleChange('type', value)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {commitTypes.map((type: CommitTypeOption) => (
                <SelectItem key={type.key} value={type.key}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="scope">Scope (optional)</Label>
            <InfoTooltip content="A noun describing a section of the codebase" />
          </div>
          <Input
            id="scope"
            value={formData.scope}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('scope', e.target.value)}
            placeholder="Enter scope"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="message">Main message (max 100 characters)</Label>
            <InfoTooltip content="A brief description of the change" />
          </div>
          <Input
            id="message"
            value={formData.message}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('message', e.target.value.slice(0, 100))}
            placeholder="Enter main message"
            maxLength={100}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="tickets">Related tickets (comma-separated)</Label>
              <InfoTooltip content="List of related ticket numbers" />
            </div>
            <Input
              id="tickets"
              value={formData.tickets}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('tickets', e.target.value)}
              placeholder="E.g., TICKET-123, 33444"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Label htmlFor="ticketPrefix">Ticket prefix (optional)</Label>
              <InfoTooltip content="Prefix to add before ticket numbers (e.g., AB will result in AB#123)" />
            </div>
            <Input
              id="ticketPrefix"
              value={formData.ticketPrefix}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('ticketPrefix', e.target.value)}
              placeholder="E.g., AB, JIRA"
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="body">Additional message (optional)</Label>
          </div>
          <Textarea
            id="body"
            value={formData.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('body', e.target.value)}
            placeholder="Enter additional message"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label>Generated Git commit message for tool like vs-code</Label>
          <div className="flex items-center space-x-2">
            <Input
              value={commitMessage.commitMessage}
              readOnly
              className="flex-grow bg-slate-100 dark:bg-slate-800"
            />
            <CopyButton text={commitMessage.commitMessage} />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Generated Git command</Label>
          <div className="flex items-center space-x-2">
            <Input
              value={commitMessage.commitMessageWithBody}
              readOnly
              className="flex-grow bg-slate-100 dark:bg-slate-800"
            />
            <CopyButton text={commitMessage.commitMessageWithBody} />
          </div>
        </div>

        <Button 
          onClick={handleGenerateClick}
          className="w-full bg-slate-600 hover:bg-slate-700"
        >
          Generate Commit Message
        </Button>
      </CardContent>
    </Card>
  );
}

