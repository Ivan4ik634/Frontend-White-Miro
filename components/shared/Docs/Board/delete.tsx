import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { docsErrorBoardDeleteResponses } from '@/data/docsError';
import Link from 'next/link';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsDeleteBoard: React.FC<Props> = (props) => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-delete-board" className="text-4xl">
          How to Delete a Board
        </DocsTitle>
        <DocsDescription>
          If you no longer need a board, you can easily delete it using the deleteBoard method from
          the White Miro SDK. This will permanently remove the board and all its related tasks and
          data from your workspace — so be careful before running this command.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="delete-board-from-dashboard">1. Delete a Board from the Dashboard</DocsTitle>
        <DocsDescription>
          1. Go to your <Link href={PAGES.boards}>Dashboard</Link>
        </DocsDescription>
        <DocsDescription>2. Hover over the board you want to delete</DocsDescription>
        <DocsDescription>3. Click the "⋯" (options) button</DocsDescription>
        <DocsDescription>4. Click Delete Board</DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="delete-board-code">2. Delete a Board via Code (for Developers)</DocsTitle>
        <DocsDescription>
          You can delete an existing board by sending a delete request to the /board/:id endpoint.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsUnderTitle>Example using JavaScript (via SDK)</DocsUnderTitle>
        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

async function main() {
  try {
    const deleted = await whiteMiro.deleteBoard('BOARD_ID_HERE');

    console.log('Board deleted successfully:', deleted);
  } catch (error) {
    console.error('Failed to delete board:', error.message);
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
          code={`DELETE ${process.env.NEXT_PUBLIC_BACKEND_URL!}/board/BOARD_ID_HERE
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN
`}
        />
      </DocsSection>

      <DocsSection>
        <DocsTitle id="error-responses">3. Error Responses</DocsTitle>

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
            {docsErrorBoardDeleteResponses.map((obj) => (
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
        <DocsTitle id="next-steps">4. Next Steps</DocsTitle>

        <DocsDescription>Once your board is deleted, you can:</DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsTaskDelete}>Delete task</DocsRedirect>
          <DocsRedirect href={PAGES.docsBoardInvite}>Invite members</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
