import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';

interface Props {}

export const DocsEditTask: React.FC<Props> = () => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-edit-task" className="text-4xl">
          How to Edit a Task
        </DocsTitle>
        <DocsDescription>
          Editing an existing task allows you to change its name, description, status, assigned
          user, or other details. All changes are synchronized in real time, so other collaborators
          on the same board instantly see the updates.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="edit-task-from-board">1. Edit a Task from the Board UI</DocsTitle>
        <DocsDescription>1. Open the board containing the task you want to edit</DocsDescription>
        <DocsDescription>2. Click on the task card to open its details</DocsDescription>
        <DocsDescription>3. Click the "Edit" icon</DocsDescription>
        <DocsDescription>
          4. Modify the desired fields — such as title, description, deadline, or assigned user
        </DocsDescription>
        <DocsDescription>5. Click "Save" to confirm</DocsDescription>
        <DocsDescription>
          Once saved, all users viewing the same board will instantly see your changes.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="edit-task-code">2. Edit a Task via Code (SDK Example)</DocsTitle>
        <DocsDescription>
          Developers can edit a task programmatically using the <code>updateTask</code> method in
          the SDK. This method sends a <code>PATCH</code> request to the backend.
        </DocsDescription>

        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

async function main() {
  try {
    const updated = await whiteMiro.updateTask('TASK_ID_HERE', {
      title: 'New task name',
      description: 'Updated task description',
      isDone: true,
    });

    console.log('Task updated successfully:', updated);
  } catch (error) {
    console.error('Failed to update task:', error.message);
  }
}

main();
`}
        />
      </DocsSection>

      <DocsSection>
        <DocsTitle id="edit-from-rest-api">3. Edit via REST API</DocsTitle>
        <DocsDescription>
          You can also send a direct HTTP <code>PATCH</code> request to the API to edit a task.
        </DocsDescription>

        <Code
          language="bash"
          code={`PATCH ${process.env.NEXT_PUBLIC_BACKEND_URL!}/task/TASK_ID_HERE
Content-Type: application/json

{
  "title": "New task name",
  "description": "Updated task description",
  "status": "done",
  "assignedTo": "USER_ID_HERE"
}`}
        />
      </DocsSection>

      <DocsSection>
        <DocsTitle id="editable-fields">4. Editable Fields</DocsTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">title</TableCell>
              <TableCell>string</TableCell>
              <TableCell className="text-right">New title of the task</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">description</TableCell>
              <TableCell>string</TableCell>
              <TableCell className="text-right">Updated description for the task</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">status</TableCell>
              <TableCell>string</TableCell>
              <TableCell className="text-right">
                Current status (e.g., “todo”, “in-progress”, “done”)
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">assignedTo</TableCell>
              <TableCell>string (User ID)</TableCell>
              <TableCell className="text-right">User assigned to this task</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="error-responses">5. Error Responses</DocsTitle>
        <DocsDescription>Below are some common error responses when editing tasks:</DocsDescription>
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
              <TableCell className="font-medium">400</TableCell>
              <TableCell>Invalid task data</TableCell>
              <TableCell className="text-right">Some fields are missing or invalid</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">404</TableCell>
              <TableCell>Task not found</TableCell>
              <TableCell className="text-right">The task ID doesn’t exist</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">403</TableCell>
              <TableCell>Unauthorized</TableCell>
              <TableCell className="text-right">
                You don’t have permission to edit this task
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="next-steps">6. Next Steps</DocsTitle>
        <DocsDescription>After editing a task, you can:</DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsTaskCreate}>Create new task</DocsRedirect>
          <DocsRedirect href={PAGES.docsTaskDelete}>Delete task</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
