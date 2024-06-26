---
tags: [フロントエンド]
sidebar_position: 2
---

## Jest と React-Testing-Library とは
Jest: https://jestjs.io/ja  
React-Testing-Library: https://testing-library.com/docs/react-testing-library/intro/  

Jest は JavaScript のテストフレームワークで、React-Testing-Library は React コンポーネントをテストするためのユーティリティです。
これらを組み合わせることで、以下のテストが可能になります：

- ユニットテスト
- インテグレーションテスト
- スナップショットテスト

特徴は以下の通りです

- 簡単なセットアップ：create-react-app で設定済み
- 高速な実行：並列実行とモック機能
- ユーザー中心のテスト：実際のDOM操作に基づくテスト

## インストール方法
### インストール

かなりややこしいので各公式を見てください

#### Babel、Webpack、Viteの場合  
https://jestjs.io/ja/docs/29.5/getting-started

https://testing-library.com/docs/react-testing-library/intro

Viteについてわかりやすい  
https://qiita.com/YSasago/items/489426c020bd686111bd

#### Next.jsの場合  
https://nextjs.org/docs/pages/building-your-application/testing/jest

### テストの実行方法
`npm Scripts`を追記
```json title="package.json"
{
  "scripts": {
    "test": "jest",
  }
}
```

```sh
npm run test
```

この命令は監視モードでテストを実行し、変更があると自動的に再実行する。

## テストの記述方法
Jest と React-Testing-Library を使用したテストは以下のように記述します。

```js
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MyComponent from './MyComponent';

test('renders learn react link', () => {
  render(<MyComponent />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
```

## 主な API
Jest と React-Testing-Library には以下のような主要な API がある。

- render：コンポーネントをレンダリング
- screen：レンダリングされた要素を取得
- fireEvent / userEvent：ユーザーイベントをシミュレート
- expect：アサーション

## 主なコマンド
Jest と React-Testing-Library には、コンポーネントをテストするための様々なコマンドがあります。以下に主要なものを示す。

詳細は以下の公式を見て欲しい。ここにすべてがある。

https://jestjs.io/ja/docs/api

### 要素の取得
画面上の要素を取得するためのクエリ関数

```js
// テキストで要素を取得
const element = screen.getByText('Hello, World');

// ラベルで要素を取得
const input = screen.getByLabelText('Username');

// プレースホルダーで要素を取得
const searchInput = screen.getByPlaceholderText('Search...');

// テストIDで要素を取得（推奨）
const submitButton = screen.getByTestId('submit-button');
```

### ユーザーアクション
ユーザーの操作をシミュレートするコマンド

```js
import userEvent from '@testing-library/user-event'

// クリックイベント
userEvent.click(screen.getByText('Submit'));

// テキスト入力
userEvent.type(screen.getByLabelText('Email'), 'test@example.com');

// 選択肢の選択
userEvent.selectOptions(screen.getByLabelText('Choose a country'), ['Japan']);
```

### アサーション
要素の状態や存在を確認するためのアサーション

```js
// 要素が文書内に存在することを確認
expect(screen.getByText('Welcome')).toBeInTheDocument();

// 要素が特定のテキストを含むことを確認
expect(screen.getByTestId('message')).toHaveTextContent('Hello');

// 要素が特定のクラスを持つことを確認
expect(screen.getByRole('button')).toHaveClass('primary');

// 要素が無効化されていることを確認
expect(screen.getByText('Submit')).toBeDisabled();
```

### 非同期処理
非同期操作を待つためのコマンド

```js
// 要素が表示されるまで待つ
await screen.findByText('Loading complete');

// 要素が消えるまで待つ
await waitForElementToBeRemoved(() => screen.queryByText('Loading...'));
```
