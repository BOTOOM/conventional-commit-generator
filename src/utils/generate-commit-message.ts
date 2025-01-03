import { CommitFormData, CommitMessageResponse } from "@/types/commit-form";

export function generateCommitMessage(
  data: CommitFormData
): CommitMessageResponse {
  const { type, scope, message, tickets, body } = data;

  let commitMessage = `${type}`;
  let commitMessageWithBody = "";
  if (scope) commitMessage += `(${scope})`;
  commitMessage += `: ${message}`;

  if (tickets) {
    const ticketList = tickets.split(",").map((ticket) => `#${ticket.trim()}`);
    commitMessage += ` ${ticketList.join(" ")}`;
  }

  if (body) {
    commitMessageWithBody += `${commitMessage}" -m "${body}`;
  }
  return {
    commitMessage: commitMessage,
    commitMessageWithBody: `git commit -m "${
      commitMessageWithBody !== "" ? commitMessageWithBody : commitMessage
    }"`,
  };
}
