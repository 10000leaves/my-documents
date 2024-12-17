---
tags: [フロントエンド]
sidebar_position: 24
---

## Recoil死す
https://github.com/facebookexperimental/Recoil/issues/1495  
Recoilのメインの開発者がMetaでレイオフされてたっぽいですね😿  

https://github.com/facebookexperimental/Recoil/issues/2318  

このissueでは、Jotaiがいいんじゃねと言われています  
個人的に、Reduxはちょっと面倒くさいので同意見です

## Recoilの代替え
状態管理ライブラリには大きく分けて「Storeベース」と「Atomベース」があります。
RecoilはAtomベースです。

Storeベースは、アプリケーション全体の状態を一元的に管理するための中央ストアを持つのに対し、Atomベースは、複数の小さな状態単位（Atom）を持ち、それぞれのAtomが独立して管理されます。

以下のサイトに詳しく記載されています。  
https://www.ecomottblog.com/?p=12768

## RecoilからJotaiへの移行方法
ここからが本題

### Jotaiのインストール
```bash 
npm install jotai
# or
yarn add jotai
```

### atomの書き換え
`import`をRecoilの`atom`からJotaiの`atom`にする。 

Jotai におけるグローバルステートは Atom で管理するので、`○○State` ではなく `○○Atom` とするのが流儀っぽい。面倒くさいので時間があるときに行う。

Atom が定義以外は、基本的に置換で行けそう。

```ts 
// Recoil
import { atom } from 'recoil';
const countState = atom({
  key: 'countState',
  default: 0
});

// Jotai
import { atom } from 'jotai';
const countState = atom(0);
```

### selectorを派生atomに書き換え
置換は無理そう。

```ts
// Recoil
const doubleCountState = selector({
  key: 'doubleCountState',
  get: ({get}) => {
    return get(countState) * 2;
  }
});

// Jotai
const doubleCountState = atom((get) => get(countState) * 2);
```

### コンポーネントの書き換え
基本的に置換で行けそう。

- 値と更新関数の取得  
  `useRecoilState`⇒`useAtom`  
- 値のみ取得  
  `useRecoilValue`⇒`useAtomValue`  
- 更新関数のみ取得  
  `useSetRecoilState`⇒`useSetAtom`  

更新関数の利用方法はRecoilと同じ。

```ts
// Recoil
import { useRecoilState, useRecoilValue } from 'recoil';

function Component() {
  const [count, setCount] = useRecoilState(countState);
  const doubleCount = useRecoilValue(doubleCountState);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}

// Jotai
import { useAtom, useAtomValue } from 'jotai';

function Component() {
  const [count, setCount] = useAtom(countState);
  const doubleCount = useAtomValue(doubleCountState);
  
  return (
    <div>
      <p>Count: {count}</p>
      <p>Double: {doubleCount}</p>
      <button onClick={() => setCount(c => c + 1)}>Increment</button>
    </div>
  );
}
```

### Providerの書き換え
Jotai はデフォルトでプロバイダーレスモードになっており `Provider` なしで動くみたい。  
`Provider` を利用する事も可能で、Jotai の `Provider` は `Context` と同様に並列に並べたり入れ子にする事が可能で `Provider` 毎に値を保持できるそう。

```ts
import { Provider } from 'jotai'

function App() {
  return (
    <>
      <Provider>
        <Counter /> // countAtom を利用したコンポーネント
        <Provider>
          <Counter /> // 上の Counter とは別管理のステートとなる
        </Provider>
      </Provider>
    </>
  )
}
```

`Provider`を設定する場合は以下。

```ts
// Recoil
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      <Component />
    </RecoilRoot>
  );
}

// Jotai
import { Provider } from 'jotai';

function App() {
  return (
    <Provider>
      <Component />
    </Provider>
  );
}
```