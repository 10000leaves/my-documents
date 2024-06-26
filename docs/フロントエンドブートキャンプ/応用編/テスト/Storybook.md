---
tags: [フロントエンド]
sidebar_position: 1
---

## Storybook とは
https://storybook.js.org/

Storybook は UI コンポーネントの開発・テストツールであり、以下のことが可能である。

- コンポーネントの独立した開発
- ビジュアルテスト
- インタラクティブなドキュメンテーション

特徴は以下の通り。

- 分離環境：アプリケーションから独立した環境でコンポーネントを開発できる
- アドオン：機能拡張が容易で、様々なアドオンが利用可能
- マルチフレームワーク対応：React, Vue, Angularなど多くのフレームワークをサポート

## インストール方法
### インストール
[公式Docs](https://storybook.js.org/docs/get-started/install)に従ってインストール。

```sh
npx storybook init
```

これにより、ルートディレクトリに`.storybook`ディレクトリ、`src/stories`ディレクトリとその中にサンプルファイルが自動的に生成され、`package.json`ファイルに`npm`コマンドなどが追記される。

### Storybook の実行
Storybook は以下のコマンドで起動。

```sh
npm run storybook
```

## Story の作成方法
Storybook では各コンポーネントに対して「Story」を作成する。

```js
import MyComponent from './MyComponent';

export default {
  title: 'Example/MyComponent',
  component: MyComponent,
};

const Template = (args) => <MyComponent {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: 'Button',
};
```

## 主な機能
Storybook には以下のような主要な機能がある。

- Controls：コンポーネントのプロパティを動的に変更
- Actions：イベントをキャプチャして表示
- Docs：自動生成されるドキュメント
- Viewport：レスポンシブデザインのテスト
