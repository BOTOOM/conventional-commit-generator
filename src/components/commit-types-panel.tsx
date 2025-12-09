import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { commitTypes } from '@/data/commit-types';

export function CommitTypesPanel() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold">Conventional Commit Types</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {commitTypes.map((type) => (
          <div key={type.key} className="text-sm">
            <span className="font-bold">{type.key}:</span>{' '}
            <span className="text-muted-foreground">{type.description}</span>
          </div>
        ))}
        
        <div className="pt-4 space-y-2">
          <a
            href="https://www.conventionalcommits.org/en/v1.0.0/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Conventional commit docs
            <ExternalLink className="h-3 w-3" />
          </a>
          <a
            href="https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit-message-header"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Angular commits docs
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
