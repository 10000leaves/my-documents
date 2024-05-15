---
tags: [フロントエンド]
sidebar_position: 6
---

## React Routerとは
Reactで作成したSPAに、UIとURLを紐づけるためのものです。

例えば

- `http://localhost:3000/home` にアクセス -> `Home`コンポーネントを返す
- `http://localhost:3000/aaa` にアクセス -> `aaa`コンポーネントを返す

といった事ができます。

基礎的なことはまとめていますが、詳細は公式を見てください

https://reactrouter.com/

## 前提
React演習（HelloWorld）が完了していること

## react-router-domのインストール

```sh
npm install react-router-dom
```

## BrowserRouterの設定
`main.jsx`ファイルを以下のように編集します。

```js title="src/main.jsx"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // BrowserRouterを追加
import AppRoutes  from "./AppRoutes "; // AppをAppRoutesに修正

createRoot(document.querySelector("#content")).render(
  <BrowserRouter> {/* BrowserRouterでAppRoutesをラップ */}
    <AppRoutes  />
  </BrowserRouter>
);
```

これにより、`AppRoutes`コンポーネントは`BrowserRouter`でラップされ、React Routerが使用できるようになります。

## ルーティングの設定
react-router-domの`Routes`と`Route`を使用するのでインポートして、その下に、画面遷移させたいコンポーネントをインポートします。

その後、以下のように`<Routes/>`にコンポーネントを追加します。

```js title="src/AppRoutes.jsx"
import { Routes, Route } from "react-router-dom";
import App from "./App"
import Hoge from "./Hoge" // Appをコピーして、なんでもいいのでコンポーネントを作成してください
import Fuga from "./Fuga" // 同上

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/hoge" element={<Hoge />} />
      <Route path="/fuga" element={<Fuga />} />
    </Routes>
  )
};
```

## NotFoundの設定
指定していないルートには、Notfound用に作成したコンポーネントを出しておきたいです。

```js title="src/AppRoutes.jsx"
import { Routes, Route } from "react-router-dom";
import App from "./App"
import Hoge from "./Hoge"
import Fuga from "./Fuga"
import Notfound from "./Notfound" // 追加

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/hoge" element={<Hoge />} />
      <Route path="/fuga" element={<Fuga />} />
      <Route path="*" element={ <Notfound /> } /> {/* 追加 */}
    </Routes>
  )
};
```

これにより、存在しないパスでアクセスすれば、Notfoundコンポーネントが表示されます。

## 遷移の設定
遷移の設定は必ず`BrowserRouter`でラップされてる箇所でしてください。

### Link（リンク）で遷移
`<Link/>` コンポーネントを使用し、任意の画面のリンクを設定します。

```js title="src/Footer.jsx"
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <ul>
      <li>
        <Link to="/">App</Link> {/* aタグじゃないよ */}
      </li>
      <li>
        <Link to="/hoge">Hoge</Link>
      </li>
      <li>
        <Link to="/fuga">Fuga</Link>
      </li>
    </ul>
  )
};

```

`main.jsx`の下に`<Footer/>`を追加。

```js title="src/main.jsx"
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AppRoutes  from "./AppRoutes ";
import Footer  from "./Footer "; // 追加


createRoot(document.querySelector("#content")).render(
  <BrowserRouter>
    <AppRoutes  />
    <Footer/> {/* 追加 */}
  </BrowserRouter>
);
```

### useNavigate（ボタン）で遷移
navigateの引数に`AppRoutes.jsx`で設定したルーティングを指定することで、任意の画面に遷移できます。

```js title="src/App.jsx"
import { useNavigate } from "react-router-dom"; // 追加

function App() {
  const navigate = useNavigate()

  // buttonをクリックした時の処理にnavigateで遷移先を設定
  const handleHoge = () => {
    navigate('/hoge')
  };

  const handleFuga = () => {
    navigate('/fuga')
  };

  return (
    <div>
      <h1>Hello, World!</h1>
      <br />
      <button onClick={handleHoge}>Hoge画面へ</button>
      <br />
      <button onClick={handleFuga}>Fuga画面へ</button>
    </div>
  );
}

export default App;
```

## 子コンポーネントにpropsを渡す

記載中

## 遷移先に値を渡す

記載中
