---
tags: [フロントエンド]
sidebar_position: 20
---

`fetch`と`axios`はどちらも外部リソースを取得するためのライブラリーで、HTTPリクエストを処理することができます。また、`Promise`を返すため非同期処理を行うことができます。

## Promiseとは
PromiseとはJavaScriptにおいて、非同期処理の操作が完了したときに結果を返すものです。 非同期処理とは、ある処理が実行されてから終わるまで待たずに、次に控えている別の処理を行うことです。

なぜこのような仕組みがあるのでしょうか？

JavaScriptはシングルスレッドでしか動かない性質があるため、複数の処理を並列で走らせることができません。 そのため効率的に処理をするために考えられた仕組みが非同期処理と呼ばれるものです。

:::important
非同期処理とは

非同期処理とは「ある処理が実行されてから終わるまで待たずに、次に控えている別の処理を行うこと」です。

:::

:::important
コールバックとは

コールバックとは、ある関数へ別の関数を渡すことです。

以下のようなイメージの場合、関数Bがコールバック関数になります。

```js
関数A(関数B、引数) {
    //実行内容
}
```

コールバックは使い勝手がいい反面、使いすぎるとコードが非常に読みにくくなる欠点があります。また関数から関数を呼ぶ処理を繰り返しすぎると、あとで問題が発生したときに調べることが手間になりがちです。これをコールバック関数地獄と言います。

```js
sampleFunction1(function(data1) {
    sampleFunction2(function(data2) {
        sampleFunction3(function(data3) {
            sampleFunction4(function(data4) {
                //処理
            });
        });
    });
});
```

JavaScriptにおける非同期処理のコールバック関数地獄はネストが深くなる上に、エラー処理が相まって、可読性を著しく下げる傾向があります。このコールバック地獄を避けるために考えられたの仕組みが、Promiseです。

:::

## async/awaitとは
### asyncについて
関数に`async`をつけることで非同期関数となります。

async関数でreturnをした場合fulfilledなPromiseオブジェクトが返されます。
一方、async関数で例外がthrowされた場合はrejectedなPromiseオブジェクトが返されます。

```js title="成功"
const asyncFulfilled = async() => {
  return 'fulfilled'
}

asyncFulfilled()
  .then(result => console.log(`Resut: ${result}`)) // 成功時の処理
  .catch(message => console.log(`NG! ${message}`)) // 失敗時の処理
// Resut: fulfilled
```

```js title="失敗"
const asyncRejected = async() => {
  throw new Error('rejected')
}

asyncRejected()
  .then(result => console.log(`Resut: ${result}`)) // 成功時の処理
  .catch(message => console.log(`NG! ${message}`)) // 失敗時の処理
// NG! Error: rejected
```

### awaitについて
awaitはasync関数内に定義されているPromiseの結果（成功 or 失敗）を待つ演算子です。

つまり、awaitはasync関数の中でのみ利用が可能です。

```js
const asyncExample = (number) => {
  console.log(await Promise.resolve(number))
}
asyncExample(2)
// console.log(await Promise.resolve(number))
// ^^^^^
//
// SyntaxError: missing ) after argument list
```

async関数の中であればawaitが使えます。

```js
const asyncExample = async(number) => {
  console.log(await Promise.resolve(number))
}

asyncExample(2)
// 2
```

## fetch APIとは
fetch APIは、ブラウザに標準で実装されたWeb APIであり、HTTPリクエストを簡単に処理することができます。

fetch APIは、リクエストやレスポンスの処理がやや複雑です。
しかし、Promiseを返すため非同期処理が簡単に行えるため、JavaScriptのプロミスを使った非同期処理が得意な開発者にとっては非常に使いやすいAPIです。

## axiosとは
axiosは、HTTPクライアントライブラリであり、HTTPリクエストを簡単に処理することができます。

axiosは、シンプルなAPIを提供するため、開発者がHTTPリクエストをより簡単に処理できるようになっています。また、Promiseを返すため非同期処理が簡単に行えます。

## fetch APIとaxiosの違い
fetch APIとaxiosの違いは、以下の通りです。

- fetch APIはブラウザに標準で実装されたWeb APIであり、axiosはHTTPクライアントライブラリです。
- fetch APIを使用する場合、ブラウザによって実装が異なることがあります。一方、axiosはブラウザによって実装が異なることがなく、開発者がHTTPリクエストをより簡単に処理できるようになっています。
- fetch APIを使用する場合、ステータスコードの処理やエラー処理を手動で実装する必要があります。一方、axiosはシンプルなAPIを提供するため、ステータスコードの処理やエラー処理を簡単に行うことができます。
- fetch APIを使用する場合、リクエストとレスポンスの処理がやや複雑になることがあります。一方、axiosは、HTTPリクエストの処理が簡単になります。

## fetch APIとaxiosの使い分け
fetch APIとaxiosのどちらを使用するかは、状況によって異なります。fetch APIは標準のWeb APIであり、Promiseを返すため非同期処理が簡単に行えます。  
一方、axiosは、シンプルなAPIを提供するため、HTTPリクエストの処理が簡単に行えますが、fetch APIよりもメモリ使用量が多く、大量のリクエストを行う場合にはパフォーマンスの問題が生じる可能性があります。  

開発者は、目的や状況に応じて、fetch APIかaxiosのどちらを使用するかを判断する必要があります。

## インストール方法
### fetch API
fetchはブラウザの標準ライブラリーであるため、インストールする必要はありません。

### axios
以下のコマンドで、インストールする必要があります。

```sh
# npmでインストール
$ npm install axios

# yarnでインストール
$ yarn add axios
```

利用する場合は、モジュールのインポートを行う必要もあります。

```js
import axios from "axios"
```

## 戻り値について
成功時（fulfilled）の戻り値は`then()`あるいは`await`で取得します。

### fetchの戻り値のサンプルコード
```js title="thenを利用する場合"
const logTodoResponse = () => {
  fetch("http://localhost:4000/todos/1", {
    method: "GET",
  }).then((response) => console.log(response));
};

// 実行結果
logTodoResponse();
// Response {
//   size: 0,
//   [Symbol(Body internals)]: {
//  ...
```

```js title="async/awaitを利用する場合"
const logTodoResponse = async () => {
  const response = await fetch("http://localhost:4000/todos/1", {
    method: "GET",
  });
  console.log(response);
};

// 実行結果
logTodoResponse();
// Response {
//   size: 0,
//   [Symbol(Body internals)]: {
//  ...
```

### axiosの戻り値のサンプルコード
```js title="thenを利用する場合"
const logTodoResponse = () => {
  axios
    .get(`http://localhost:4000/todos/1`)
    .then((response) => console.log(response));
};

// 実行結果
logTodoResponse();
// {
//   status: 200,
//   statusText: 'OK',
//   headers: {
//   ...
// ...
```

```js title="async/awaitを利用する場合"
const logTodoResponse = async () => {
  const response = await axios.get(`http://localhost:4000/todos/1`);
  console.log(response);
};

// 実行結果
logTodoResponse();
// {
//   status: 200,
//   statusText: 'OK',
//   headers: {
//   ...
// ...
```
## データ取得について
戻り値をresponseとした場合、fetchのリクエストレスポンスは`response.json()`で参照できます。axiosの場合は`response.data`で参照できます。

### fetchを利用したデータ取得のサンプルコード
```js title="thenを利用する場合"
const getTodo = () => {
  const todo = fetch("http://localhost:4000/todos/1", {
    method: "GET",
  }).then((response) => response.json());
  return todo; // { id: 1, content: 'go somewhere', completed: true }
};

// 実行結果
// 戻り値はPromiseなので、then()を利用してデータを参照する
getTodo().then((todo) => console.log(todo));
// { id: 1, content: 'go somewhere', completed: true }
```

```js title="async/awaitを利用する場合"
const getTodo = async () => {
  const response = await fetch("http://localhost:4000/todos/1", {
    method: "GET",
  });
  return response.json(); // { id: 1, content: 'go somewhere', completed: true }
};

// 実行結果
// async関数はPromiseを返すので、then()を利用してデータを参照する
getTodo().then((todo) => console.log(todo));
// { id: 1, content: 'go somewhere', completed: true }
```

### axiosを利用したデータ取得のサンプルコード
```js title="thenを利用する場合"
const getTodo = () => {
  const todo = axios
    .get(`http://localhost:4000/todos/1`)
    .then((response) => response.data);
  return todo; // { id: 1, content: 'go somewhere', completed: true }
};

// 実行結果
getTodo().then((todo) => console.log(todo));
// { id: 1, content: 'go somewhere', completed: true }
```

```js title="async/awaitを利用する場合"
const getTodo = async () => {
  const response = await axios.get(`http://localhost:4000/todos/1`);
  return response.data; // { id: 1, content: 'go somewhere', completed: true }
};

// 実行結果
getTodo().then((todo) => console.log(todo));
// { id: 1, content: 'go somewhere', completed: true }
```

## 参考
- https://developer.mozilla.org/ja/docs/Web/API/Fetch_API
- https://github.com/axios/axios
- https://nishinatoshiharu.com/compare-fetch-axios/
