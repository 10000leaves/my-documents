---
tags: [フロントエンド , Nextjs]
sidebar_position: 1
---

Next.jsのルートの定義。

Next.jsはフォルダを使用してルートを定義するファイルシステムベースのルーティングを採用している。

例えば、以下のようなディレクトリ構造の場合

```
app/
|-- page.tsx
|-- dashboard/
|   |-- page.tsx
|   |-- settings/
|       |-- page.tsx
```

この場合、ルーティングとの対応は以下となります。

- app: /
- dashboard: /dashboard
- dashboard/settings: /dashboard/settings

このように`page.tsx`ないし`page.jsx`、`page.js`を`default export`しているディレクトリに基づいてルーティングがなされる。
