import { PAGES } from '@/config/pages';

export const linksStartedDocs: { title: string; url: string }[] = [
  { title: 'Get started', url: PAGES.docsStarted },
  { title: 'Installation', url: PAGES.docsInsallation },
  { title: 'Initialize', url: PAGES.docsInitialize },
  { title: 'Keys', url: PAGES.docsGetKeys },
];
export const linksBoardsDocs: { title: string; url: string }[] = [
  { title: 'Create board', url: PAGES.docsBoardCreate },
  { title: 'Edit board', url: PAGES.docsBoardEdit },
  { title: 'Delete board', url: PAGES.docsBoardDelete },
  { title: 'Invite friend board', url: PAGES.docsBoardInvite },
];
export const linksTasksDocs: { title: string; url: string }[] = [
  { title: 'Create task', url: PAGES.docsTaskCreate },
  { title: 'Edit task', url: PAGES.docsTaskEdit },
  { title: 'Delete task', url: PAGES.docsTaskDelete },
];
export const linksDocs = [...linksStartedDocs, ...linksBoardsDocs, ...linksTasksDocs];
