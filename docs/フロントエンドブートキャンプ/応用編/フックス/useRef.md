---
tags: [フロントエンド]
sidebar_position: 7
---

useRef は、新しいレンダーをトリガしないようにしたい時に使用します。
また、`useState`のようにコンポーネント内での値を保持することが出来ます。

## 基本
```js
const refObject = useRef(initialValue)

//例
const number = useRef(100);
console.log(number.current); // 100
```

`cuseRef`は、`.current`プロパティが渡された引数（初期値は`initialValue`）を`refObject`へ返します。
この引数の値が書き換え可能な`.current`プロパティーの値であり、`.current`プロパティ内に保持することができます。

## useRefとuseState
`useRef`を利用すると`text`の`state`更新時にのみコンポーネントの再レンダリングが発生します。

```js
const App = () => {
  const inputEl = useRef(null);
  const [text, setText] = useState("");
  const handleClick = () => {
    setText(inputEl.current.value);
  };
  console.log("レンダリング！！");
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={handleClick}>set text</button>
      <p>テキスト : {text}</p>
    </>
  );
};
```
