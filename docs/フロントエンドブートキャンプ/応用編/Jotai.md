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