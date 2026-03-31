import { PAGES } from '@/config/pages';
import { DocsInitialize } from '.';
import { DocsDescription } from '../ui/description';
import { DocsRedirect } from '../ui/redirect';
import { DocsSection } from '../ui/section';
import { DocsTitle } from '../ui/title';

interface Props {}

export const DocsInitializePage: React.FC<Props> = (props) => {
  return (
    <>
      <DocsInitialize />
      <DocsSection>
        <DocsTitle id="next-step">Next steps</DocsTitle>
        <DocsDescription>After you have initialized, you can watch it:</DocsDescription>
        <div className="flex flex-col gap-y-3">
          <DocsRedirect href={PAGES.docsBoardCreate}>Create new board</DocsRedirect>
          <DocsRedirect href={PAGES.docsTaskCreate}>Create new task</DocsRedirect>
          <DocsRedirect href={PAGES.docsGetKeys}>Keys</DocsRedirect>
        </div>
      </DocsSection>
    </>
  );
};
