// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'フロントエンドブートキャンプ',
  tagline: 'フロントエンドについて学習できます。',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://cs-frontend-bootcamp.netlify.app',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'docusaurus', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'jp',
    locales: ['jp'],
  },

  // 検索プラグイン
  plugins: [
    [
      require.resolve("@easyops-cn/docusaurus-search-local"),
      {
        // Options here
        indexDocs: true,
        language: "ja",
      },
    ],
  ],

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({docPath}) =>
            `https://github.com/10000leaves/my-documents/tree/main/docs/${docPath}`,
          showLastUpdateAuthor: true, // 最終更新者を表示
          showLastUpdateTime: true, // 最終更新日を表示
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: ({blogPath}) =>
            `https://github.com/10000leaves/my-documents/tree/main/blog/${blogPath}`,
          blogSidebarTitle: 'All posts',
          blogSidebarCount: 'ALL',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      navbar: {
        title: 'フロントエンドブートキャンプ',
        logo: {
          alt: 'Docusaurus Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'gitSidebar',
            position: 'left',
            label: 'Git',
          },
          {
            type: 'docSidebar',
            sidebarId: 'markdownSidebar',
            position: 'left',
            label: 'Markdown',
          },
          {
            type: 'dropdown',
            label: 'FrontEnd',
            position: 'left',
            items: [
              {
                type: 'doc',
                docId: 'フロントエンドブートキャンプ/リファレンス',
                label: 'リファレンス',
              },
              {
                type: 'docSidebar',
                sidebarId: 'basicsSidebar',
                label: '基礎編',
              },
              {
                type: 'docSidebar',
                sidebarId: 'advancedSidebar',
                label: '応用編',
              },
              {
                type: 'docSidebar',
                sidebarId: 'exSidebar',
                label: 'EX編',
              },
              // ... more items
            ],
          },
          {
            type: 'docSidebar',
            sidebarId: 'mobileSidebar',
            position: 'left',
            label: 'Mobile',
          },
          {
            type: 'docSidebar',
            sidebarId: 'web3Sidebar',
            position: 'left',
            label: 'Web3',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          // {
          //   title: 'Docs',
          //   items: [
          //     {
          //       label: 'Tutorial',
          //       to: '/docs/intro',
          //     },
          //   ],
          // },
          // {
          //   title: 'Community',
          //   items: [
          //     {
          //       label: 'Stack Overflow',
          //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
          //     },
          //     {
          //       label: 'Discord',
          //       href: 'https://discordapp.com/invite/docusaurus',
          //     },
          //     {
          //       label: 'Twitter',
          //       href: 'https://twitter.com/docusaurus',
          //     },
          //   ],
          // },
          // {
          //   title: 'More',
          //   items: [
          //     {
          //       label: 'Blog',
          //       to: '/blog',
          //     },
          //     {
          //       label: 'GitHub',
          //       href: 'https://github.com/facebook/docusaurus',
          //     },
          //   ],
          // },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} フロントエンドブートキャンプ. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
  // mermaidについて追記
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
