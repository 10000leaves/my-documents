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
このAPIの役割は以下です。

- クライアントからのプロンプトを受信
- AWS Bedrockモデルとの通信
- ストリーミングレスポンスの生成

```tsx title="src/app/api/object/route.ts"
import { createAmazonBedrock } from '@ai-sdk/amazon-bedrock';
import { streamObject } from 'ai';
import { z } from 'zod';

export const runtime = 'edge';

const bedrock = createAmazonBedrock({
  region: process.env.NEXT_AWS_BEDROCK_REGION ?? '',
  accessKeyId: process.env.NEXT_AWS_BEDROCK_ACCESS_KEY_ID ?? '',
  secretAccessKey: process.env.NEXT_AWS_BEDROCK_SECRET_ACCESS_KEY ?? '',
});

// 回答させたいスキーマを定義
const originalSchema = z.object({
  name: z.string(),
  age: z.number(),
  hobby: z.string(),
  description: z.string()
});

export async function POST(req: Request) {
  const { prompt } = await req.json();

  const result = await streamObject({
    model: bedrock('anthropic.claude-3-5-sonnet-20241022-v2:0'),
    schema: originalSchema,
    prompt: `以下の人物プロフィールを生成してください：${prompt}`,
  });

  return result.toTextStreamResponse();
}
```

### フロントエンドの実装
フォームでプロンプトの入力を行い、オブジェクトの表示を行います。  
hooksは用意されていないため、自分で実装します。  

```tsx title="src/app/object/page.tsx"
'use client';

import { useState } from 'react';

type Profile = {
  name: string;
  age: number;
  isStudent: boolean;
  description: string;
};

export default function Page() {
  const [prompt, setPrompt] = useState('20代の学生');
  const [result, setResult] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/object', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const reader = response.body?.getReader();
      if (!reader) return;

      let accumulated = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        accumulated += new TextDecoder().decode(value);
        try {
          // 完全なJSONが受信されたら解析
          const parsed = JSON.parse(accumulated);
          setResult(parsed);
        } catch {
          // JSONの解析に失敗した場合は無視（まだストリーミング中）
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">ペルソナのプロフィール生成</h1>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            プロフィールの説明を入力してください
          </label>
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="例: 20代の学生"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full p-3 rounded-lg text-white font-medium transition-colors ${
            isLoading 
              ? 'bg-gray-400 cursor-not-allowed' 
              : 'bg-blue-500 hover:bg-blue-600'
          }`}
        >
          {isLoading ? '生成中...' : 'プロフィールを生成'}
        </button>
      </form>

      {result && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h2 className="font-medium">生成されたプロフィール</h2>
          </div>
          <div className="p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">名前:</div>
              <div className="col-span-2 font-medium">{result.name}</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">年齢:</div>
              <div className="col-span-2 font-medium">{result.age}歳</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">学生:</div>
              <div className="col-span-2 font-medium">
                {result.isStudent ? 'はい' : 'いいえ'}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-gray-600">説明:</div>
              <div className="col-span-2 font-medium">{result.description}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```