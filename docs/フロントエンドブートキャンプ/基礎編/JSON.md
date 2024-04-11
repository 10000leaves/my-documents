---
tags: [フロントエンド]
sidebar_position: 17
---

## JSONとは
JavaScript Object Notationの略です。構造化データを表現するための標準のテキストベースの形式で、 JavaScript のオブジェクト構文に基づいています。  
JavaScript だけではなく、Java, PHP, Ruby, Python など、様々な言語間のデータ交換、特に Ajax や REST API などで使用されています。

## JSONの文法
よく利用されるケースとしては、`{ ... }` の中に、変数名と値をコロン(`:`)で区切り、下記の様に記述します。

```json
{ "name": "Horikawa" }
```

カンマ(`,`)で連結することにより、複数の変数名と値のペアを指定することができます。

```json
{
    "name": "Horikawa",
    "age": 26
}
```

変数名(`name` や `age`)はダブルクォーテーション(`"`)で囲みます。JavaScript ではシングルクォーテーション(`'`)で囲んだり、変数名をそのまま記述することができますが、JSON ではダブルクォーテーションのみとなります。

```json
○ { "name": "Horikawa" }
× { 'name': "Horikawa" }
× { name: "Horikawa" }
```

下記の様に、配列や値のみの表記も JSON に従ったデータとして認められます。

```
○ ["ABC", "DEF"]
○ "ABC"
○ 123
```

## JSONの型
JSON では下記の型を使用することができます。

- 文字列 (`"..."`)
- 数値 (`123`, `12.3`, `1.23e4` など)
- ヌル値 (`null`)
- 真偽値 (`true`, `false`)
- オブジェクト (`{ ... }`)  
  ```json
  {
    "user_info": {
      "user_id": "A1234567",
      "user_name": "Yamada Taro"
    }
  }
  ```
- 配列 (`[...]`)  
  ```json
  {
    "color_list": [ "red", "green", "blue" ],
    "num_list": [ 123, 456, 789 ],
    "mix_list": [ "red", 456, null, true ],
    "array_list": [ [ 12, 23 ], [ 34, 45 ], [ 56, 67 ] ],
    "object_list": [
      { "name": "Tanaka", "age": 26 },
      { "name": "Suzuki", "age": 32 }
    ]
  }
  ```