---
tags: [フロントエンド , Nextjs]
sidebar_position: 6
---

エラーハンドリング（Error Boundary）は`error.tsx`を作成するだけで実装できる。

Next.jsではこれだけで、`page.tsx`とその子コンポーネントを`Error Boundary`でラップしてくれる。

```
app/
|-- page.tsx
|-- dashboard/
|   |-- page.tsx
|   |-- error.tsx
|   |-- settings/
|       |-- page.tsx
|       |-- error.tsx
```
