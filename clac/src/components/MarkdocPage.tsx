// src/components/MarkdocPage.tsx
import React, { useMemo } from 'react';
import Markdoc from '@markdoc/markdoc';
import DocRootLayout from '@theme/DocRoot/Layout';
import DocSidebar from '@theme/DocSidebar';
import { useDocsSidebar } from '@docusaurus/theme-common/internal';
import components from './markdoc';
import Prose from './Prose';

interface MarkdocPageProps {
  doc: {
    markdoc: {
      content: any;
    };
    frontmatter: {
      pageTitle: string;
      route: string;
      // ... other frontmatter properties
    };
  };
  path: string;
}

const MarkdocPage: React.FC<MarkdocPageProps> = ({ doc, path }) => {
  console.log("MarkdocPage doc", doc);

  const sidebar = useDocsSidebar();
  console.log("MarkdocPage sidebar", sidebar);

  const renderedContent = useMemo(() => {
    if (doc && doc.markdoc && doc.markdoc.content) {
      return Markdoc.renderers.react(doc.markdoc.content, React, { components });
    }
    return null;
  }, [doc]);

  console.log("MarkdocPage renderedContent", renderedContent);

  if (!renderedContent) {
    return <div>No content available</div>;
  }


  return (
    <DocRootLayout>
      <div className="row p-6">
        {/* <div className="col col--3">
          {sidebar && <DocSidebar
            sidebar={sidebar.items}
            path={path}
            onCollapse={() => { }}
            isHidden={false}
          />}
        </div> */}
        <main className="col col--9">
          {/* <h1>{doc.frontmatter.pageTitle}</h1> */}
          <Prose>{renderedContent}</Prose>
        </main>
      </div>
    </DocRootLayout>
  );
};

export default MarkdocPage;