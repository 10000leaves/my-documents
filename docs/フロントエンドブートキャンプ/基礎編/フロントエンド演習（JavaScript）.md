---
tags: [フロントエンド]
sidebar_position: 9
---

このチュートリアルに必要なもの

:::caution

このチュートリアルを行うには、以下のアプリやプラットフォームをインストールする必要があります。

- Node.js
- VS CodeやWebStormなどのエディター

:::

## JavaScriptファイルの実行方法
まず、以下のJavaScriptファイルをローカル環境に作成します。

```js title="increment.js"
// numに数値を代入
const num = 999

// 引数に1を足して返す
function increment(num) {
  return num + 1;
}

// numにインクリメントして、ログ出力
console.log(increment(num));
```

このプログラムは引数をインクリメントして返すだけのものです。  
これを以下のコマンドで実行します。  

```sh
$ node increment.js
1000
```

## コマンドライン引数の取得

### コマンドライン引数の渡し方
以下の通り、実行コマンドの後ろに、コマンドライン引数をつけて実行します。

```sh
$ node test.js aaa bbb ccc ddd eee
```

### コマンドライン引数を受け取り方
C言語などでは、`aaa`は`argv[0]`で取得できますが、Node.jsでは`argv[2]`となります。

#### 取得するインデックスの場所

| インデックス | 内容 |
|---|---|
| 0 | node |
| 1 | test.js |
| 2以降 | コマンドライン引数で渡される値 |

#### コードでの受け取り
`process.argv[int]`で値を受け取ります。  
`argv`だけでなく、`process`を忘れないようにしましょう。  

```js title="test.js"
for(var i = 0;i < process.argv.length; i++){
  console.log("argv[" + i + "] = " + process.argv[i]);
}
```

```sh
argv[0] = node
argv[1] = /workspace/test.js
argv[2] = aaa
argv[3] = bbb
argv[4] = ccc
argv[5] = ddd
argv[6] = eee
```

シンプルな受け取り方は以下です。

```js
// hogeに意味はありません
const hoge = process.argv[2]
console.log(hoge)
```

## 演習
基礎を参考にし、以下の演習を実施してください。

### 数値と文字列を出力
`11`,`10`,`5`,`Hello!`,`samurai`と記号・関数だけを用いて、以下をログに出力してください。

```sh
$ node logOutput.js
15
5
50
2
1
Hello! + samurai
Hello!samurai
```

### 条件分岐
コマンドライン引数が、`ネコ`の場合は`ペットはネコ！`をログに出力してください。  
コマンドライン引数が、`ネコ`以外の場合は`ペットはネコじゃない！`をログに出力してください。  

```sh
$ node pet.js ネコ
ペットはネコ！

$ node pet.js 犬
ペットはネコじゃない！
```

### 繰り返し処理
繰り返し処理を用いて、以下をログに出力してください。

```sh
$ node loop.js
1回目の処理
2回目の処理
3回目の処理
4回目の処理
5回目の処理
6回目の処理
7回目の処理
8回目の処理
9回目の処理
10回目の処理
```

### FizzBuzz
コマンドライン引数が、100以下の場合は数値と`FizzBuzz`をログに出力してください。  
コマンドライン引数が、101以上の場合は`100以下を指定してください`をログに出力してください。  

```sh
$ node FizzBuzz.js 16
1
2
Fizz
4
Buzz
Fizz
7
8
Fizz
Buzz
11
Fizz
13
14
FizzBuzz
16

$ node FizzBuzz.js 101
100以下を指定してください
```
