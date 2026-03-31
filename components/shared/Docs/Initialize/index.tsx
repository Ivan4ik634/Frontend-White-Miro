import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';

interface Props {}

export const DocsInitialize: React.FC<Props> = (props) => {
  return (
    <DocsSection>
      <DocsTitle id="initialize">Initialize the SDK</DocsTitle>
      <DocsDescription>
        Before making any requests, initialize the SDK with your access token. You can do this once
        at the start of your application (for example, in a separate <kbd>initWhiteMiro.ts</kbd>{' '}
        file):
      </DocsDescription>
      <Code
        code={`import { initWhiteMiro } from 'white-miro-sdk';
    
export const whiteMiro = initWhiteMiro({
    token: process.env.WHITE_MIRO_TOKEN!,
})`}
      />
    </DocsSection>
  );
};
