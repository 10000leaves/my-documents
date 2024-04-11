---
tags: [フロントエンド]
sidebar_position: 11
---

## 前提
Node.js がインストールされていること

## セットアップ
```
# フォルダ作成と移動
# ※ github等などプロジェクト作成した場合は不要
$ mkdir HelloWorld
$ cd HelloWorld
```

```
# package.json の作成
$ npm init -y
# react と react-dom をインストール
$ npm install react react-dom
# vite とそのプラグインをインストール
$ npm install --save-dev vite @vitejs/plugin-react
```

## package.json を編集
以下を削除

```
    "test": "echo \"Error: no test specified\" && exit 1"
```

scriptsに以下を追加

```
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
```

## Hello, World!
以下を作成

- vite.config.js
- index.html
- src/App.jsx
- src/main.jsx
- .gitignore

```js title="vite.config.js"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
});
```

```html title="index.html"
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>React Tutorial</title>
  </head>
  <body>
    <div id="content"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

```js title="src/App.jsx"
function App() {
  return (
    <div>
      <h1>Hello, World!</h1>
    </div>
  );
}

export default App;
```

```js title="src/main.jsx"
import { createRoot } from "react-dom/client";
import App from "./App";

createRoot(document.querySelector("#content")).render(<App />);
```

```js title=".gitignore"
node_modules
dist
```

### ポートの設定
本チュートリアルで、Cloud9を利用する場合は`vite.config.js`にポートの設定を追記してください。  
[Cloud9では使用できるポートが`8080`、`8081`、`8082`に限定されている](https://docs.aws.amazon.com/ja_jp/cloud9/latest/user-guide/app-preview.html)ため、`Vite`にポートを指定する設定を行う必要があります。  

[Vite の設定 | Vite](https://ja.vitejs.dev/config/#server-port)

```js title="vite.config.js"
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // highlight-start
  server: {
    port: 8080
  },
  // highlight-end
  plugins: [react()],
});
```

## ローカル開発サーバーを起動

```
$ npm run dev
```

### ローカルの場合
http://localhost:5173/ にアクセスし確認

### Cloud9の場合
Preview (プレビュー)、Preview Running Application (実行中のアプリケーションのプレビュー)を順に選択し、確認
