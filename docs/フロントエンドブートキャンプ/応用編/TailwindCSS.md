---
tags: [フロントエンド]
sidebar_position: 15
---

## Tailwind CSSとは
Tailwind CSSは、ユーティリティファーストのCSSフレームワーク。予め定義された多数のユーティリティクラスを組み合わせることで、CSSを記述することなくスタイリングができる。

## インストール方法
※Next.jsの場合は設定により標準で含まれている
```
# Tailwind CSSのインストール
npm install -D tailwindcss postcss autoprefixer

# Tailwind CSSの初期化
npx tailwindcss init -p
```

## 設定
```js title="tailwind.config.js"
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // カスタムテーマの設定
      colors: {
        primary: '#1a73e8',
        secondary: '#5f6368',
      },
      spacing: {
        '128': '32rem',
      },
    },
  },
  plugins: [],
}
```

```css title="index.css or globals.css"
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 基本的な使用方法
### グリッドレイアウト
```jsx
function App() {
  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* コンテンツ */}
      </div>
    </div>
  );
}
```

### フレックスボックス
```jsx
<div className="flex justify-between items-center">
  <div>左側のコンテンツ</div>
  <div>右側のコンテンツ</div>
</div>
```

### スペーシング
```jsx
<div className="space-y-4">
  <div className="p-4">パディング4</div>
  <div className="m-4">マージン4</div>
  <div className="px-4 py-2">水平パディング4、垂直パディング2</div>
</div>
```

### レスポンシブデザイン
```jsx
<div className="text-sm md:text-base lg:text-lg">
  レスポンシブなテキストサイズ
</div>
```

## よく使用するユーティリティ

### テキスト
```jsx
<div>
  <h1 className="text-2xl font-bold text-gray-800">見出し</h1>
  <p className="text-base text-gray-600">
    通常のテキスト
  </p>
  <span className="text-sm font-medium text-blue-500">
    リンクテキスト
  </span>
</div>
```

### ボタン
```jsx
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  ボタン
</button>
```

### カード
```jsx
<div className="bg-white rounded-lg shadow-md p-6">
  <h2 className="text-xl font-semibold mb-2">タイトル</h2>
  <p className="text-gray-600">内容</p>
</div>
```

### アニメーション
```jsx
<div className="transition-all duration-300 hover:scale-105">
  ホバー時に拡大
</div>
```

### メディアクエリ
```jsx
<div className="text-sm md:text-base lg:text-lg xl:text-xl">
  レスポンシブテキスト
</div>
```
