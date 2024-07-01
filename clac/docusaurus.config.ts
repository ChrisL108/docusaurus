import path from 'path';

console.log("Docusaurus config loaded");

const config = {
  title: 'My Site',
  url: 'https://yoursite.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'your-org',
  projectName: 'your-project',
  staticDirectories: ['static'],
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        debug: true,
        docs: false,
        // docs: {
        //   // path: 'docs',
        //   // routeBasePath: 'docs',
        //   sidebarPath: require.resolve('./sidebars.js'),
        //   exclude: [
        //     '**/markdoc/**',
        //     '**/*.markdoc.md',
        //   ],
        // },
        blog: false,
        theme: {
          customCss: ['./src/css/custom.css'],
        },
      },
    ],
  ],
  plugins: [
    // '@docusaurus/plugin-debug',
    path.resolve(__dirname, 'plugins/markdoc-plugin.js'),
    async function tailwindPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],
  // themeConfig: {
  //   navbar: {
  //     title: 'My Site',
  //     logo: {
  //       alt: 'My Site Logo',
  //       src: 'img/logo.svg',
  //     },
  //     items: [
  //       {
  //         type: 'doc',
  //         docId: 'intro',
  //         position: 'left',
  //         label: 'Docs',
  //       },
  //       // Add more navbar items as needed
  //     ],
  //   },
  //   footer: {
  //     style: 'dark',
  //     links: [
  //       // Add footer links as needed
  //     ],
  //     copyright: `Copyright © ${new Date().getFullYear()} Your Project, Inc. Built with Docusaurus.`,
  //   },
  // },
};

export default config;