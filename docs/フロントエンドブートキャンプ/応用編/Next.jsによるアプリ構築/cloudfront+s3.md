---
tags: [フロントエンド]
sidebar_position: 9
---

Amplify CLIのインストール

```
npm install @aws-amplify/cli
```

Amplify CLIの設定

```
npx amplify configure
```

```
Follow these steps to set up access to your AWS account:

Sign in to your AWS administrator account:
https://console.aws.amazon.com/
Press Enter to continue
Unable to open https://console.aws.amazon.com/: spawn xdg-open ENOENT
Have you installed `xdg-utils` on your machine?

Specify the AWS Region
? region:  ap-northeast-1
Follow the instructions at
https://docs.amplify.aws/cli/start/install/#configure-the-amplify-cli

to complete the user creation in the AWS console
https://console.aws.amazon.com/iamv2/home#/users/create
Press Enter to continue
Unable to open https://docs.amplify.aws/cli/start/install/#configure-the-amplify-cli: spawn xdg-open ENOENT
Have you installed `xdg-utils` on your machine?
Unable to open https://console.aws.amazon.com/iamv2/home#/users/create: spawn xdg-open ENOENT
Have you installed `xdg-utils` on your machine?

Enter the access key of the newly created user:
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
This would update/create the AWS Profile in your local machine
? Profile Name:  ir-search

Successfully set up the new user.
```


```
npx amplify init
```


```
Note: It is recommended to run this command from the root of your app directory
? Enter a name for the project irSearch
The following configuration will be applied:

Project information
| Name: irSearch
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm run-script build
| Start Command: npm run-script start

? Initialize the project with the above configuration? Yes
Using default provider  awscloudformation
? Select the authentication method you want to use: AWS access keys
? accessKeyId:  ********************
? secretAccessKey:  ****************************************
? region:  ap-northeast-1
Adding backend environment dev to AWS Amplify app: d39i1nb8m5780d

Deployment completed.
Deployed root stack irSearch [ ======================================== ] 4/4
        amplify-irsearch-dev-82839     AWS::CloudFormation::Stack     CREATE_COMPLETE                Wed Feb 14 2024 08:29:17…     
        UnauthRole                     AWS::IAM::Role                 CREATE_COMPLETE                Wed Feb 14 2024 08:29:03…     
        AuthRole                       AWS::IAM::Role                 CREATE_COMPLETE                Wed Feb 14 2024 08:29:03…     
        DeploymentBucket               AWS::S3::Bucket                CREATE_COMPLETE                Wed Feb 14 2024 08:29:14…     

✔ Help improve Amplify CLI by sharing non-sensitive project configurations on failures (y/N) · yes

    Thank you for helping us improve Amplify CLI!
Deployment state saved successfully.
✔ Initialized provider successfully.
✅ Initialized your environment successfully.
✅ Your project has been successfully initialized and connected to the cloud!
Some next steps:

"amplify status" will show you what you've added already and if it's locally configured or deployed
"amplify add <category>" will allow you to add features like user login or a backend API
"amplify push" will build all your local backend resources and provision it in the cloud
"amplify console" to open the Amplify Console and view your project status
"amplify publish" will build all your local backend and frontend resources (if you have hosting category added) and provision it in the cloud


Pro tip:
Try "amplify add api" to create a backend API and then "amplify push" to deploy everything

```

```
npx amplify add hosting
```

```
✔ Select the plugin module to execute · Amazon CloudFront and S3
✔ hosting bucket name · irearch-20240214083101-hostingbucket
Static webhosting is disabled for the hosting bucket when CloudFront Distribution is enabled.

You can now publish your app using the following command:
Command: amplify publish
```

このまま`publish`すると以下のようなエラーになる。  
`default`のビルド先は`build`のようなので、`.next"`に修正する。  

```
Publish started for S3AndCloudFront

Cannot find the distribution folder.
Distribution folder is currently set as:
  /home/ec2-user/environment/frontend/build

🛑 Cannot find the distribution folder.

Resolution: Please report this issue at https://github.com/aws-amplify/amplify-cli/issues and include the project identifier from: 'amplify diagnose --send-report'
Learn more at: https://docs.amplify.aws/cli/project/troubleshooting/
```

対象は以下のファイルで、`DistributionDir`を修正する。

```json title="frontend/amplify/.config/project-config.json"
{
  "projectName": "irSearch",
  "version": "3.1",
  "frontend": "javascript",
  "javascript": {
    "framework": "react",
    "config": {
      "SourceDir": "src",
      "DistributionDir": ".next",
      "BuildCommand": "npm run-script build",
      "StartCommand": "npm run-script start"
    }
  },
  "providers": ["awscloudformation"]
}
```

これで公開できるはず。

```
npx amplify publish
```
