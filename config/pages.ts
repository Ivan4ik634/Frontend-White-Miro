export class Pages {
  home = '/';
  tasks = '/app/tasks';
  dashboard = '/app/home';
  activity = '/app/activity';
  templates = '/app/templates';
  boards = '/app/boards';
  settings = '/app/settings';
  login = '/app/login';
  register = '/app/register';
  board(id: string) {
    return `/app/board/${id}`;
  }
  boardSettings(id: string) {
    return `/app/board/${id}/settings`;
  }
  task(id: string) {
    return `/app/task/${id}`;
  }
  docsGetKeys = '/docs/get-keys';
  docsStarted = '/docs/started';
  docsInitialize = '/docs/initialize';
  docsInsallation = '/docs/installation';

  docsTaskCreate = '/docs/task/create';
  docsTaskEdit = '/docs/task/edit';
  docsTaskDelete = '/docs/task/delete';

  docsBoardEdit = '/docs/board/edit';
  docsBoardDelete = '/docs/board/delete';
  docsBoardCreate = '/docs/board/create';
  docsBoardInvite = '/docs/board/invite';
}
export const PAGES = new Pages();
