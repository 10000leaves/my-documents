---
tags: [フロントエンド]
sidebar_position: 3
---

useContext はコンポーネントでコンテクスト (Context) の読み取りとサブスクライブ（subscribe, 変更の受け取り）を行うための React フックです。

```js
const value = useContext(SomeContext);
```

簡単に訳すと、props を利用することなく異なる階層のコンポーネントとデータの共有を行うことができます。

## Contextとは?
Reactコンポーネントのツリーに対して「グローバル」とみなすデータについて利用するように設計されています。
コンポーネントの再利用をより難しくする為、慎重に利用しなくてはなりません。

`Context`によってコンポーネントツリー間におけるデータの橋渡しについて、すべての階層ごとに渡す必要性がなくなり、`props`バケツリレーをしなくても下の階層で`Context`に収容されているデータにアクセスできるようになりました。

## つまり、useContextとは?
`useContext`とは、`Context`機能をよりシンプルに使えるようになった機能です。
親から`Props`で渡されていないのに、`Context`に収容されているデータへよりシンプルにアクセスできるというものです。

## 4階層のコンポーネント
一番上の親コンポーネントである `App.js` のファイルの中身は下記のようになります。`ComponentA`、`B`、`C` については `components` ディレクトリを作成してその下に作成していきます。

```js title='App.js'
import { createContext } from 'react';
import ComponentA from './components/ComponentA';

export const UserCount = createContext();

function App() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Learn useContext</h1>
      <UserCount.Provider value={100}>
        <ComponentA />
      </UserCount.Provider>
    </div>
  );
}

export default App;
```

```js title='components/ComponentA.js'
import ComponentB from './ComponentB';

const ComponentA = () => {
  return (
    <div>
      <p>Componet A</p>
      <ComponentB />
    </div>
  );
};

export default ComponentA;
```

```js title='components/ComponentB.js'
import ComponentC from './ComponentC';

const ComponentB = () => {
  return (
    <div>
      <p>Componet B</p>
      <ComponentC />
    </div>
  );
};

export default ComponentB;
```

```js title='components/ComponentC.js'
import { useContext } from 'react';
import { UserCount } from '../App';

const ComponentC = () => {
  const count = useContext(UserCount);
  return (
    <div>
      <p>Componet C</p>
      <p>{count}</p>
    </div>
  );
};

export default ComponentC;
```

## Context 用のコンポーネントの作成方法
`App.js` ファイルの中で `createContext` を実行していましたがより汎用的にするために `Context` 用のコンポーネントの作成を行います。

`CountContext.js` ファイルの中にはコンポーネント間で共有したいデータ、関数を記述します。

```js title='context/CountContext.js'
import { createContext, useState, useContext } from 'react';

const CountContext = createContext();

export function useCountContext() {
  return useContext(CountContext);
}

export function CountProvider({ children }) {
  const [count, setCount] = useState(100);

  const value = {
    count,
    setCount,
  };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}
```

`App.js` ファイルでは `CountContext` コンポーネントから `CountProvider` 関数を `import` します。

```js title='App.js'
import React from 'react';
import './App.css';
import ComponentA from './components/ComponentA.js';
import { CountProvider } from './context/CountContext';

function App() {
  return (
    <div className="App">
      <h1>Learn useContext</h1>
      <CountProvider>
        <ComponentA />
      </CountProvider>
    </div>
  );
}

export default App;
```

`ComponentC` コンポーネントでは `CountContext` コンポーネントから `useCountContext` 関数を `import` します。`useContext` は `useCountContext` の中で使われているで `ComponentC` で `import` する必要はありません。

```js title='components/ComponentC.js'
import React from 'react';
import { useCountContext } from '../context/CountContext';

const ComponentC = () => {
  const { count, setCount } = useCountContext();

  return (
    <div>
      <p>Componet C</p>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </div>
  );
};

export default ComponentC;
```

## 関数を追加方法
```js title='context/CountContext.js'
import { createContext, useState, useContext } from 'react';

const CountContext = createContext();

export function useCountContext() {
  return useContext(CountContext);
}

export function CountProvider({ children }) {
  const [count, setCount] = useState(100);

  const countDown = () => {
    setCount(count - 1);
  };

  const value = {
    count,
    setCount,
    countDown,
  };

  return (
    <CountContext.Provider value={value}>{children}</CountContext.Provider>
  );
}
```

## 複数の Context の設定方法
`Context API` の `Context` は 1 つではなく複数設定することも可能です。方法は簡単で2 つの `Provider` コンポーネントでラップするだけです。

`CountProvider` と `AnotherCountProvider` は逆でも構いません。

```js title='App.js'
import './App.css';
import ComponentA from './components/ComponentA';
import { CountProvider } from './context/CountContext';
import { AnotherCountProvider } from './context/AnotherCountContext';

function App() {
  return (
    <div className="App">
      <h1>Learn useContext</h1>
      <CountProvider>
        <AnotherCountProvider>
          <ComponentA />
        </AnotherCountProvider>
      </CountProvider>
    </div>
  );
}

export default App;
```