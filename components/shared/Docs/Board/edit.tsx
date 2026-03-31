import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { docsEditableBoard } from '@/data/docsEditable';
import { docsErrorBoardEditResponses } from '@/data/docsError';
import Link from 'next/link';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsEditBoard: React.FC<Props> = (props) => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-edit-board" className="text-4xl">
          How to Edit a Board
        </DocsTitle>
        <DocsDescription>
          Editing a board allows you to update its title, description, image, or visibility settings
          without losing existing data. This section will guide you through both the dashboard and
          API methods.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="edit-board-from-dashboard">1. Edit a Board from the Dashboard</DocsTitle>
        <DocsDescription>
          1. Go to your <Link href={PAGES.boards}>Dashboard</Link>
        </DocsDescription>
        <DocsDescription>2. Hover over the board you want to edit</DocsDescription>
        <DocsDescription>3. Click the "⋯" (options) button</DocsDescription>
        <DocsDescription>4. Choose Edit Board</DocsDescription>
        <DocsDescription>
          5. Update the name, description, access (locked/unlocked), or upload a new image
        </DocsDescription>
        <DocsDescription>6. Click Save changes</DocsDescription>
        <DocsDescription>
          Tip: When you update your board, all members instantly see the new name, image, and
          description in real time.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="edit-board-code">2. Edit a Board via Code (for Developers)</DocsTitle>
        <DocsDescription>
          You can update an existing board by sending a PATCH request to the /boards/:id endpoint.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsUnderTitle>Example using JavaScript (via SDK)</DocsUnderTitle>
        <Code
          code={`import { updateBoard } from 'white-miro';

async function main() {
  try {
    const updated = await whiteMiro.updateBoard('BOARD_ID_HERE', {
      title: 'Updated Board Title',
      description: 'New description for my board',
      image: 'https://example.com/new-image.jpg',
      access: 'public',
      status:"done",
    });

    console.log('Board updated successfully:', updated);
  } catch (error) {
    console.error('Failed to update board:', error.message);
  }
}

main();
`}
        />
      </DocsSection>
      <DocsSection>
        <DocsUnderTitle>Example using HTTP (via REST API)</DocsUnderTitle>
        <Code
          language="bash"
          code={`PATCH ${process.env.NEXT_PUBLIC_BACKEND_URL!}/board/BOARD_ID_HERE
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN

{
  "title": "Updated Board Title",
  "text": "New description for my board",
  "access": "locked",
  "status": "done",
  "image": "https://example.com/new-image.jpg"
}`}
        />
      </DocsSection>
      <DocsSection>
        <DocsTitle id="editable-field">3. Editable fields</DocsTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docsEditableBoard.map((obj) => (
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

        <DocsDescription>Each board contains the following main properties:</DocsDescription>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Code</TableHead>
              <TableHead>Message</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docsErrorBoardEditResponses.map((obj) => (
              <TableRow key={obj.message}>
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

        <DocsDescription>Once your board is updated, you can:</DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsBoardDelete}>Delete board</DocsRedirect>
          <DocsRedirect href={PAGES.docsBoardInvite}>Invite collaborators</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
