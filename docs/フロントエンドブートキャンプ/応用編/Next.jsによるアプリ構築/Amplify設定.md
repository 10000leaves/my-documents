---
tags: [フロントエンド]
sidebar_position: 6
---

## デプロイ

### Amplifyコンソール
新しいアプリケーション > ウェブアプリケーションをホストを選択

![image](./Amplify設定/newApplication.png)

### Amplifyホスティングの開始方法
GitLabを選択

![image](./Amplify設定/repository.png)

### アカウント認証
Authorizeを選択

![image](./Amplify設定/authorize.png)

### リポジトリブランチの追加
ホスティングしたいリポジトリとブランチを選択

![image](./Amplify設定/repositoryBranch.png)

### ビルドの設定
アプリケーションの名前で任意のアプリケーション名を指定

![image](./Amplify設定/build.png)

### 確認
問題なければ「保存してデプロイ」を選択

![image](./Amplify設定/deploy.png)

## デプロイ後の初期設定

### ビルドイメージ
構築イメージをデフォルトから任意のイメージに変更

![image](./Amplify設定/buildImage.png)

![image](./Amplify設定/buildImageEdit.png)

### プレビュー
「プレビューを有効化」をクリックして、プレビューステータスを有効にする

![image](./Amplify設定/preview.png)

![image](./Amplify設定/previewEdit.png)

### 環境変数
APIのURIやキー等を設定する  
※`_CUSTOM_IMAGE`や`_LIVE_UPDATES`は、自動設定

![image](./Amplify設定/env.png)

### アクセスコントロール
アクセスを制限する場合は設定する

![image](./Amplify設定/accessControl.png)
