import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsDeleteTask: React.FC<Props> = () => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-delete-task" className="text-4xl">
          How to Delete a Task
        </DocsTitle>
        <DocsDescription>
          Deleting a task permanently removes it from the board. Once deleted, the task cannot be
          restored, so make sure to confirm the action before proceeding. Only the board owner or
          users with edit permissions can delete tasks.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="delete-task-from-board">1. Delete a Task from the Board UI</DocsTitle>
        <DocsDescription>1. Open the board that contains the task</DocsDescription>
        <DocsDescription>2. Click on the task you want to delete</DocsDescription>
        <DocsDescription>3. Click the "⋯" (options) button and select</DocsDescription>
        <DocsDescription>4. Click Delete Task</DocsDescription>
        <DocsDescription>
          Once confirmed, the task will be instantly removed from the board and all users’ views.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="delete-task-code">2. Delete a Task via Code (SDK Example)</DocsTitle>
        <DocsDescription>
          You can programmatically delete a task using the <code>deleteTask</code> method in the
          SDK.
        </DocsDescription>

        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

async function main() {
  try {
    const deleted = await whiteMiro.deleteTask('TASK_ID_HERE');
    console.log('Task deleted successfully:', deleted.message);
  } catch (error) {
    console.error('Failed to delete task:', error.message);
  }
}

main();
`}
        />
      </DocsSection>

      <DocsSection>
        <DocsTitle id="delete-rest-api">3. Delete via REST API</DocsTitle>
        <DocsDescription>
          You can also delete a task directly through the API using the HTTP <code>DELETE</code>{' '}
          method.
        </DocsDescription>

        <Code
          language="bash"
          code={`DELETE ${process.env.NEXT_PUBLIC_BACKEND_URL!}/task/TASK_ID_HERE
Authorization: your_access_token_here`}
        />
      </DocsSection>

      <DocsSection>
        <DocsUnderTitle>4. Response Example</DocsUnderTitle>
        <DocsDescription>
          When the task is successfully deleted, the server returns a confirmation message:
        </DocsDescription>

        <Code
          language="json"
          code={`{
  "message": "Task deleted successfully"
}`}
        />
      </DocsSection>

      <DocsSection>
        <DocsTitle id="error-responses">5. Error Responses</DocsTitle>
        <DocsDescription>Below are common error codes when deleting tasks:</DocsDescription>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Code</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">404</TableCell>
              <TableCell>Task not found</TableCell>
              <TableCell className="text-right">The specified task ID does not exist</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">403</TableCell>
              <TableCell>Unauthorized</TableCell>
              <TableCell className="text-right">You are not allowed to delete this task</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">500</TableCell>
              <TableCell>Server error</TableCell>
              <TableCell className="text-right">
                Unexpected error while processing the request
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="next-steps">6. Next Steps</DocsTitle>
        <DocsDescription>After deleting a task, you may want to:</DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsTaskCreate}>Create new task</DocsRedirect>
          <DocsRedirect href={PAGES.docsTaskEdit}>Edit another task</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
