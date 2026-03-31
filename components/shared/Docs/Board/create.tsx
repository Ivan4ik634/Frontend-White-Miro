import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { docsCreateBoardParameters } from '@/data/docsParameters';
import { docsBoardStructure } from '@/data/docsStructure';
import Link from 'next/link';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsCreateBoard: React.FC<Props> = (props) => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-create-board" className="text-4xl">
          How to Create a Board
        </DocsTitle>
        <DocsDescription>
          Boards are the foundation of your workspace — they help you organize tasks, ideas, or
          projects visually. This guide will show you how to create a new board programmatically
          using our SDK or through the dashboard interface.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="create-board-from-dashboard">1. Create a Board from the Dashboard</DocsTitle>
        <DocsDescription>
          1. Go to your <Link href={PAGES.boards}>Dashboard</Link>
        </DocsDescription>
        <DocsDescription>2. Click the "Add Board” button</DocsDescription>
        <DocsDescription>3. Enter a name and optional description</DocsDescription>
        <DocsDescription>4. Choose who can view or edit the board (optional)</DocsDescription>
        <DocsDescription>5. Click Create — and you’re ready to start adding tasks!</DocsDescription>
        <DocsDescription>
          Tip: You can drag and drop elements, assign tasks, or invite team members right after the
          board is created.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="create-board-code">2. Create a Board via Code (for Developers)</DocsTitle>
        <DocsDescription>
          If you’re integrating White Miro into your own app or scripts, use our JavaScript SDK or a
          direct API call.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsUnderTitle>Example using JavaScript (via SDK)</DocsUnderTitle>
        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

async function main() {
  try {
    const board = await whiteMiro.createBoard({
      title: 'My First Board',
      text: 'A simple project planning board',
    });

    console.log('Board created successfully:', board);
  } catch (error) {
    console.error('Failed to create board:', error.message);
  }
}

main();`}
        />
      </DocsSection>
      <DocsSection>
        <DocsUnderTitle>Example using HTTP (via REST API)</DocsUnderTitle>
        <Code
          language="bash"
          code={`POST ${process.env.NEXT_PUBLIC_BACKEND_URL!}/board
Content-Type: application/json
Authorization: Bearer YOUR_TOKEN
{
  "name": "My First Board",
  "description": "A simple project planning board",
}
 `}
        />
      </DocsSection>
      <DocsSection>
        <DocsTitle id="parameters">Parameters</DocsTitle>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Required</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docsCreateBoardParameters.map((obj) => (
              <TableRow key={obj.name}>
                <TableCell className="font-medium">{obj.name}</TableCell>
                <TableCell>{obj.type}</TableCell>
                <TableCell>{obj.required ? 'True' : 'False'}</TableCell>
                <TableCell className="text-right">{obj.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="structure">3. Board Structure</DocsTitle>

        <DocsDescription>Each board contains the following main properties:</DocsDescription>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Description</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {docsBoardStructure.map((obj) => (
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
        <DocsTitle id="next-steps">4. Next Steps</DocsTitle>

        <DocsDescription>Once your board is ready:</DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsTaskCreate}>Add tasks</DocsRedirect>
          <DocsRedirect href={PAGES.docsBoardInvite}>Invite collaborators</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
