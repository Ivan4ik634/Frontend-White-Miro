import { PAGES } from '@/config/pages';
import { methods } from '@/data/docsMethods';
import { DocsInitialize } from '../Initialize';
import { DocsInstallation } from '../Installation';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsStarted: React.FC<Props> = (props) => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="get-started" className="text-4xl">
          Get started
        </DocsTitle>
        <DocsDescription>
          Welcome to White Miro SDK — a lightweight and intuitive library that allows developers to
          interact with the White Miro board system using simple and well-structured methods. With
          this SDK, you can easily manage boards and tasks (CRUD operations) directly from your
          code. It’s perfect for building integrations, automation tools, or custom dashboards on
          top of your White Miro workspace.
        </DocsDescription>
      </DocsSection>
      <DocsInstallation />
      <DocsInitialize />
      <DocsSection>
        <DocsUnderTitle>Example: Create Your First Board</DocsUnderTitle>
        <DocsDescription>
          Let’s start by creating a board. Each board is associated with a user (via userId) and can
          contain multiple tasks.
        </DocsDescription>

        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

// Example usage:
async function main() {
  try {
    const newBoard = await whiteMiro.createBoard({
      title: 'My first project board',
      text: 'A board to organize my first White Miro tasks',
    });

    console.log('Board created successfully:', newBoard);
  } catch (error) {
    console.error('Failed to create board:', error);
  }
}

main();`}
        />
      </DocsSection>
      <DocsSection>
        <DocsUnderTitle>Example: Create a Task</DocsUnderTitle>
        <DocsDescription>
          After creating a board, you can add tasks to it. Each task must have a boardId and userId.
        </DocsDescription>
        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

async function addTask() {
   const task = await whiteMiro.createTask('BOARD_ID_HERE', {
      title: 'Design homepage layout',
      text: 'Create wireframes for the landing page',
    });

  console.log('Task created:', task);
}

addTask();`}
        />
      </DocsSection>
      <DocsSection>
        <DocsTitle id="what-inside-the-sdk">What’s Inside the SDK?</DocsTitle>
        <div className="flex mt-2 flex-col gap-y-4">
          {methods.map((method) => (
            <DocsDescription>
              {method.title} - {method.desc}
            </DocsDescription>
          ))}
        </div>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="notes">Notes</DocsTitle>
        <DocsDescription>
          Each request requires a valid userId. When working with tasks, a valid boardId must also
          be provided. All SDK methods return Promises — make sure to use await or handle them with
          .then().
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="next-steps">Next Steps</DocsTitle>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsBoardCreate}>Create board</DocsRedirect>
          <DocsRedirect href={PAGES.docsTaskCreate}>Create task</DocsRedirect>
          <DocsRedirect href={PAGES.docsBoardInvite}>Invite friends</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
