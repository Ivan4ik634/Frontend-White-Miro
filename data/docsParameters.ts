export const docsCreateBoardParameters = [
  {
    name: 'name',
    type: 'string',
    required: true,
    description: 'The name of the board',
  },
  {
    name: 'description',
    type: 'string',
    required: false,
    description: 'The description of the board',
  },
  {
    name: 'image',
    type: 'string',
    required: false,
    description: 'Optional board preview image URL',
  },
];
export const docsCreateTask = [
  { name: 'title', type: 'string', description: 'The title of the task (required).' },
  { name: 'text', type: 'string', description: 'Detailed information about the task.' },
];
