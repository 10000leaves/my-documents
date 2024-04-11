---
tags: [フロントエンド]
sidebar_position: 5
---

`useCallback`はパフォーマンス向上のためのフックで、メモ化したコールバック関数を返します。

`useEffect`と同じように、依存配列(=[`deps`] コールバック関数が依存している要素が格納された配列)の要素のいずれかが変化した場合のみ、メモ化した値を再計算します。

```js
const cachedFn = useCallback(fn, dependencies);
```

## メモ化とは
メモ化とは同じ結果を返す処理について、初回のみ処理を実行記録しておき、値が必要となった2回目以降は、前回の処理結果を計算することなく呼び出し値を得られるようにすることです。

イベントハンドラーのような`callback`関数をメモ化し、不要に生成される関数インスタンスの作成を抑制、再描画を減らすことにより、都度計算しなくて良くなることからパフォーマンスを向上が期待できます。

## 基本
`sampleFunc`は、再レンダーされる度に新しく作られますが、`a`,`b`が変わらない限り、作り直す必要はありません。

```js
const sampleFunc = () => {doSomething(a, b)}
```

`usecallback`を使えば、依存配列の要素`a`,`b`のいずれかが変化した場合のみ、以前作ってメモ化した`sampleFunc`の値を再計算します。一方で全て前回と同じであれば、前回の`sampleFunc`を再利用します。

```js
const sampleFunc = useCallback(
  () => {doSomething(a, b)}, [a, b]
);
```

## メモ化されたコールバックからの state 更新 
場合によっては、メモ化されたコールバックから前回の `state` に基づいて `state` を更新する必要があります。

この `handleAddTodo` 関数は、次の todo リストを計算するために `todos` を依存値として指定します。

```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos([...todos, newTodo]);
  }, [todos]);
  // ...
```

通常、メモ化された関数からは可能な限り依存値を少なくしたいと思うでしょう。何らかの `state` を次の state を計算するためだけに読み込んでいる場合、代わりに更新用関数 (`updater function`) を渡すことでその依存値を削除できます。

```js
function TodoList() {
  const [todos, setTodos] = useState([]);

  const handleAddTodo = useCallback((text) => {
    const newTodo = { id: nextId++, text };
    setTodos(todos => [...todos, newTodo]);
  }, []); // ✅ No need for the todos dependency
  // ...
```

ここでは、todos を依存値として内部で読み込む代わりに、どのように `state` を更新するかについての指示（`todos => [...todos, newTodo]`）を React に渡します。

## エフェクトが頻繁に発火するのを防ぐ
エフェクトから呼び出す必要がある関数を `useCallback` でラップする

```js
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  const createOptions = useCallback(() => {
    return {
      serverUrl: 'https://localhost:1234',
      roomId: roomId
    };
  }, [roomId]); // ✅ Only changes when roomId changes

  useEffect(() => {
    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [createOptions]); // ✅ Only changes when createOptions changes
  // ...
```

関数型の依存値を必要としないようにする場合

```js
function ChatRoom({ roomId }) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    function createOptions() { // ✅ No need for useCallback or function dependencies!
      return {
        serverUrl: 'https://localhost:1234',
        roomId: roomId
      };
    }

    const options = createOptions();
    const connection = createConnection();
    connection.connect();
    return () => connection.disconnect();
  }, [roomId]); // ✅ Only changes when roomId changes
  // ...
```

## カスタムフックの最適化
```js
function useRouter() {
  const { dispatch } = useContext(RouterStateContext);

  const navigate = useCallback((url) => {
    dispatch({ type: 'navigate', url });
  }, [dispatch]);

  const goBack = useCallback(() => {
    dispatch({ type: 'back' });
  }, [dispatch]);

  return {
    navigate,
    goBack,
  };
}
```
