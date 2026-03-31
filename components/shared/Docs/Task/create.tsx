import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { docsErrorTaskCreateResponses } from '@/data/docsError';
import { docsCreateTask } from '@/data/docsParameters';
import Link from 'next/link';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsCreateTask: React.FC<Props> = (props) => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-create-task" className="text-4xl">
          How to Create a Task
        </DocsTitle>
        <DocsDescription>
          Tasks allow you to organize your work inside a board. Each task belongs to a specific
          board and can contain a title, description, status, priority, and assigned users. You can
          create a new task either through the dashboard or directly via SDK or REST API.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="create-task-from-dashboard">1. Create a Task from the Dashboard</DocsTitle>
        <DocsDescription>
          1. Open your <Link href={PAGES.boards}>Dashboard</Link> and select the board.
        </DocsDescription>
        <DocsDescription>
          2. Click the <b>“+ Add Task”</b> button.
        </DocsDescription>
        <DocsDescription>
          3. Fill in the title, description, status (e.g., “to do”, “in progress”, “done”), and
          priority.
        </DocsDescription>
        <DocsDescription>4. Optionally assign users to the task.</DocsDescription>
        <DocsDescription>
          5. Click <b>Create</b> to save the task.
        </DocsDescription>
        <DocsDescription>
          Tip: Once created, the task instantly appears for all board members in real time.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="create-task-code">2. Create a Task via Code (for Developers)</DocsTitle>
        <DocsDescription>
          Developers can create a task via SDK (recommended) or by sending a REST API request. Both
          methods are shown below.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsUnderTitle>Example using JavaScript (via SDK)</DocsUnderTitle>
        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

async function main() {
  try {
    const task = await whiteMiro.createTask('BOARD_ID_HERE', {
      title: 'Design homepage layout',
      text: 'Create wireframes for the landing page',
    });

    console.log('Task created successfully:', task);
  } catch (error) {
    console.error('Failed to create task:', error.message);
  }
}

main();`}
        />
      </DocsSection>

      <DocsSection>
        <DocsUnderTitle>Example using HTTP (via REST API)</DocsUnderTitle>
        <Code
          language="bash"
          code={`POST ${process.env.NEXT_PUBLIC_BACKEND_URL!}/task/BOARD_ID_HERE
Authorization: <your_token>
Content-Type: application/json

{
  "title": "Design homepage layout",
  "text": "Create wireframes for the landing page",
}
  
Response:
{
    "_id": "67a123atq123fas512",
    "title": "Design homepage layout",
    "text": "Create wireframes for the landing page",
    "userId": "user",
    "isDone": false,
    "x":0,
    "y":0,
    "edges": [];
    "boardId": "test",
    "createdAt": string;
    
}`}
        />
      </DocsSection>

      <DocsSection>
        <DocsTitle id="task-fields">3. Task Fields</DocsTitle>
        <DocsDescription>
          The following fields can be provided when creating a task:
        </DocsDescription>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docsCreateTask.map((obj) => (
              <TableRow key={obj.name}>
                <TableCell className="font-medium">{obj.name}</TableCell>
                <TableCell>{obj.type}</TableCell>
                <TableCell className="text-right">{obj.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="error-responses">4. Error Responses</DocsTitle>
        <DocsDescription>
          Below are common errors you might encounter while creating a task.
        </DocsDescription>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Code</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docsErrorTaskCreateResponses.map((obj) => (
              <TableRow key={obj.code}>
                <TableCell className="font-medium">{obj.code}</TableCell>
                <TableCell>{obj.message}</TableCell>
                <TableCell className="text-right">{obj.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="next-steps">5. Next Steps</DocsTitle>
        <DocsDescription>After creating a task, you might want to:</DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsTaskEdit}>Edit task</DocsRedirect>
          <DocsRedirect href={PAGES.docsTaskDelete}>Delete task</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
