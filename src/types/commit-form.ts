export type CommitType = 'feat' | 'fix' | 'docs' | 'test';

export interface CommitFormData {
  type: CommitType;
  scope: string;
  message: string;
  tickets: string;
  body: string;
}

