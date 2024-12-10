---
tags: [フロントエンド]
sidebar_position: 12
---

難しいことは抜きでコピペで出来ます。

少し複雑な**任意のオブジェクトで回答するアプリ**を構築します。

「ホーム画面の実装」までの手順は同様です。

## 技術スタック
### zod
- TypeScript向けのスキーマ宣言とデータ検証のためのライブラリ
- 型安全な方法でデータ構造を定義し、それに基づいてデータを検証できる
- Zodは型とデータの整合性を強化するためのツール

## 実装

### APIの実装
APIが返す型（スキーマ）を定義
```tsx title="src/app/api/object/schema.ts"
import { z } from 'zod';

// 回答させたいスキーマを定義
export const profileSchema = z
  .object({
    name: z.string().describe('名前'),
    age: z.number().describe('年齢'),
    isAccount: z.string().describe('証券口座を開設しているか、していないか'),
    description: z.string().describe('詳細なプロフィール'),
    problem: z.string().describe('抱えている課題'),
  });
```

このAPIの役割は以下です。

- クライアントからのプロンプトを受信
- AWS Bedrockモデルとの通信
- ストリーミングレスポンスの生成

```tsx title="src/app/api/object/route.ts"
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { streamObject } from 'ai';
import { profileSchema } from './schema';

export const runtime = 'edge';

const bedrock = createAmazonBedrock({
  region: process.env.NEXT_AWS_BEDROCK_REGION ?? '',
  accessKeyId: process.env.NEXT_AWS_BEDROCK_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.NEXT_AWS_BEDROCK_SECRET_ACCESS_KEY ?? '',
});

export async function POST(req: Request) {
  const value = await req.json();

  const result = await streamObject({
    model: bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),
    schema: profileSchema,
    prompt: `以下の人物プロフィールを生成してください：${value}`,
  });

  return result.toTextStreamResponse();
}
```

### フロントエンドの実装
フォームでプロンプトの入力を行い、オブジェクトの表示を行います。  
hooksは用意されていないため、自分で実装します。  

```tsx title="src/app/object/page.tsx"
'use client';

import { experimental_useObject as useObject } from 'ai/react';
import { profileSchema } from '@/app/api/object/schema';

export default function Page() {
  const { object, submit, stop, isLoading, error } = useObject({
    api: '/api/object',
    schema: profileSchema,
  });

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ペルソナ生成</h1>

      <div className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            作成する人物の説明を入力してください
          </label>
          <input
            type="text"
            defaultValue="20代の飲食業の会社員"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例: 20代の飲食業の会社員"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                submit(e.currentTarget.value);
              }
            }}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              const input = e.currentTarget.parentElement?.previousElementSibling?.querySelector('input');
              if (input) {
                submit(input.value);
              }
            }}
            disabled={isLoading}
            className={`flex-1 p-3 rounded-lg text-white font-medium transition-colors ${
              isLoading 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            {isLoading ? '生成中...' : 'ペルソナを生成'}
          </button>
          {isLoading && (
            <button
              onClick={() => stop()}
              className="p-3 rounded-lg border border-gray-300 hover:bg-gray-50"
            >
              停止
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600">
          エラーが発生しました: {error.message}
        </div>
      )}

      {object && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h2 className="font-medium">生成されたペルソナ</h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">名前:</div>
              <div className="col-span-2 font-medium">{object.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">年齢:</div>
              <div className="col-span-2 font-medium">{object.age}歳</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">証券口座:</div>
              <div className="col-span-2 font-medium">
                {object.isAccount ? '開設済み' : '未開設'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">説明:</div>
              <div className="col-span-2 font-medium">{object.description}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">課題:</div>
              <div className="col-span-2 font-medium">{object.problem}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```