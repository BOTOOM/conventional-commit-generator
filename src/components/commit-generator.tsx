'use client'

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CommitFormData, CommitType, CommitTypeOption } from '@/types/commit-form';
import { generateCommitMessage } from '@/utils/generate-commit-message';
import { CopyButton } from './copy-button';
import { InfoTooltip } from './info-tooltip';
import { commitTypes } from '../data/commit-types';

export default function CommitGenerator() {
  const [formData, setFormData] = useState<CommitFormData>({
    type: 'feat',
    scope: '',
    message: '',
    tickets: '',
    body: '',
  });

  const [commitMessage, setCommitMessage] = useState('');
  const [selectedTypeDescription, setSelectedTypeDescription] = useState(
    commitTypes.find(type => type.key === 'feat')?.description || ''
  );

  useEffect(() => {
    setCommitMessage(generateCommitMessage(formData));
  }, [formData]);

  const handleChange = (field: keyof CommitFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (field === 'type') {
      const selectedType = commitTypes.find(type => type.key === value);
      setSelectedTypeDescription(selectedType?.description || '');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Commit Message Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              onChange={(e) => handleChange('scope', e.target.value)}
              placeholder="Enter scope"
            />
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="message">Main message (max 100 characters)</Label>
            <InfoTooltip content="A brief description of the change" />
          </div>
          <Input
            id="message"
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value.slice(0, 100))}
            placeholder="Enter main message"
            maxLength={100}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="tickets">Related tickets (comma-separated)</Label>
            <InfoTooltip content="List of related ticket numbers" />
          </div>
          <Input
            id="tickets"
            value={formData.tickets}
            onChange={(e) => handleChange('tickets', e.target.value)}
            placeholder="E.g., TICKET-123, TICKET-456"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="body">Additional message (optional)</Label>
            <InfoTooltip content="A more detailed explanation of the change" />
          </div>
          <Textarea
            id="body"
            value={formData.body}
            onChange={(e) => handleChange('body', e.target.value)}
            placeholder="Enter additional message"
            rows={4}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="generated-commit">Generated Git command</Label>
            <InfoTooltip content="The complete git commit command based on your input" />
          </div>
          <div className="flex items-center space-x-2">
            <Input
              id="generated-commit"
              value={commitMessage}
              readOnly
              className="flex-grow"
            />
            <CopyButton text={commitMessage} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

