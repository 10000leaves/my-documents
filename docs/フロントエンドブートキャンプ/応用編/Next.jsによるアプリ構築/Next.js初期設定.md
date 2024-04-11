---
tags: [フロントエンド]
sidebar_position: 1
---

今後、新規でアプリを開発する際に用いる技術選定を行った。  
Next.jsによるアプリ構築を実施したため、その手順を記載する。  

## Create a project

```
# npx
npx create-next-app@latest
# yarn
yarn create next-app
```

`create-next-app` で`Next.js`を作成する際の設定

```
RoleForSwitchRole-SharedDevelopmentEnvironment:~/environment $ npx create-next-app@latest         
✔ What is your project named? … my-app ← frontend？バックと合わせる
✔ Would you like to use TypeScript? … No / Yes ← Yes
✔ Would you like to use ESLint? … No / Yes ← Yes
✔ Would you like to use Tailwind CSS? … No / Yes ← No
✔ Would you like to use `src/` directory? … No / Yes ← Yes
✔ Would you like to use App Router? (recommended) … No / Yes ← Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes ← Yes
✔ What import alias would you like configured? … @/* ← そのままEnter
```

### What is your project named?
プロジェクト名は何にしますか？

## Would you like to use TypeScript?
このプロジェクトで`TypeScript`を使いますか？

基本はYes

### Would you like to use ESLint?
このプロジェクトで`ESLint`を使いますか？

基本はYes

### Would you like to use Tailwind CSS with this project?
このプロジェクトで`Tailwind CSS`を使いますか？

`Tailwind CSS`を使うか使わないかによる

### Would you like to use src/ directory with this project?
このプロジェクトで`src/`ディレクトリを使いますか？

基本はYes

### Would you like to use App Router?
App Routerを使いますか？

基本はYes

#### ルーティングについて
従来の`Pages Router`は、`pages`ディレクトリ配下のファイル全てがルーティング対象でした。しかし、`App Router`では`app`ディレクトリ配下の`page.tsx`のみがルーティング対象となる。

- Pages Router
  - `src/pages`配下がルーティング対象
  - 例：`/pages/test/hoge.tsx`が「`https://ドメイン/test/hoge`」に該当
- App Router
  - `src/app`配下のpage.tsxのみがルーティング対象
  - 例：`/app/test/hoge/page.tsx`が「`https://ドメイン/test/hoge`」に該当

詳しくは以下参照

https://rakuraku-engineer.com/posts/nextjs-app/

### Would you like to customize the default import alias (@/*)?
デフォルトのインポートエイリアスをカスタマイズしますか？

基本はYes

#### インポートエイリアスとは
JavaScript/TypeScriptのモジュール（＝ファイル）から、他のモジュールを読み込むことをインポートという。

```js
// 他のモジュール SamplePageMain.jsx を読み込む
// インポートエイリアスなし
import { SamplePageMain } from "../../../commponents/mains/SamplePageMain"

// インポートエイリアスあり
import { SamplePageMain } from "@/commponents/mains/SamplePageMain"
```

### What import alias would you like configured?
設定したいインポートエイリアスは何ですか？

インポートエイリアスを変える必要はないため、そのままEnter

## TypeScript（tsconfig.json）の設定
```
 {
   "compilerOptions": {
     "lib": ["dom", "dom.iterable", "esnext"],
-    "allowJs": true,
+    "allowJs": false,
     "skipLibCheck": true,
     "strict": true,
     "noEmit": true,
     "esModuleInterop": true,
     "module": "esnext",
     "moduleResolution": "bundler",
     "resolveJsonModule": true,
     "isolatedModules": true,
     "jsx": "preserve",
     "incremental": true,
+    "forceConsistentCasingInFileNames": true,
+    "noImplicitReturns": true,
+    "noUncheckedIndexedAccess": true,
     "plugins": [
       {
         "name": "next"
       }
     ],
     "paths": {
       "@/*": ["./*"]
     }
   },
   "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
   "exclude": ["node_modules"]
 }
```

### "allowJs": false
型の恩恵に預かりたいので`JS`は使用しない方針でいきます。  
`false`にすることで`.js` `.jsx`をコンパイル対象外とすることができます。  

### "forceConsistentCasingInFileNames": true
ファイル名の大文字小文字を区別する。

https://www.typescriptlang.org/tsconfig#forceConsistentCasingInFileNames

### "noImplicitReturns": true
戻り値が`void`以外の関数において、すべての条件分岐で戻り値を返すよう強制します。

https://typescriptbook.jp/reference/tsconfig/noimplicitreturns

### "noUncheckedIndexedAccess": true
インデックス型のプロパティや配列要素を参照したとき`undefined`のチェックを必須にします。

https://typescriptbook.jp/reference/tsconfig/nouncheckedindexedaccess
