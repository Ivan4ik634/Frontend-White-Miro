import Code from '../ui/code';
import { DocsDescription } from '../ui/description';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';

interface Props {}

export const DocsInstallation: React.FC<Props> = (props) => {
  return (
    <DocsSection>
      <DocsTitle id="installation">Installation</DocsTitle>
      <DocsDescription>Install the library using your preferred package manager:</DocsDescription>
      <Code
        language="bash"
        code={`# npm
npm install white-miro-sdk
    
# or yarn
yarn add white-miro-sdk
    
# or pnpm
pnpm add white-miro-sdk
    
# or bun
bun add white-miro-sdk`}
      />
    </DocsSection>
  );
};
