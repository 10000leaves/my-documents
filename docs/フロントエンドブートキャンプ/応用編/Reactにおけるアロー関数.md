---
tags: [フロントエンド]
sidebar_position: 5
---

## 結論

- アロー関数はReactでのイベントハンドラとしてよく使われる。
- アロー関数を使うときは、イベントハンドラに渡す関数が正しく実行されるように注意する必要がある。
- 無名関数内で関数を呼び出すか、直接関数を渡すことで正しく動作させることができる。

これか
```js
return <button className="square" onClick={() => handleClick()}>{value}</button>;
```

これ
```js
// アロー関数
const add = (a, b) => {
  return a + b;
};

// さらに簡潔に
const add = (a, b) => a + b;
```

## アロー関数の基本
アロー関数は、`function`の代わりに矢印（`=>`）を使用して関数を定義する方法です。アロー関数の一般的な形式は次の通りです。

```js
// 通常の関数
function add(a, b) {
  return a + b;
}

// アロー関数
const add = (a, b) => {
  return a + b;
};

// さらに簡潔に
const add = (a, b) => a + b;
```

## React.jsにおけるアロー関数
Reactコンポーネントでは、イベントハンドラとしてアロー関数を使用することがよくあります。例えば、ボタンのクリックイベントを処理する関数を定義する場合です。

### よくある間違い
以下のコードでは、handleClick関数をアロー関数でラップして渡していますが、この方法では期待通りに動作しません。

```js
function Square({ value }) {
  function handleClick() {
    alert("clicked!");
  }
  return <button className="square" onClick={() => handleClick}>{value}</button>;
}
```

このコードは、`handleClick`関数を呼び出す無名関数を`onClick`に渡していますが、この無名関数は`handleClick`関数を返すだけで、実際には`handleClick`関数を実行しません。そのため、ボタンをクリックしても何も起こりません。

### 修正方法
この問題を解決するには、無名関数内で`handleClick`関数を呼び出すようにする必要があります。

```js
function Square({ value }) {
  function handleClick() {
    alert("clicked!");
  }
  return <button className="square" onClick={() => handleClick()}>{value}</button>;
}
```

この修正により、ボタンがクリックされたときに無名関数が実行され、その中で`handleClick`関数が呼び出されてアラートが表示されます。

### 直接関数を渡す方法
また、無名関数を使わずに直接`handleClick`関数を渡すこともできます。

```js
function Square({ value }) {
  function handleClick() {
    alert("clicked!");
  }
  return <button className="square" onClick={handleClick}>{value}</button>;
}
```

この形でも、`onClick`イベントが発生したときに直接`handleClick`関数が呼び出され、アラートが表示されます。
