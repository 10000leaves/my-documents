---
tags: [Git, GitHub, GitLab]
sidebar_position: 6
---

Gitを使っていく上でコミットメッセージは必須なものです。  

そのコミットメッセージ、**あああを修正** とかになっていませんか？  

コミットメッセージの内容が不明瞭だと、どんな変更をしたのか分かりづらく、  
レビュー時や後で見たときに、コードを追うのが難しくなってしまいます。  

以下の2点を意識して、コミットメッセージを書くようにしましょう。  

## 1.Prefixをつける
### Prefixとは
Prefixとは何かしらのテキストの先頭につける文字のことです。

feat: xxxをするため、xxxという機能を追加  
fix: yyyで発生するバグをyyyで修正  
refactor:  zzzをするため、zzzの機能をリファクタ  

上記の feat, fix, refactor などがPrefixです。  
コロン(:)とスペースは半角です。  

### Prefixをつけるメリット
* どのカテゴリのものを修正したのかが見てわかりやすい  
* コードロジックに影響がある変更かが瞬時にわかる  
* 機能をPrefixレベルで分割して作るようになる  

### Prefixルール
[Angular.js/DEVELOPERS.md](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#type)  

```
feat: 新しい機能
fix: バグの修正
docs: ドキュメントのみの変更
style: 空白、フォーマット、セミコロン追加など
refactor: 仕様に影響がないコード改善(リファクタ)
perf: パフォーマンス向上関連
test: テスト関連
chore: ビルド、補助ツール、ライブラリ関連
```

Angular.jsの開発者ガイドを参考にしています。  

## 2.理由を書く

変更した理由や目的を書くことでコードレビューがしやすくなります。  
例えばライブラリの追加時にも  
```
$ git commit -m "chore: hogeを追加"
```
ではなく  
```
$ git commit -m "chore: ネットワーク通信するため、hogeを追加"
```
と書いた方がよりわかりやすくなります。  

変更する理由や目的を意識すれば、適切なコミット頻度になり、変更履歴を追いやすくなります。  

## 例）コミットメッセージ
| bad | good |
| --- | --- |
| コメント修正 | docs: ○○画面の遷移処理のコメントを修正 |
| ページ追加 | feat: ○○画面を新規に追加 |
| ライブラリ更新 | chore: △△の更新と仕様変更の対応 |
| バグ確認 | fix: ○○画面の□□を確認するためログを出力 |
| スタイル修正 | style: ××ボタンの配置と色を修正 |

## 参考
* [僕が考える最強のコミットメッセージの書き方](https://qiita.com/konatsu_p/items/dfe199ebe3a7d2010b3e?utm_source=Qiita%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9&utm_campaign=ecd0c052bb-Qiita_newsletter_442_12_23_2020&utm_medium=email&utm_term=0_e44feaa081-ecd0c052bb-34716877)  
* [【今日からできる】コミットメッセージに 「プレフィックス」 をつけるだけで、開発効率が上がった話](https://qiita.com/numanomanu/items/45dd285b286a1f7280ed)  
