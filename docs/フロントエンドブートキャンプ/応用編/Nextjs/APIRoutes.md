---
tags: [フロントエンド , Nextjs]
sidebar_position: 7
---

## API Routesとは
API Routesは、Next.jsに組み込まれている機能で、APIエンドポイントを簡単に作成できる仕組み。

`app/api`ディレクトリ配下に`JavaScript/TypeScript`ファイルを作成することで、サーバーサイドのAPIエンドポイントとして機能する。

## 例

### 基本的な使い方
`API Routes`に記述したコードは`serverless functions`(サーバレス)としてデプロイされる。`serverless functions`を利用するとサーバを管理する必要がなくなり`serverless functions`を提供するクラウドプロバイダーがサーバを管理してくれる。

```tsx title="app/api/hello.ts"
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}
```

`API Routes`では作成した関数は必ず`export`する必要がある。  
関数名は`handler`とすることが多いが、任意の名前をつけることができる。  

### HTTPメソッドの処理
```tsx title="app/api/users.ts"
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case 'GET':
      // GETリクエストの処理
      res.status(200).json({ users: ['User1', 'User2'] })
      break
    case 'POST':
      // POSTリクエストの処理
      const { name } = req.body
      res.status(201).json({ message: `Created user: ${name}` })
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}
```

## API Routesのメリット
- 簡単な設定
  - 追加のサーバー設定が不要
  - `app/api`ディレクトリに配置するだけで機能する
- サーバーレス関数として動作
  - Vercelなどのプラットフォームで自動的にサーバーレス関数として展開される
  - スケーラビリティが高い
- フルスタック開発の効率化
  - フロントエンドとバックエンドを同じプロジェクトで管理可能
  - 開発環境のセットアップが簡単

## API Routesのデメリット
- パフォーマンスの制限
  - サーバーレス関数としての制約（コールドスタート）
  - 処理は長時間実行できない
- スケーラビリティの制限
  - 複雑なAPIアーキテクチャには不向き
  - マイクロサービスアーキテクチャには適さない場合がある

## 中間APIとしてのAPI Routes
API Routesは中間API（Middleware API）としても使用することができる。

フロントエンドと外部APIの間で様々な処理を実装できる。これにより、セキュリティの向上やデータの加工、キャッシュの実装などが可能になります。

### 中間APIのメリット
- セキュリティーを強化
  - サーバーサイドで使用するため`NEXT_PUBLIC`をつける必要がない
  - トークン等のリクエスト情報を外部から見えないようにできる
- APIエンドポイントの抽象化
  - APIのエンドポイントの変更や追加が発生た場合でも、フロントエンド側のコード変更量を減らすことができる
- TypeScriptによる型チェック
  - APIのリターンが想定通りの型か、TypeScriptによる型チェックが行える

### 中間APIのデメリット
- APIの管理が複雑
  - エンドポイントの数が増えるので、APIの管理が中間APIを挟まない場合と比較すると複雑になる。
- 開発工数が増加
  - 中間APIを開発するための工数が増える。（APIのリターンのチェックを行うことを考えると変わらない？）

### 主なユースケース
- APIキーの保護
- レスポンスデータの加工
- 複数APIの統合
- エラーハンドリングとログ記録

### 実装例
#### APIキーの保護
```tsx
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // 環境変数にNEXT_PUBLICをつけなくていい
    const response = await fetch(`${process.env.API_URL}/data`, {
      headers: {
        'Authorization': `Bearer ${process.env.API_KEY}`,
        'Content-Type': 'application/json',
      },
    })
    
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' })
  }
}
```

#### レスポンスデータの加工
```tsx
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${process.env.API_URL}/data`)
    const data = await response.json()

    // データの加工
    const transformedData = data.map((item: any) => ({
      id: item.id,
      name: item.name.toUpperCase(),
      created: new Date(item.created_at).toISOString()
    }))

    res.status(200).json(transformedData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to transform data' })
  }
}
```

#### 複数APIの統合
```tsx
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const [usersResponse, postsResponse] = await Promise.all([
      fetch(`${process.env.API_URL1}/users`),
      fetch(`${process.env.API_URL2}/posts`)
    ])

    const users = await usersResponse.json()
    const posts = await postsResponse.json()

    // データの結合
    const aggregatedData = {
      users,
      posts,
      timestamp: new Date().toISOString()
    }

    res.status(200).json(aggregatedData)
  } catch (error) {
    res.status(500).json({ error: 'Failed to aggregate data' })
  }
}
```

#### エラーハンドリングとログ記録
```tsx
// utils/logger.ts
export const logger = {
  error: (error: any) => {
    console.error(new Date().toISOString(), error)
    // 必要に応じてログ管理サービスに送信
  }
}

// app/api/handler.ts
import { logger } from '@/utils/logger'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(`${process.env.API_URL}/data`)
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    const data = await response.json()
    res.status(200).json(data)
  } catch (error) {
    logger.error(error)
    res.status(500).json({
      error: 'An error occurred while processing your request',
      requestId: new Date().getTime()
    })
  }
}
```
