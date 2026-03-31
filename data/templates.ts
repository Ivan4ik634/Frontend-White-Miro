import { BoardTemplateT } from '@/types/Board';

export const BOARD_TEMPLATES: BoardTemplateT[] = [
  {
    title: 'Team Project',
    text: 'Organize teamwork and track progress across tasks.',
    type: 'team',
    tags: ['collaboration', 'management', 'tasks', 'teamwork', 'planning'],
  },
  {
    title: 'Personal Tasks',
    text: 'Manage your personal to-do list and daily goals.',
    type: 'personal',
    tags: ['productivity', 'goals', 'to-do', 'self', 'daily'],
  },
  {
    title: 'Sprint Board',
    text: 'Manage tasks during agile sprints and standups.',
    type: 'other',
    tags: ['agile', 'scrum', 'sprint', 'development', 'workflow'],
  },
  {
    title: 'Startup Roadmap',
    text: 'Plan product milestones and business development steps.',
    type: 'startup',
    tags: ['startup', 'roadmap', 'strategy', 'growth', 'planning'],
  },
  {
    title: 'Learning Tracker',
    text: 'Track courses, skills, and your study progress.',
    type: 'learning',
    tags: ['education', 'skills', 'progress', 'courses', 'study'],
  },
  {
    title: 'Content Planning',
    text: 'Organize ideas, drafts, and publishing workflow.',
    type: 'other',
    tags: ['content', 'marketing', 'social', 'workflow', 'creativity'],
  },
  {
    title: 'Bug Tracker',
    text: 'Log, prioritize, and resolve issues in your project.',
    type: 'bugs',
    tags: ['bugs', 'issues', 'qa', 'debugging', 'development'],
  },
  {
    title: 'Event Planning',
    text: 'Prepare activities, tasks, and deadlines for events.',
    type: 'other',
    tags: ['events', 'schedule', 'organization', 'deadlines', 'planning'],
  },
  {
    title: 'Product Design',
    text: 'Track research, wireframes, feedback, and iterations.',
    type: 'other',
    tags: ['design', 'ux', 'ui', 'research', 'feedback'],
  },
];
