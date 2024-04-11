---
tags: [フロントエンド]
sidebar_position: 6
---

useMemoは関数の結果を保持するためのフックで、何回やっても結果が同じ場合の値などを保存(メモ化)し、そこから値を再取得します。

不要な再計算をスキップすることから、パフォーマンスの向上が期待出来ます。
useCallbackは関数自体をメモ化しますが、useMemoは関数の結果を保持します。

```js
const cachedValue = useMemo(calculateValue, dependencies)
```

## メモ化とは
メモ化とは同じ結果を返す処理について、初回のみ処理を実行記録しておき、値が必要となった2回目以降は、前回の処理結果を計算することなく呼び出し値を得られるようにすることです。

都度計算しなくて良くなることからパフォーマンス向上が期待できます。

## 基本
### 依存配列が空の場合
```js
const sampleMemoFunc = () => {
  const memoResult = useMemo(() => hogeMemoFunc(), [])

  return <div>{memoResult}</div>
}
```

依存配列=[deps] へ空配列を渡すと何にも依存しないので、1回のみ実行します。
つまり、依存関係が変わらない場合はキャッシュから値をとってきます。

### 依存配列に値が入っている場合
props.nameの値が変わったときだけ関数を再実行させたい場合は以下のように書きます。

```js
const sampleMemoFunc = (props) => {
  const memoResult = useMemo(() => hogeMemoFunc(props.name), [props.name])

  return <div>{memoResult}</div>
}
```

依存配列=[deps] へ変数を並べると、変数のどれかの値が変わった時にfuncを再実行します。
つまり、依存関係が変わった場合に再実行します。
