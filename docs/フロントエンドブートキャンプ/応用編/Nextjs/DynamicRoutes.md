---
tags: [フロントエンド , Nextjs]
sidebar_position: 3
---

## Dynamic Routesとは
Dynamic Routesとは、その名の通り、動的なルーティングのこと。  

Next.js では `[param]` のようにしてページ名に角括弧(ブラケット)を使うことで動的なルーティング(別名 `slug` や `pretty url` など)を作成できる。

以下の場合は、`/blog/foo`や`/blog/bar123`、`/blog/1`などのルーティングができる。  
また`[]`で囲んだ値を`props`でパラメータとして受け取ることができる。  

```
app/
|-- page.tsx
|-- blog/
|   |-- page.tsx
|   |-- [slug]/
|       |-- page.tsx
```

以下のように`slug`をパラメータとして受け取ることができる。

```tsx title="app/blog/[slug]/page.tsx"
export default function Page({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>
}
```

### generateStaticParams
この関数を`[slug]/page.tsx`で`export`することでビルド時に静的ルートとして生成することができる。

```tsx
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
```

このようにデータフェッチすることで、リクエストが自動でメモ化される。

これにより、`https://.../posts`のリクエストが1回のみ行われることを保証するので、ビルド時間の短縮につながる。

## Catch-all Segments
`Dynamic Routes`ではカッコ内に省略記号を用いることもできる。
それにより、後続のルートをすべてキャッチすることができる。

例えば、`app/shop/[...slug]/page.tsx`は`/shop/cloths`や`/shop/clothes/tops`、`/shop/clothes/tops/t-shirts`と一致するルーティングとなる。

各ルートのパラメータは以下のようになります。

```
/shop/cloths: { slug: ['clohts']}
/shop/clothes/tops: { slug: ['cloths', 'tops']}
/shop/clothes/tops/t-shirts: { slug: ['clothes', 'tops', 't-shirts']}
```

## Optional Catch-all Segments
さらに、以下のように二重括弧で囲むこともできます。

```
app/shop/[[...slug]]/page.tsx
```

これは、`/shopとも/shop/cloths`とも`/shop/clothes/tops`、`/shop/clothes/tops/t-shirts`とも一致させることができる。

`Catch-all Segments`との違いは、パラメータのないルートも一致するという点に違いがある。
取得できるパラメータは以下のようになり、パラメータのないルートはパラメータも空のオブジェクトになる。

```
/shop: {}
/shop/cloths: { slug: ['clohts']}
/shop/clothes/tops: { slug: ['cloths', 'tops']}
/shop/clothes/tops/t-shirts: { slug: ['clothes', 'tops', 't-shirts']}
```