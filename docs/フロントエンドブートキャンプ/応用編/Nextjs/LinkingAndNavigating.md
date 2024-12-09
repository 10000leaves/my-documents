---
tags: [フロントエンド , Nextjs]
sidebar_position: 4
---

Next.jsではルート間を移動する方法が4つある。

- Linkコンポーネント
- useRouterフック（クライアントコンポーネントでのみ使用可能）
- redirect（サーバーコンポーネントでのみ使用可能）
- History API

Next.jsでは`Link`を推奨しているので、基本的に`Link`を使用するようにしましょう。

## Linkコンポーネント
aタグと同じように使用する。  
実際Linkコンポーネントはaタグでレンダリングされる。  

動的ルートの場合は、`href`に`{/blog/${post.id}}`などを渡して生成します。

```tsx
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

## useRouter
クライアントコンポーネントでのみ使用する。

以下の例では、pushで遷移するようになっている。

```tsx
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter()
 
  return (
    <button type="button" onClick={() => router.push('/dashboard')}>
      Dashboard
    </button>
  )
}
```

## redirect
サーバーコンポーネントでのみ使用する。  

この場合は、teamが取得できなかった場合にログイン画面にリダイレクトされるようになっている。

ちなみに、`redirect`は絶対URLも渡せるので外部リンクにリダイレクトさせることもできます。

```tsx
import { redirect } from 'next/navigation'
 
async function fetchTeam(id: string) {
  const res = await fetch('https://...')
  if (!res.ok) return undefined
  return res.json()
}
 
export default async function Profile({ params }: : { params: { id: string }) {
  const team = await fetchTeam(params.id)
  if (!team) {
    redirect('/login')
  }
 
  // ...
}
```

## History API
Next.jsではブラウザの履歴スタックによるルーティングを設定することもできる。

以下の例では、URLのクエリパラメータに`?sort=asc`などのパラメータを設定し、ブラウザの履歴に新しく追加している。

これにより、ユーザーはブラウザバックした際にもURLのクエリパラメータを保持するため、ソートされた結果を表示するなどが行なえる。

```tsx
'use client'
 
import { useSearchParams } from 'next/navigation'
 
export default function SortProducts() {
  const searchParams = useSearchParams()
 
  function updateSorting(sortOrder: string) {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortOrder)
    window.history.pushState(null, '', `?${params.toString()}`)
  }
 
  return (
    <>
      <button onClick={() => updateSorting('asc')}>Sort Ascending</button>
      <button onClick={() => updateSorting('desc')}>Sort Descending</button>
    </>
  )
}
```