---
tags: [フロントエンド]
sidebar_position: 1
---

```js
const [state, setState] = useState(initialState);
```

ステートフルな値と、それを更新するための関数を返します。

初回のレンダー時に返される state は第 1 引数として渡された値 (`initialState`) と等しくなります。

setIndex 関数は state を更新するために使用します。新しい state の値を受け取り、コンポーネントの再レンダーをスケジューリングします。

```js
const newState= 1;
setState(newState);
```

後続の再レンダー時には、useState から返される 1 番目の値は常に、更新を適用した後の最新版の state になります。

## useStateとは
useState()は、関数コンポーネントでstateを管理（stateの保持と更新）するためのReactフックであり、最も利用されるフックです。

stateとはコンポーネントが内部で保持する「状態」のことで、画面上に表示されるデータ等、アプリケーションが保持している状態を指しています。stateはpropsと違い後から変更することができます。

## 関数型の更新

新しい state が前の state に基づいて計算される場合は、setState に関数を渡すことができます。この関数は前回の state の値を受け取り、更新された値を返します。以下は、setState の両方の形式を用いたカウンタコンポーネントの例です。

```js
function Counter({initialCount}) {
  const [count, setCount] = useState(initialCount);
  return (
    <>
      Count: {count}
      <button onClick={() => setCount(initialCount)}>Reset</button>
      <button onClick={() => setCount(prevCount => prevCount - 1)}>-</button>
      <button onClick={() => setCount(prevCount => prevCount + 1)}>+</button>
    </>
  );
}
```

## スプレッド構文
スプレッド構文とはJavaScriptの機能です。
`...変数`がスプレッド構文にあたり、配列やオブジェクトを展開し、値渡しをする際に使います。

```js
// Array
const odd = [1, 3]
const even = [2, 4]
const numbers = [...odd, ...even]
console.log(numbers) // [1, 3, 2, 4]

// Object
const name = {first: "Tanaka", last: "Taro"}
const age = {age: 27}
const profile = {...name, ...age}
console.log(profile) // {first: "Tanaka", last: "Taro", age: 27}
```

React では以下のように使用すると、インプットで送られた `updatedValues` と state で管理している既存の `prevState` がマージされます。

```js
const [state, setState] = useState({});
setState(prevState => {
  // Object.assign would also work
  return {...prevState, ...updatedValues};
});
```

別の選択肢としては `useReducer` があります。
