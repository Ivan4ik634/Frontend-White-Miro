export const docsEditableBoard = [
  { name: 'title', type: 'string', description: 'New title for your board' },
  { name: 'description', type: 'string', description: 'Updated description' },
  { name: 'access', type: 'string', description: '"locked" or "public"' },
  {
    name: 'status',
    type: 'string',
    description: '"in planning" or "action" or "done" or "archived"',
  },
  { name: 'image', type: 'string (URL)', description: 'Optional new board preview image' },
];
