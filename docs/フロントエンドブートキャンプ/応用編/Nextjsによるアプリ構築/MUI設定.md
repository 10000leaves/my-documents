---
tags: [フロントエンド]
sidebar_position: 7
---

## インストール
```
npm install @mui/material @emotion/react @emotion/styled @mui/material-nextjs @emotion/cache @mui/icons-material

```  
https://mui.com/material-ui/getting-started/installation/  

## 初期設定    
  
- [こちらのサンプルプロジェクト](https://github.com/mui/material-ui/tree/master/examples/material-ui-nextjs-ts/src)を参考に`theme.ts`を追加  
  
- `layout.tsx`にAppRouterCacheProvider等をimportしてラップする。[詳細](https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-ts/src/app/layout.tsx)  
  
## ヘッダー・フッターの追加  
    
以下の参考にmuiのヘッダー・フッターを追加  
  
### ヘッダー  
https://mui.com/material-ui/react-app-bar/  
  
### フッター  
https://github.com/mui/material-ui/blob/master/examples/material-ui-nextjs-ts/src/components/Copyright.tsx
