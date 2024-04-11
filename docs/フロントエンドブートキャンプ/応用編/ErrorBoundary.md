---
tags: [フロントエンド]
sidebar_position: 17
---

## ErrorBoundaryとは
> error boundary は自身の子コンポーネントツリーで発生した JavaScript エラーをキャッチし、エラーを記録し、クラッシュしたコンポーネントツリーの代わりにフォールバック用の UI を表示する React コンポーネントです。

Error Boundary とは React 公式ドキュメントの引用文通りです。  
コンポーネントでエラーが発生した時に、エラーを補足したり、エラー用の UI を表示できるというわけです。  

古いが公式の[live demo](https://codepen.io/gaearon/pen/wqvxGa?editors=0010)があるので触ったほうが分かりやすい。

## 基本的な使い方
基本的な使い方は、childrenで例外がthrowされた場合は、fallbackのコンポーネントが表示される。

```js
<ErrorBoundary fallback={"Something went wrong"}>
  <Component />
</ErrorBoundary>
```

## ErrorBoundaryコンポーネント
ErrorBoundaryコンポーネントは、Reactが用意してくれていないので、自前で作成する必要がある。

実装例のサンプルコードは、[公式ドキュメント](https://ja.react.dev/reference/react/Component#catching-rendering-errors-with-an-error-boundary)に記載されている。

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 子コンポーネントで例外が発生すると呼ばれる。
    // 戻り値では、コンポーネントの状態を返す必要がある。
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // 発生したエラーのログを取得する
    logErrorToMyService(error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      // エラーがある場合は、fallbackをレンダリングする
      return this.props.fallback;
    }
    // エラーがない場合は、childrenをレンダリングする
    return this.props.children;
  }
}
```

## Function コンポーネントで実装できない
サンプルコードにあったように、現時点で、FunctionコンポーネントとしてErrorBoundaryを実装することはできず、Classコンポーネントを使う必要がある。

クラスコンポーネントを独自管理するのが嫌な場合は、`ErrorBoundary`の実装を提供してくれている [react-error-boundary](https://github.com/bvaughn/react-error-boundary) のようなossを使用する必要がある。

公式にも書いてある。

## ErrorBoundaryがキャッチしないエラー
ErrorBoundaryがキャッチしないエラーがあるので、少し古いが、[公式サイト](https://17.reactjs.org/docs/error-boundaries.html#introducing-error-boundaries)より抜粋。  
  
:::warning
  
ErrorBoundary は、以下のエラーをキャッチしません。  
* イベントハンドラー
* 非同期コード
* サーバー側のレンダリング
* ErrorBoundary自身でthrowされたエラー
  
:::

非同期コードによるエラーがキャッチできないため、そのまま使った場合はAPI処理のエラーがキャッチできないということになる。  
キャッチできるようにするには、後述するreact-error-boundaryの[useErrorBoundary](https://github.com/bvaughn/react-error-boundary?tab=readme-ov-file#useerrorboundary-hook)を使ったりすればよい。  

## react-error-boundary
すべては以下にある。

https://github.com/bvaughn/react-error-boundary

### 実装例

```ts
"use client";

import { ErrorBoundary } from "react-error-boundary";

function Fallback({ error, resetErrorBoundary }) {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
}

<ErrorBoundary
  FallbackComponent={Fallback}
  onReset={(details) => {
    // Reset the state of your app so the error doesn't happen again
  }}
>
  <ExampleApplication />
</ErrorBoundary>;
```
