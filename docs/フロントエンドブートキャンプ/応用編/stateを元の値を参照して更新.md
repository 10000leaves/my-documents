---
tags: [フロントエンド]
sidebar_position: 3
---

`state`を元の値を参照して更新するには、`setState`メソッドを使用して、前の状態を直接参照して更新する方法があります。`setState`メソッドには直前のステートから新しいステートを計算する関数を引数で受け取るインターフェイスがあります。そのため、前の状態を引数として受け取り、新しい状態を返すようにします。

## 結論
これが

```js
const [count, setCount] = useState(0);

const increment = () => setCount(count + 1);
const decrement = () => setCount(count - 1);
```

こう
```js
const [count, setCount] = useState(0);

// prevStateは前の状態を表します
const increment = () => setCount((prevCount) => prevCount + 1);
const decrement = () => setCount((prevCount) => prevCount - 1);
```

## setState の引数は 2 種類ある
`useState` の紹介記事の題材でよくサンプルとして提示されるカウンターの `increment` は「直前のカウントに 1 を足す関数」を意味しているはずです。
ですので、2 つ目の関数インターフェイスに当てはめて `setCount((prev) => prev + 1)` と書くのがベストです。 `decrement` も同様です。

### 次のステートを直接引数で受け取るインターフェイス

```js
setState(newState);
```

### 直前のステートから新しいステートを計算する関数を引数で受け取るインターフェイス

```js
setState((prev) => createNewStateFromPrevState(prev));
```

## 問題となるケース
### 2カウント
例えば、アプリのどこからでも使っていいユーティリティ関数として `useCounter` をモジュール化したとします。

```js title="useCounter.ts"
export const useCounter = (init: number = 0) => {
  const [count, setCount] = useState(init);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return { count, increment, decrement };
};

```

`increment` と `decrement` が引数を受け取らないため、2カウントをするため`useCounter`を2回呼ぶことにしました。

```js title="CounterDouble.tsx"
import { useCounter } from "./useCounter";

export default function App() {
  const { count, increment, decrement } = useCounter(10);

  const incrementDouble = () => {
    increment();
    increment();
  };

  const decrementDouble = () => {
    decrement();
    decrement();
  };

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={incrementDouble}>2 増やす</button>
      <button onClick={decrementDouble}>2 減らす</button>
    </div>
  );
}
```

実際に動作させるとどのようになるのでしょうか？

<details>
<summary>クリックして展開</summary>

差分 2 ずつ変化させるはずが 1 ずつしか変化しません。

`setCount` に同じ値を繰り返し渡しているだけだからです。

</details>

### count はあくまで定数
以下、例です。

```js
export default function App() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div className="App">
      <h1>Count: {count}</h1>
      <button onClick={increment}>増やす</button>
      <button onClick={decrement}>減らす</button>
    </div>
  );
}
```

`count === 20` の場合、コンポーネントの中身を書き下してみると下記のようになっています。

```js
export default function App() {
const [20, setCount] = useState(0);
const increment = () => setCount(20 + 1);
const decrement = () => setCount(20 - 1);

  return (
    <div className="App">
      <h1>Count: {20}</h1>
      <button onClick={increment}>増やす</button>
      <button onClick={decrement}>減らす</button>
    </div>
  );
}
```

`increment` (1 増加) と言いつつ、その実 `setCount` に 21 を渡しているだけなのがわかります。
これを踏まえると、先ほど出てきた `increment` を 2 回繰り返した `incrementDouble` の中身は `count === 20` のとき下記のようになっていることがわかります。

```js
const incrementDouble = () => {
  setCount(20 + 1);
  setCount(20 + 1);
};
```

`incrementDouble` という関数名であるにもかかわらず、`state`を 21 に更新する処理を 2 回繰り返しているだけです。
