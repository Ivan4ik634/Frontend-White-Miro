import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';
import { DocsUnderTitle } from '../ui/under-title';

interface Props {}

export const DocsGetKeys: React.FC<Props> = (props) => {
  return (
    <>
      <DocsSection>
        <DocsTitle id="how-to-find-keys">How to Find Your Keys</DocsTitle>
        <DocsDescription>
          Before you can start using the SDK, you will need three identifiers: userId, boardId, and
          token. These are required for most CRUD operations.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id="user">The User Identifier</DocsTitle>
        <DocsDescription>
          Each user has a unique ID in the system. This is automatically generated when a user
          registers. You can find your userId in the Settings section of your dashboard.
        </DocsDescription>
      </DocsSection>
      <DocsSection>
        <DocsTitle id={'board'}>The Board Identifier</DocsTitle>
        <DocsDescription>
          Every board has its own unique ID. When you create a board, the SDK returns the full
          object — including its ID.
        </DocsDescription>
        <DocsUnderTitle>Example:The Board Identifier</DocsUnderTitle>
        <Code
          code={`import { whiteMiro } from './initWhiteMiro';

const newBoard = await whiteMiro.createBoard({
  title: 'My Demo Board',
  text: 'Testing White Miro SDK',
});

console.log(newBoard._id); // ← This is your boardId

          `}
        />
      </DocsSection>
    </>
  );
};
