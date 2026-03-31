export const docsErrorBoardEditResponses = [
  {
    code: 404,
    message: 'Board not found',
    description: 'The board ID doesn’t exist or was deleted',
  },
  { code: 401, message: 'Unauthorized', description: 'You are not allowed to edit this board' },
  { code: 403, message: 'Forbidden', description: 'User has no permission to edit this board' },
  { code: 400, message: 'Invalid input', description: 'The provided data is malformed or missing' },
];
export const docsErrorBoardDeleteResponses = [
  {
    code: 404,
    message: 'Board not found',
    description: 'The board ID doesn’t exist or was deleted',
  },
  { code: 401, message: 'Unauthorized', description: 'You are not allowed to edit this board' },
  { code: 403, message: 'Forbidden', description: 'User has no permission to edit this board' },
  { code: 400, message: 'Invalid input', description: 'The provided data is malformed or missing' },
];
export const docsErrorBoardInviteResponses = [
  {
    code: 401,
    message: 'Unauthorized',
    description: 'You must be logged in to send an invite.',
  },
  {
    code: 403,
    message: 'Board is private',
    description: 'Invites are not allowed on private boards (access: "private").',
  },
  {
    code: 404,
    message: 'Board not found',
    description: 'The provided board ID does not exist.',
  },
];
export const docsErrorTaskCreateResponses = [
  {
    code: 400,
    message: 'Missing required fields',
    description: 'The request is missing one or more required parameters (e.g., title).',
  },
  {
    code: 401,
    message: 'Unauthorized',
    description: 'You must be logged in to create a task.',
  },
  {
    code: 403,
    message: 'Access denied',
    description: 'You do not have permission to create a task on this board.',
  },
  {
    code: 404,
    message: 'Board not found',
    description: 'The board with the given ID does not exist.',
  },
];
