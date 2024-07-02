// plugins/markdoc-plugin.js

// const CONTENT_API_URL = 'https://umbrella.dev1.devspace.lsea4.livelyvideo.tv/api/v1/markdoc';
const SIDEBAR_API_URL = 'https://umbrella.chris.devspace.lsea4.livelyvideo.tv/api/v1/markdoc/navigation';

// async function fetchDocContent(docId) {
//   console.log('fetching doc', docId);
//   const response = await fetch(`${CONTENT_API_URL}?path=${docId}`);
//   return response.json();
// }

async function fetchSidebar() {
  const response = await fetch(SIDEBAR_API_URL);
  return response.json();
}

function transformSidebarData(root) {
  function processDocuments(documents, parentPath = '') {
    return Object.values(documents).map(doc => {
      const item = {
        type: 'doc',
        id: doc.key,
        label: doc.linkTitle || doc.pageTitle,
        href: `/docs${parentPath}/${doc.key}`,
        link: {
          type: 'doc',
          id: doc.key,
        },
      };

      if (Object.keys(doc.documents).length > 0) {
        item.type = 'category';
        item.items = processDocuments(doc.documents, `${parentPath}/${doc.key}`);
      }

      return item;
    });
  }

  return processDocuments(root.documents);
}

module.exports = function (context, options) {
  return {
    name: 'markdoc-plugin',
    async loadContent() {
      console.log('loadContent -------');
      const sidebarData = await fetchSidebar();
      const transformedSidebar = transformSidebarData(sidebarData);
      // console.log('transformedSidebar', transformedSidebar);
      return { sidebar: transformedSidebar, rawSidebar: sidebarData };
    },
    async contentLoaded({ content, actions }) {
      console.log('contentLoaded -------');
      // console.log('contentLoaded', content);
      const { addRoute, createData, setGlobalData } = actions;
      const { sidebar, rawSidebar } = content;

      setGlobalData({ sidebar, rawSidebar });

      const sidebarPath = await createData(
        'sidebar.json',
        JSON.stringify(sidebar)
      );

      async function addRoutesRecursively(documents, parentPath = '') {
        for (const doc of Object.values(documents)) {
          const route = `${parentPath}/${doc.key}`;

          // Create a data file for this document
          const docDataPath = await createData(
            `${doc.key}.json`,
            JSON.stringify({ route: doc.route })
          );

          console.log('adding route');
          console.log('-------------------------');
          console.log(`/docs${route}`);
          console.log('-------------------------\n');
          console.log('doc', doc);

          addRoute({
            // path: route,
            path: `/docs${route}`,
            component: '@site/src/components/MarkdocPageWrapper',
            exact: true,
            modules: {
              doc: docDataPath,
              sidebar: sidebarPath,
              metadata: await createData(
                `${doc.key}-metadata.json`,
                JSON.stringify({
                  id: doc.key,
                  title: doc.pageTitle,
                  description: '', // needed?
                  sidebar_label: doc.linkTitle || doc.pageTitle,
                })
              ),
            },
          });

          if (Object.keys(doc.documents).length > 0) {
            await addRoutesRecursively(doc.documents, route);
          }
        }
      }

      await addRoutesRecursively(rawSidebar.documents);
    },
  };
};