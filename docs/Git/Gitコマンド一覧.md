---
tags: [Git, GitHub, GitLab]
sidebar_position: 4
---

### Setup and Config
- git: メインのGitコマンド。各種サブコマンドを実行するために使います。
- config: Gitの設定を管理します。ユーザー名やメールアドレスの設定などを行います。
  ```sh
  git config --global user.name "Your Name"
  git config --global user.email "your.email@example.com"
  ```

- help: Gitコマンドのヘルプ情報を表示します。
  ```sh
  git help commit
  ```
- bugreport: Gitのバグを報告するためのコマンドです。
- Credential helpers: 認証情報を管理するためのヘルパーです。たとえば、パスワードをキャッシュしたり、キーリングに保存したりします。

### Getting and Creating Projects
- init: 新しいGitリポジトリを作成します。
  ```sh
  git init
  ```
- clone: 既存のリポジトリをクローン（コピー）します。
  ```sh
  git clone https://github.com/user/repo.git
  ```

### Basic Snapshotting
- add: ファイルをインデックスに追加します（次のコミットに含めるため）。
  ```sh
  git add file.txt
  ```
- status: 現在のリポジトリの状態を表示します。
  ```sh
  git status
  ```
- diff: ワーキングディレクトリとインデックス、または他のコミットとの違いを表示します。
  ```sh
  git diff
  ```
- commit: インデックスに追加された変更を新しいコミットとして保存します。
  ```sh
  git commit -m "Commit message"
  ```
- notes: コミットに対する注釈を管理します。
  ```sh
  git notes add -m "This is a note"
  ```
- restore: 作業ツリーのファイルを復元します。
  ```sh
  git restore file.txt
  ```
- reset: インデックスまたは作業ツリーの状態をリセットします。
  ```sh
  git reset HEAD~1
  ```
- rm: リポジトリからファイルを削除します。
  ```sh
  git rm file.txt
  ```
- mv: ファイルをリネームまたは移動します。
  ```sh
  git mv oldname.txt newname.txt
  ```

### Branching and Merging
- branch: ブランチを作成、リスト、削除します。
  ```sh
  git branch
  git branch new-branch
  ```
- checkout: ブランチを切り替えます。または特定のコミットをチェックアウトします。
  ```sh
  git checkout new-branch
  ```
- switch: ブランチを切り替えます（checkoutの代替コマンド）。
  ```sh
  git switch new-branch
  ```
- merge: ブランチをマージします。
  ```sh
  git merge new-branch
  ```
- mergetool: マージの競合を解決するためのツールを起動します。
  ```sh
  git mergetool
  ```
- log: コミットログを表示します。
  ```sh
  git log
  ```
- stash: 作業中の変更を一時的に保存します。
  ```sh
  git stash
  ```
- tag: 特定のコミットにタグを付けます。
  ```sh
  git tag v1.0
  ```
- worktree: 複数の作業ディレクトリを管理します。
  ```sh
  git worktree add ../path/to/new-worktree
  ```

### Sharing and Updating Projects
- fetch: リモートリポジトリから変更を取得しますが、ワーキングツリーには反映しません。
  ```sh
  git fetch origin
  ```
- pull: リモートリポジトリから変更を取得し、ワーキングツリーにマージします。
  ```sh
  git pull origin main
  ```
- push: ローカルの変更をリモートリポジトリに送信します。
  ```sh
  git push origin main
  ```
- remote: リモートリポジトリを管理します。
  ```sh
  git remote add origin https://github.com/user/repo.git
  ```
- submodule: サブモジュールを管理します。サブモジュールは、他のリポジトリを含むリポジトリのことです。
  ```sh
  git submodule add https://github.com/user/submodule-repo.git
  ```

### Inspection and Comparison
- show: オブジェクト（コミット、ツリー、タグなど）を表示します。
  ```sh
  git show
  ```

- log: コミットログを表示します。
  ```sh
  git log
  ```
- diff: 差分を表示します。
  ```sh
  git diff
  ```

- difftool: 外部ツールを使って差分を表示します。
  ```sh
  git difftool
  ```

- range-diff: 2つのコミット範囲の差分を表示します。
  ```sh
  git range-diff
  ```

- shortlog: 簡潔なログを表示します（著者ごとにグループ化）。
  ```sh
  git shortlog
  ```

- describe: コミットに対してもっとも近いタグを示します。
  ```sh
  git describe
  ```

### Patching
- apply: パッチを適用します。
  ```sh
  git apply patch.diff
  ```

- cherry-pick: 特定のコミットを別のブランチに適用します。
  ```sh
  git cherry-pick commit_hash
  ```

- diff: 差分を表示します。
  ```sh
  git diff
  ```

- rebase: ブランチのベースを変更します。
  ```sh
  git rebase main
  ```

- revert: 既存のコミットを元に戻すための新しいコミットを作成します。
  ```sh
  git revert commit_hash
  ```

### Debugging
- bisect: バイナリ検索を使ってバグを特定します。
  ```sh
  git bisect start
  ```

- blame: ファイルの各行が最後に変更されたコミットとその著者を表示します。
  ```sh
  git blame file.txt
  ```

- grep: リポジトリ内のファイルからパターンを検索します。
  ```sh
  git grep "search pattern"
  ```