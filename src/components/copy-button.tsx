'use client'

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckIcon, CopyIcon } from 'lucide-react';

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button onClick={handleCopy} variant="outline" size="sm">
      {copied ? <CheckIcon className="h-4 w-4" /> : <CopyIcon className="h-4 w-4" />}
      {copied ? 'Copied' : 'Copy'}
    </Button>
  );
}

