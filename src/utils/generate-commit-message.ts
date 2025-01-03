import { CommitFormData } from '@/types/commit-form';

export function generateCommitMessage(data: CommitFormData): string {
  const { type, scope, message, tickets, body } = data;
  
  let commitMessage = `${type}`;
  if (scope) commitMessage += `(${scope})`;
  commitMessage += `: ${message}`;
  
  if (tickets) {
    const ticketList = tickets.split(',').map(ticket => `#${ticket.trim()}`);
    commitMessage += ` ${ticketList.join(' ')}`;
  }
  
  if (body) {
    commitMessage += `" -m "${body}`;
  }
  
  return `git commit -m "${commitMessage}"`;
}

