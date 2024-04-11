---
tags: [フロントエンド]
sidebar_position: 4
---

## 目的
JavaScriptの概要を理解することが目的

## JavaScriptとは
JavaScriptを使うと、HTMLやCSSでは表現できない機能をWebコンテンツに与えられます。

例えば、項目を入力してボタンを押すことで、簡単な計算結果を画面に表示できます。会員登録フォームに情報を入力して「登録」ボタンを押したときに、未記入の欄がありエラーメッセージが出た経験はありませんか。その機能を実現しているのがJavaScriptです。

## JavaScriptのバージョン
2023年現在のJavaScript最新バージョンは「ES2023」です。  

JavaScriptの仕様はECMAScriptで、ECMAScript 2015（ES2015）、ECMAScript 2016（ES2016）...というように毎年進化を続けています。

## JavaScriptの書き方
JavaScriptには、二つの記述場所があります。

一つ目は、HTMLファイルの中に直接JavaScriptを書き込む方法です。HTMLのファイルの中に「script」というタグを書くと、scriptタグで囲まれた部分はJavaScriptのプログラムとして認識されます。

二つ目の方法は、JavaScriptだけを記述したファイルを作成し、HTMLファイルでそちらのファイルを読み込むという方法です。

### HTMLファイルに直接書く方法
JavaScript は `<script>～</script>` の間に記述します。

```html title="HTML"
<script>
  alert("Hello!!");
</script>
```

### 外部ファイルを作成して実行する方法
HTML とは別に、外部ファイルに記述した JavaScript ファイルを呼び出すこともできます。例えば、下記の内容を `test.js` など、拡張子が `.js` のファイルに記述しておきます。

```js title="test.js"
function ohayou() {
  alert("Hello!");
}
```

これを、HTML ファイルから次のようにして読み込みます。

```html title="HTML"
<!DOCTYPE html>
<html>
<head>
<title>JavaScript Sample</title>
<script src="test.js"></script>
</head>
<body>
   :
<input type="button" value="OK" onclick="ohayou()">
   :
</body>
</html>
```

外部ファイルを複数読みこませたい場合は、次のように `<script>` を2つ記述してください。

```html title="HTML"
<script src="test1.js"></script>
<script src="test2.js"></script>
```

### イベントハンドラ(on～)
上記の例でも使用していますが、次のようにして、ボタンをクリックしたとき（onclick）やマウスを乗せたとき（onmouseover）などに JavaScript を実行することができます。これを、イベントハンドラと呼びます。下記の例では、Click Me!! というボタンを押したときに、Hello! というダイアログを表示します。

```html title="HTML"
<button onClick={() => alert('button clicked!')}>Click me!</button>
```

<hr/>

<button onClick={() => alert('button clicked!')}>Click me!</button>

<hr/>

### URL記述(javascript:...)
JavaScript を下記のように記述すると、リンクをクリックした際に JavaScript を実行することもできます。

```html title="HTML"
<a href="javascript:void(0);">空の実行リンク</a>
```

<hr/>

<a href="javascript:void(0);">空の実行リンク</a>

<hr/>

## ログを表示
JavaScriptの値を簡易的に表示させる方法は2種類あります。

### コンソールに出力
1つはブラウザの検証ツールのコンソール欄に表示する方法です。

```js
// 例：コンソール欄に「10」と表示
console.log(10);
```

### ダイアログに出力
もう1つの表示方法は、ダイアログに出力する方法です。

```js
// 例：ブラウザを開いた際に「10」とダイアログで表示
alert(10);
```

## コメントアウト
コメントアウトとは、JavaScriptのソースコードを一時的に無効にする機能です。  
開発の途中でまた使用する可能性がある場合や、プログラムの説明を書くときなどに使います。  


```js
// 一行コメントアウトの例 頭に // を記述
// alert("ハロー");
```

```js
// 複数行コメントアウトの例 /* */ で囲む

/*
ここにも文章やコードを書いてもOKです。表示されません。
alert("ハロー");
*/
```

```js
// プログラムの説明の使用例

// 「ハロー」と表示されるダイアログを表示する内容です。
alert("ハロー");
```

## 数値と文字列を出力
数値と文字列を出力する方法は下記のとおりです。

```html
<!DOCTYPE html>
<html lang="ja">
  　<head>
    　　<meta charset="utf-8">
    　　<title>Hello</title>
  　</head>
  　<body>
　　　<script>
              console.log(10 + 5); // 数値として処理。出力結果は15
              console.log(10 - 5); // 数値として処理。出力結果は5
              console.log(10 * 5); // 数値として処理。出力結果は50
              console.log(10 / 5); // 数値として処理。出力結果は2
              console.log(11 % 5); // 数値として処理。出力結果は1 ※余りの計算
              console.log("Hello! + samurai"); // 文字列として処理。出力結果はHello! + samurai
              console.log("Hello!" + "samurai"); //文字列として処理。出力結果はHello!samurai
    　　</script>
  　</body>
</html>
```

## 変数の書き方
変数とは、プログラミング実行時にデータを一時的に格納しておく箱のようなものです。  
プログラミング上は変数名といわれる固定の名前で取り扱います。変数の値はプログラム内で書き換えることができため、同じ変数でも実行途中で格納されているデータは変化します。

以下は変数「pet」に「ネコ」を、変数「count」に「10」を設定しています。

```html
<!DOCTYPE html>
<html lang="ja">
  　<head>
    　　<meta charset="utf-8">
    　　<title>Hello</title>
  　</head>
  　<body>
　　　<script>
　　　　　var pet = ”ネコ”;
　　　　　var count = 10;
　　　</script>
  　</body>
</html>
```

## 条件分岐の書き方（if文など）
条件分岐とは「xxxという条件に該当する場合はAを、異なる場合はBを実行する」といったように、条件を満たしたかどうかで処理対象の結果を分けたいときに使います。

以下は、Webブラウザ表示時に変数petがネコだったら「ペットはネコ！」、そうでない場合は「ペットはネコじゃない！」と表示します。

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Hello</title>
    </head>
    <body>
      <script>
          var pet = "ネコ";
          if(pet == "ネコ"){
              alert("ペットはネコ！");
          } else {
              alert("ペットはネコじゃない！");
          }
      </script>
    </body>
</html>
```

## 繰り返し処理の書き方
繰り返し処理をしたい場合は、for文を使います。

下記のサンプルでは変数countが0からスタートし、条件式「`count < 10`」を満たすあいだ、繰り返し処理を行います。

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Hello</title>
    </head>
    <body>
      <script>
            for (let count = 0; count < 10; count++) {
                    console.log((count + 1) +  "回目の処理");
            }
      </script>
    </body>
</html>
```

## 関数の書き方
関数とは、汎用的に利用できる一連の処理をまとめたものです。関数をつくれば、複数個所での利用も可能です。

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Hello</title>
    </head>
    <body>
      <script>
          // 関数helloを定義する
          function hello() {
              alert("Hello!samurai");
          }
          // 関数helloを呼ぶ
　　      hello();
      </script>
    </body>
</html>
```

## 引数の使い方
引数は関数に入力する値です。入力された引数に従った処理を実行します。

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Hello</title>
    </head>
    <body>
        <script>
            // 関数helloを定義する（引数nameを設定）
            function hello(name) {
                console.log("Hello!" + name);
            }
            // 引数に「tanaka」を指定して関数helloを実行する
            hello('tanaka');
            // 引数に「sato」を指定して関数helloを実行する
            hello('sato');
           // 引数に「yamada」を指定して関数helloを実行する
            hello('yamada');
        </script>
    </body>
</html>
```

## 戻り値・返り値の使い方
関数を呼び出した側は、関数が処理した結果を受け取ることができます。

```html
<!DOCTYPE html>
<html lang="ja">
    <head>
        <meta charset="utf-8">
        <title>Hello</title>
    </head>
    <body>
        <script>
            // 関数helloを定義する
            function hello(name) {
                return "Hello!" + name;
            }
   　       // 関数helloの戻り値を受け取る
            message = hello('tanaka');
            // コンソールに変数messageの値を表示する
            console.log(message);
        </script>
    </body>
</html>
```

## 配列
JavaScriptには様々な変数の型が存在します。有名なところでは文字列や数字、真偽値などがありますが、そうした変数を複数格納できるのが配列です。最も基本的な定義は `[]` で行われます。

```js
const ary = [];
```

リストを作ったり、APIで取得したデータにも配列がよく使われます。配列を操作する方法をマスターすれば、フロントエンドマスターにぐっと近づくでしょう。

### 初期化
配列の初期化は [] を利用して行います。

```js
const ary = [];
// この場合 ary は空の配列になります。

console.log(ary.length);
// => 0
// 初期化する際に値をあらかじめ指定する場合には , で値を区切ります。

const ary = ['文字です', 100, true, new Date];
// 配列の要素にアクセスする際には数字を使います。最初が0なので注意してください。

console.log(ary.length);
// => 4

console.log(ary[0]);
// => 文字です
```

### 配列に値を追加する
既存の配列に値を追加する際には `push` メソッドを使います。 `push` は一番最後に追加します。

```js
const ary = ['文字です', 100, true, new Date];
ary.push('新しい値');

console.log(ary);
// => ['文字です', 100, true, new Date, '新しい値']
```

一番先頭に追加する場合には `unshift` を使います。
```js
const ary = ['文字です', 100, true, new Date];
ary.unshift('新しい値');

console.log(ary);
// => ['新しい値', '文字です', 100, true, new Date]
```

### 配列から値を削除する
既存の配列から値を削除する際には pop メソッドを使います。 pop メソッドは最後の要素を削除します。

```js
const ary = ['文字です', 100, true, new Date];
ary.pop();

console.log(ary);
// => ['文字です', 100, true]
```

一番先頭の要素を削除する場合には shift を使います。

```js
const ary = ['文字です', 100, true, new Date];
ary.shift();

console.log(ary);
// => [100, true, new Date]
```

### 配列を検索して、マッチしたデータだけ新しい配列を作る
filter 関数を使うと、配列を検索してマッチしたデータだけで新しい配列を作ります。trueを返すとその要素が使われます。それ以外の場合には除外されます。以下の例は偶数だけを抽出するものです。

```js
const ary = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ary2 = ary.filter(i => {
  if (i % 2 === 0) {
    return true;
  } else {
    return false;
  }
});

console.log(ary2);
// => [0, 2, 4, 6, 8]
```

上記のコードは次のようにも書けます。

```js
const ary = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ary2 = ary.filter(i => i % 2 === 0);

console.log(ary2);
// => [0, 2, 4, 6, 8]
```

### 配列を順番に処理する（重要）
順番に処理をして、その結果を別な配列として受け取りたい場合には、`map` メソッドを使う。

```js
const ary = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const ary2 = ary.map(a => a * 100);

console.log(ary2);
// => [0, 100, 200, 300, 400, 500, 600, 700, 800, 900]
```

配列の値同士を計算したい時には reduce メソッドを使う。

```js
const ary = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const ary2 = ary.reduce((previousValue, currentValue) => previousValue * currentValue);

console.log(ary2);
// => 362880
```

### 要素を順番に処理する for of（重要）
配列に含まれている要素へ順番にアクセスしたい場合には `for of` を使う。

```js
const ary = ['文字です', 100, true];
for (const val of ary) {
  console.log(val);
}
// => 文字です
// => 100
// => true
```

逆に添え字にアクセスしたい時には `for in` を使う。

```js
const ary = ['文字です', 100, true];
for (const val in ary) {
  console.log(val);
}
// => 0
// => 1
// => 2
```

## 理解度チェック
- [ ] JavaScriptとは何か簡単に説明できる
- [ ] JavaScriptの記述場所ついて2か所を挙げることができる
- [ ] 外部JavaScriptファイルをHTMLから読み込む方法について説明できる
- [ ] JavaScriptで変数の値を確認したい場合に、簡易的に表示する方法について説明できる。