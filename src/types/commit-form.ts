export type CommitType = 'feat' | 'fix' | 'docs' | 'test' | 'refactor' | 'style' | 'perf' | 'build' | 'ci' | 'chore' | 'revert';

export interface CommitFormData {
  type: CommitType;
  scope: string;
  message: string;
  tickets: string;
  ticketPrefix: string;
  body: string;
}

export interface CommitTypeOption {
  key: CommitType | string;
  label: string;
  description: string;
}

export interface CommitMessageResponse {
    commitMessage: string;
    commitMessageWithBody: string
  }

