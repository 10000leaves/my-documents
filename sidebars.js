/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  gitSidebar: [{type: 'autogenerated', dirName: 'Git'}],
  markdownSidebar: [{type: 'autogenerated', dirName: 'Markdown'}],
  bootCampSidebar: [{type: 'autogenerated', dirName: 'フロントエンドブートキャンプ'}],
  web3Sidebar: [{type: 'autogenerated', dirName: 'Web3'}],
  basicsSidebar: [{type: 'autogenerated', dirName: 'フロントエンドブートキャンプ/基礎編'}],
  advancedSidebar: [{type: 'autogenerated', dirName: 'フロントエンドブートキャンプ/応用編'}],
  exSidebar: [{type: 'autogenerated', dirName: 'フロントエンドブートキャンプ/EX編'}],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */
};

export default sidebars;
