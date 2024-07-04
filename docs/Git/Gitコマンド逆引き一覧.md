---
tags: [Git, GitHub, GitLab]
sidebar_position: 5
---

## 初期設定
- 初期設定を行う
  ```sh
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

## リポジトリの作成とプッシュ
- ローカルにリポジトリを作成し、リモートにプッシュする
  ```sh
  git init
  git add .
  git commit -m "Initial commit"
  git remote add origin https://github.com/user/repo.git
  git push -u origin main
  ```

## リモートからのクローンと変更の取得
- リモートからクローンする
  ```sh
  git clone https://github.com/user/repo.git
  ```

- リモートから変更を取得する
  ```sh
  git pull
  ```

  または

  ```sh
  git fetch
  git merge origin/master
  ```

## ファイルの登録とコミット
- ファイルの登録（ステージング）
  ```sh
  git add <ファイル名>
  ```

- ファイルの変更や追加をコミット
  ```sh
  git commit -m "コミットメッセージ"
  ```

## 変更の確認と差分の抽出
- ローカルの変更を確認する
  ```sh
  git status
  ```

- リモートとローカルのファイルの差分を抽出する
  ```sh
  git diff <ファイル名>
  ```

## コミットの履歴と変更点の確認
- commitの変更履歴をみる
  ```sh
  git log
  ```

- 指定したcommitの変更点を見る
  ```sh
  git show <コミットのハッシュ値>
  ```

## リモートへのプッシュ
- リモートにプッシュ
  ```sh
  git push origin <ブランチ名>
  ```

## addとcommitの取り消し
- addの取り消し
  ```sh
  git reset HEAD <ファイル名>
  ```

- commitの取り消し
  ```sh
  git reset --hard HEAD^
  ```
  - `--hard`: コミット取り消した上でワークディレクトリの内容も書き換えたい場合
  - `--soft`: ワークディレクトリの内容はそのままでコミットだけを取り消したい場合
  - `HEAD^`: 直前のコミット
  - `HEAD~{n}`: n個前のコミット

## commitの打ち消しとメッセージの修正
- commitの打ち消し
  ```sh
  git revert <コミットのハッシュ値>
  ```

- コミットメッセージの修正
  ```sh
  git commit --amend "新しいコミットメッセージ"
  ```

## pushの取り消し
- pushの取り消し
  ```sh
  git reset --hard <戻したいコミットのハッシュ値>
  git push -f
  ```

## ブランチの作成、切り替え、名前変更、削除
- ローカルでブランチを作成
  ```sh
  git branch <ブランチ名>
  ```

- ローカルでブランチを切り替え
  ```sh
  git checkout <ブランチ名>
  ```
- ブランチ作成 & 切り替え
  ```sh
  git checkout -b <ブランチ名>
  ```

- ブランチ名の変更
  ```sh
  git branch -m <古いブランチ名> <新しいブランチ名>
  ```

- ブランチの削除
  ```sh
  git branch -d <ブランチ名>
  ```

## ブランチのリモートへの反映とローカルへの取得
- ローカルのブランチをリモートに反映
  ```sh
  git push -u origin <ローカルのブランチ名>
  ```

- リモートのブランチをローカルに持ってくる
  ```sh
  git branch <ブランチ名> origin/<ブランチ名>
  ```

- リモートのブランチをローカルに持ってくる & 切り替え
  ```sh
  git checkout -b <ブランチ名> origin/<ブランチ名>
  ```

## ブランチの確認と比較
- 全てのブランチを確認する
  ```sh
  git branch -a
  ```

- ブランチを比較する
  ```sh
  git diff <ブランチ名> <ブランチ名>
  ```

## ブランチのマージとリベース
- ブランチをマージする
  ```sh
  git merge <ブランチ名>
  ```
  
  `fast-forward`の関係であっても必ずマージコミットを作る

  ```sh
  git merge --no-ff <ブランチ名>
  ```

- ブランチをリベースする
  ```sh
  git rebase <ブランチ名>
  ```
  - `merge`: 分岐元のブランチで実行
  - `rebase`: 分岐先のブランチで実行

## 変更点の退避と復元
- 変更点を一旦退避させる
  ```sh
  git stash save
  ```

- 退避した作業の一覧を見る
  ```sh
  git stash list
  ```

- 退避した作業を戻す
  ```sh
  git stash apply <stash名>
  ```

- 退避した作業を消す
  ```sh
  git stash drop <stash名>
  ```

- 退避した作業をすべて消す
  ```sh
  git stash clear
  ```

## ファイルの削除とリネーム
- ファイル削除
  ```sh
  git rm -f <ファイル名>
  ```

- ファイルリネーム
  ```sh
  git mv <元のファイル名> <変えたいファイル名>
  ```

## ファイルの状態の戻し
- ファイルを最新のコミットの状態に戻す
  ```sh
  git checkout HEAD <ファイル名>
  ```

- ファイルを指定コミットまで戻す
  ```sh
  git checkout <コミットのハッシュ値> <ファイル名>
  ```

## .gitignoreの無視とディレクトリの登録
- .gitignore を無視して追加する
  ```sh
  git add -f <ファイル名>
  ```

- ディレクトリだけ登録(.gitkeepをディレクトリに作成する)
  ```sh
  touch <ディレクトリ名>/.gitkeep
  ```
