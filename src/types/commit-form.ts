export type CommitType = 'feat' | 'fix' | 'docs' | 'test' | 'refactor' | 'style' | 'perf';

export interface CommitFormData {
  type: CommitType;
  scope: string;
  message: string;
  tickets: string;
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

