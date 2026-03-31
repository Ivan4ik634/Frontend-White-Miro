import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui';
import { PAGES } from '@/config/pages';
import { docsErrorBoardInviteResponses } from '@/data/docsError';
import Link from 'next/link';
import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsInviteBoard: React.FC<Props> = (props) => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-invite-a-board" className="text-4xl">
          How to Invite Friends to a Board
        </DocsTitle>
        <DocsDescription>
          Inviting friends to collaborate on your board is quick and easy. However, this feature is
          only available for boards with <b>access: "public"</b>. If your board is private, the
          server will reject the invitation request for security reasons.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="invite-dashboard">1. Invite via Dashboard</DocsTitle>
        <DocsDescription>
          1. Go to your <Link href={PAGES.boards}>Dashboard</Link>.
        </DocsDescription>
        <DocsDescription>2. Hover over the board you want to invite friends to.</DocsDescription>
        <DocsDescription>3. Click the "⋯" (options) button.</DocsDescription>
        <DocsDescription>
          4. Select <b>Invite</b>.
        </DocsDescription>
        <DocsDescription>
          5. Copy the invite link or share it directly with your friends.
        </DocsDescription>
        <DocsDescription>
          Tip: Invitations only work if your board has <code>access: "public"</code>.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsTitle id="invite-code">2. Invite via Code (for Developers)</DocsTitle>
        <DocsDescription>
          You can also send an invite request through the SDK or a direct HTTP call. Below are both
          examples.
        </DocsDescription>
      </DocsSection>

      <DocsSection>
        <DocsUnderTitle>Example using JavaScript (via SDK)</DocsUnderTitle>
        <Code
          code={`import { whiteMiro } from './initWhiteMiro'

async function main() {
  try {
    const result = await whiteMiro.inviteToBoard('BOARD_ID_HERE');
    console.log(result.message);
  } catch (error) {
    console.error('Failed to send invite:', error.message);
  }
}

main();`}
        />
      </DocsSection>

      <DocsSection>
        <DocsUnderTitle>Example using HTTP (via REST API)</DocsUnderTitle>
        <Code
          language="bash"
          code={`POST ${process.env.NEXT_PUBLIC_BACKEND_URL!}/board/invite/BOARD_ID_HERE
Authorization: Bearer YOUR_TOKEN

Response:
{
  "message": "Invitation sent successfully!"
}`}
        />
      </DocsSection>

      <DocsSection>
        <DocsTitle id="error-responses">3. Error Responses</DocsTitle>
        <DocsDescription>
          Below are common errors you might encounter when inviting friends.
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
            {docsErrorBoardInviteResponses.map((obj) => (
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
        <DocsTitle id="next-steps">4. Next Steps</DocsTitle>
        <DocsDescription>
          After sending an invite, your friend can join the board instantly. You can also:
        </DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsBoardEdit}>Update board</DocsRedirect>
          <DocsRedirect href={PAGES.docsBoardDelete}>Delete board</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
