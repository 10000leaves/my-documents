---
tags: [フロントエンド]
sidebar_position: 8
---

Next.js13で登場した新しいルーティングの機能が「App Router」

## App Routerとは

- ✅App Routerは1フォルダ = 1ページのルーティング。  
- ✅フォルダの中にpage.jsを作るとページができる。  
- ✅ルーティング以外にも追加機能、廃止機能がある。  

## Pages Routerとの比較

| Pages Router | App Router   |
|--------------|--------------|
| 1ファイル = 1ページ | 1フォルダ = 1ページ |
| ファイル名がURLになる | フォルダ名がURLになる |
| ファイル名は何でもOK  | ファイル名が決まっている |
| pagesフォルダを使う | appフォルダを使う   |

### 例：2ページだけのフォルダ構成

``` title="🚫Pages Routerの場合"
pages/
├── index.js        --> /
└── about.js        --> /about
```

``` title="✅App Routerの場合"
app/
├── page.js           --> 「/」トップページ
└── about/
    └── page.js       --> 「/about」ページ
```

ページの数だけpage.jsが必要ということ

## ページ遷移の実装
`app/page.tsx`から、`day/page.tsx`と`about/page.tsx`へ遷移するようにボタンを配置する。

ディレクトリ構造は以下。

```
.
└─ app # アプリケーション
   ├── public # パブリック
   └── src # ソース
       └── app # App Router
           ├── page.tsx # ルートページ
           ├── layout.tsx # 共通レイアウト
           ├── recoilProvider.tsx # recoil
           ├── about ☆
           │   ├── page.tsx 
           │   └── layout.tsx
           └── about ☆
               ├── page.tsx 
               └── layout.tsx
```

```ts title="src/app/layout.tsx"
export const metadata = {
  title: "app-routerテストページ",
  description: "Next.jsのApp Routerで普通にリンクする",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="">{children}</body>
    </html>
  );
}
```

```ts title="src/app/page.tsx"
'use client'
 
import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter();
  return (
    <>
        <button type="button" onClick={() => router.push('/day')}>
          dayへ
        </button>
        <button type="button" onClick={() => router.push('/about')}>
          aboutへ
        </button>   
    </>
  )
}
```

```ts title="src/app/day/page.tsx"
'use client'

import { useRouter } from 'next/navigation'
 
export default function Page() {
  const router = useRouter();
  return (
    <>
        <button type="button" onClick={() => router.push('/')}>
          戻る
        </button> 
    </>
  )
}
```

関数handleClickを定義して記載することもできる。

```ts title="src/app/about/page.tsx"
'use client'
 
import { useRouter } from 'next/navigation'

const About = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/");
  };

  return (
    <>
        <button onClick={handleClick}>
          戻る
        </button>
    </>
  );
};

export default About;
```