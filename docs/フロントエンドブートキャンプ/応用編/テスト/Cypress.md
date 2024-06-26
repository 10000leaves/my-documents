---
tags: [フロントエンド]
sidebar_position: 3
---

Cypressはメジャーアップデートが多く、記載している内容が参考にならない可能性が大きいため、詳しいことは公式を見て欲しい。

本当に。

## Cypress とは
https://www.cypress.io/

Cypress はフロントエンドの自動テストツールであり、以下のすべてのを作成・テストできる。  
これをCIに組み込むことにより、開発者の手間を減らすことができる。  

- エンドツーエンド(E2E)テスト
- 統合(インテグレーション)テスト
- ユニットテスト

特徴は以下。

- タイムトラベル：テスト実行時にスナップショットを取得し、詳細を確認することができる。
- デバッグ可能：開発ツールから直接デバッグすることができる。
- 自動待機：要素が見つからない場合に自動で再試行する機能がある。

## インストール方法
### インストール
[公式Docs](https://docs.cypress.io/guides/getting-started/installing-cypress)に従ってインストール。

```sh
npm install cypress
```

これにより、プロジェクトの依存関係に Cypress がインストールされる。

### テストの実行方法
Cypress はテストを`GUI`か`console`で、選んで行うことができる。

コマンドの詳細は以下  
https://docs.cypress.io/guides/guides/command-line

### GUI
`npx`で実行する場合は以下
```sh
# cypress open
npx cypress open
```

`npm`で実行する場合は以下

`npm Scripts`を追記
```json title="package.json"
{
  "scripts": {
    "cy:open": "cypress open"
  }
}
```

```sh
npm run cy:open
```

### console
`npx`で実行する場合は以下
```
# cypress run
npx cypress run
```

`npm`で実行する場合は以下

`npm Scripts`を追記
```json title="package.json"
{
  "scripts": {
    "cy:run": "cypress run"
  }
}
```

```sh
npm run cy:run
```

## 主なコマンド
CypressにはWeb サイトを操作するためのコマンドが複数ある。

Cypress コマンドは次のいずれかに分類できる。

- query アプリケーションの状態を読み取るコマンド
- assertion 特定の状態でアサートするコマンド
- action ユーザーと同じようにアプリケーションを操作します
- other テストの作成に役立つその他のコマンド

詳細は以下の公式を見て欲しい。ここにすべてがある。

https://docs.cypress.io/api/table-of-contents

### サイトへのアクセス
テストのためのサイトにアクセスするには、`visit`を使用する。

リンクの部分にファイルの相対パスを入れることでアクセスすることが可能になる。

```js
cy.visit('http://localhost:3000') //サーバーでの開発の例

cy.visit('url') //検索の例

cy.visit('~.html') //ファイルの相対パス
```

### 要素の取得
タグ名や属性なら`get`、文字列で取得したい場合は、`contains`を使用する。

`get`は取得方法が複数あり、id、タグ、クラスで異なる。

```js
cy.get('タグ名')
cy.get('#id')
cy.get('.classname')

cy.contains('文字列')
```

`contains`は要素の存在を確かめるには有効だが、クリックなどのアクションを起こすために取得することは非推奨。

可能であれば、テスト用に`data-cy`などの属性を付与することが望ましい。

```js
cy.get('input[type=email]')

cy.get('[data-cy="test"]')
```

### サイト上での操作
クリックやリロード、入力など、Webサイトを使用する際のアクションのコマンド。

:::caution

Cypressはページの読み込みなどの更新が終わるより先に次の命令を実行してしまい、エラーになることがある。

その場合、`cy.wait()`を用いて更新が終わるまでテストを一旦中断させ、その操作が終わるのを待ってから、次の動作に行くことでエラーが解消することがたたある。

`cy.wait()` の引数に`ms`を入力すると、その秒数だけスリープさせることができる。

:::

```js
cy.reload() // リロード

cy.click() // クリック動作

cy.type() // 文字入力

cy.wait(500) // 500msスリープ
```

また、`type`と`click`に関しては、先ほどの要素の取得と組み合わせて、以下のようにすることも可能。

```js
cy.get('input[type=email]').type('sample@email.com')

cy.get('button[type=submit]').click()
```

### 要素のチェック方法について
取得した要素や、クリックして飛んだ先のページが正しいか確認する場合、 `should()` を使用する。

```js
.should('テスト内容')

.should('テスト内容',比較値)
```

### 要素の数え方やオプションについて
取得した要素の個数の取得したり何番目の要素に動作を加えたい場合は以下。

```js
// getでtableタグを取得して、その中にあるtrタグを数え上げて、その長さをlengthで取得して、その値が３に等しいか判定する
cy.get('table').find('tr').its('length').should('eq',3)

// 複数あるbuttonタグのうち一番最初の要素をfirst() で指定してクリック
cy.get('button').first().click()

// 一番最後のbuttonをクリック
cy.get('button').last().click()

// 強攻策
// eq()は0をから数える、eq(0)＝1つ目
// 3つ目の要素をのbuttonをクリック
cy.get('table').eq(2).click()
```
