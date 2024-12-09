---
tags: [フロントエンド , Nextjs]
sidebar_position: 2
---

`Next.js`の`App Router`では特定のファイル名で`default exportvすることで各ページで固有のUIを作成したり、各ページで共通のレイアウトを作成することができる。

## Pages
これは`Defining Routes`の方でもでてきた`page.tsx`のことを指す。

以下の例を用いて解説すると、`URL`が`/`のルートの場合は`app/page.tsx`でルートに固有のUI（99%トップページですが）を作ることができます。

また、`app/dashboard/page.tsx`では`URL`が`/dashboard`のときのページのUIを作成することになる。

```
app/
|-- page.tsx
|-- dashboard/
|   |-- page.tsx
|   |-- settings/
|       |-- page.tsx
```

## Layouts
次にLayoutsだが、これはページで共通のUIを作成するために用いる。

```
app/
|-- page.tsx
|-- dashboard/
|   |-- page.tsx
|   |-- layout.tsx
|   |-- settings/
|       |-- page.tsx
|       |-- layout.tsx
```

上記の場合、`URL`が`/dashboard`のときには共通のUIとして`layout.tsx`の内容が表示されることになる。  
また、`layout.tsx`は一度ルーティングによりナビゲートされると、状態を保持する仕様になっているので再レンダリングされないという特徴がある。

`layout.tsx`は以下のように`props`として`children`を受け取ることができるので、`page.tsx`の内容を`children`として表示することがでる。

```tsx title="layout.tsx"
import React, { ReactNode } from 'react'

const DashboardLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <div>
      <div>DashboardLayout</div>
      <div>{children}</div>
    </div>
  )
}

export default DashboardLayout
```

上記のルーティングの例では、ルーティングがネストされており、`dashboard/`以下では`layout`が2つある。このように`layout`がネストされると、子ルート（この場合は、`settings`配下）では、共通のレイアウトが積み上げられるUIになる。

## Template
Next.jsにはもう一つ共通UIを作成する`Tempalte`がある。  

```
app/
|-- page.tsx
|-- dashboard/
|   |-- page.tsx
|   |-- template.tsx
|   |-- settings/
|       |-- page.tsx
|       |-- template.tsx
```

`template`は`layout`の逆で、状態が保持されず、ルートにナビゲートするたびにコンポーネントが再レンダリングされる。

つまり、ページにナビゲートされるたびに、必ず実行したい機能があるなどのケースで有用である。
