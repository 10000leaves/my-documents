---
tags: [フロントエンド]
sidebar_position: 24
---

## Jotaiとは
Jotaiは、Reactアプリケーション向けのシンプルで軽量な状態管理ライブラリです。「jōtai」は日本語で「状態」を意味し、RecoilにインスパイアされながらもよりミニマルなAPIを提供します。

## 主な特徴
- プリミティブで最小限のAPI
- TypeScriptファースト
- React Suspenseとの完全な互換性
- ボイラープレートが少ない
- 優れたパフォーマンス
- 小さなバンドルサイズ

## ユースケース
- シンプルなグローバル状態管理が必要な場合
- アトミックな状態管理を実現したい場合
- React Suspenseを活用したい場合
- 型安全な状態管理が必要な場合

## Jotaiの主要概念
### 1. Atom
- 状態の最小単位
- 読み取り/書き込み可能な値を保持
- プリミティブな値から複雑なオブジェクトまで対応

## Jotaiのインストール
```bash
npm install jotai
```

## Jotaiの設定
Jotaiを使用するために特別な設定は必要ありません。  
ただし、プロバイダーを使用する場合は以下のように設定できます。

```tsx
'use client'
import { Provider } from 'jotai'

export function JotaiProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}
```

## atomの作成
基本的なatomの作成方法

```ts
import { atom } from 'jotai'

type User = {
  id: number
  name: string
  email: string
}

export const userAtom = atom<User>({
  id: 0,
  name: '',
  email: ''
})
```

## Jotaiの主要フック
### 1. useAtom
atomの値の取得と更新の両方が可能です。

```ts
import { useAtom } from 'jotai'

const [value, setValue] = useAtom(userAtom)
```

### 2. useAtomValue
atomの値の取得のみ可能です。

```ts
import { useAtomValue } from 'jotai'

const value = useAtomValue(userAtom)
```

### 3. useSetAtom
atomの値の更新のみ可能です。

```ts
import { useSetAtom } from 'jotai'

const setValue = useSetAtom(userAtom)
```

## 派生atomの作成
読み取り専用の派生atomを作成する例

```tsx
import { atom } from 'jotai'

const countAtom = atom(0)
const doubleCountAtom = atom((get) => get(countAtom) * 2)
```

読み書き可能な派生atomを作成する例

```tsx
import { atom } from 'jotai'

const upperCaseAtom = atom(
  (get) => get(textAtom).toUpperCase(),
  (get, set, newValue: string) => set(textAtom, newValue.toLowerCase())
)
```

## 非同期atomの使用
Jotaiは非同期atomを自然にサポートします。

```tsx
import { atom } from 'jotai'

const userAtom = atom(async () => {
  const response = await fetch('/api/user')
  return response.json()
})
```

## Store / Provider
### 概要
Store は Atom の値を格納するオブジェクトで、Provider は内部に Store を保持して自身の子コンポーネントに提供します。Provider は内部で自動的に Store を作成しますが props 経由で Store を渡すこともできます。

### Store の作成
Store は createStore 関数で作成することができます。

```js
import { createStore, Provider } from 'jotai'

const store = createStore()

const Example = () => (
  <>
    {/* 自動生成される内部の Store を利用 */}
    <Provider><Counter /></Provider>
    {/* 外部から Store を提供 */}
    <Provider store={store}><Counter /></Provider>
  </>
)
```

### Provider と Store の主な利用用途
- Context のようにツリー毎に異なる状態を保持したい
- Atom に動的な初期値を設定したい
- コンポーネントの unmount により Atom をクリアしたい

### Store オブジェクトのメソッド
- get
  - atom config を引数に渡すとその Atom の値を取得できます
- set
  - 第一引数に atom config、第二引数に更新内容を指定して値を更新します
  - 値の更新内容の指定は useState と同じ値もしくは関数です
- sub
  - いわゆる購読処理を登録するための関数です
  - 第一引数に atom config、第二引数に更新があった時に実行される関数を指定します
  - 戻り値は呼び出すと購読処理を解除する関数です

```js
import { atom, createStore } from 'jotai'

const countAtom = atom(0)

const store = createStore()
// 取得
store.get(countAtom) // 0
// 更新
store.set(countAtom, 1)
store.set(countAtom, (prev) => prev + 1)
// 購読
const unsub = store.sub(countAtom, () => console.log(store.get(countAtom)))
unsub()
```

### デフォルト Store
プロバイダーレスモードの時に使用される jotai が内部で作成する Store は getDefaultStore 関数で取得できます。

```js
import { getDefaultStore } from 'jotai'
const defaultStore = getDefaultStore() 
```

### useStore
直近の親コンポーネントが保持している Store は useStore で取得できます。

```js 
import { useStore } from 'jotai'

const Example = () => {
  const store = useStore()
}
```

## ベストプラクティス
- アトミックな設計
- 状態を適切な粒度で分割する
- 関連する状態をまとめる
- 型定義の活用
- TypeScriptの型システムを最大限活用
- パフォーマンスの考慮
- 必要な部分のみを更新
- atomの適切な分割

## 注意点
- Server Side Rendering (SSR)
- Next.jsとの併用時は適切な設定が必要
- 状態の永続化
- 必要に応じてatomWithStorageを使用