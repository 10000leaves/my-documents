---
tags: [フロントエンド , Nextjs]
sidebar_position: 5
---

Next.jsでは`React Suspense`としてページ全体をローディングにすることができる機能がある。

以下のように、`layout.tsx`を作成し、`default export`する。  
このファイルの内容を`Spinner`にすればローディングUIが完成する。  

```
app/
|-- page.tsx
|-- dashboard/
|   |-- page.tsx
|   |-- loading.tsx
|   |-- settings/
|       |-- page.tsx
|       |-- loading.tsx
```

サーバーコンポーネントであれば、`fetch`して`await`している間に`loading.tsx`の内容が表示されるという機能にする。

```tsx title="app/dashboard/loading.tsx"
export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <LoadingSkeleton />
}
```

スケルトンを表示するようにしておけばいい感じ。
