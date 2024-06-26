---
tags: [Markdown]
sidebar_position: 3
---

コードブロック内でMermaidを使用すると、図を記載することができます。  
GitLabやGitHubなどのmarkdownを使用しているサイトで利用できます。

````md title="Example Mermaid diagram"
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## mermaid とは

[mermaid(github)](https://github.com/mermaid-js/mermaid)

mermaid はシーケンス図やガントチャート、フローチャートを、Markdown 形式のテキストで書くことができる。  
詳細については、[公式ドキュメント](https://mermaid-js.github.io/mermaid/#/)が分かりやすいので、そちらを参照。  
Javascript で web 上に描画する事もでき、mermaid の web ページや VSCode のプラグインでエディタ上でプレビューする方法もある。

GitLab 上では下記の markdown をそのまま記載すれば図が作成できる。

## メリット

- テキストで作成することで差分管理ができる。  
  **脱 Excel！**
- テキストエディタの機能が使えるため、一括の修正も用意である。
- javascript にて web 上で動作するため、比較的環境を選ばずできる。

## デメリット

- 普段コードを書かない人には難しい。
- 細部の見た目まで見た目を調整するのは難しい。

## mermaid で主に作成できる図

- フローチャート
- クラス図
- シーケンス図
- 状態遷移図
- ガントチャート
- 円グラフ

などなど

## 図の作成例

### フローチャート

markdown

````
```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```
````

作成される図

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

### クラス図

markdown

````
```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```
````

作成される図

```mermaid
classDiagram
Class01 <|-- AveryLongClass : Cool
Class03 *-- Class04
Class05 o-- Class06
Class07 .. Class08
Class09 --> C2 : Where am i?
Class09 --* C3
Class09 --|> Class07
Class07 : equals()
Class07 : Object[] elementData
Class01 : size()
Class01 : int chimp
Class01 : int gorilla
Class08 <--> C2: Cool label
```

### シーケンス図

````
```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```
````

作成される図

```mermaid
sequenceDiagram
    participant Alice
    participant Bob
    Alice->>John: Hello John, how are you?
    loop Healthcheck
        John->>John: Fight against hypochondria
    end
    Note right of John: Rational thoughts <br/>prevail!
    John-->>Alice: Great!
    John->>Bob: How about you?
    Bob-->>John: Jolly good!
```

### 状態遷移図

markdown

````
```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```
````

作成される図

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

### ガントチャート

markdown

````
```mermaid
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid
excludes weekdays 2014-01-10

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2              :         des4, after des3, 5d
```
````

作成される図

```mermaid
gantt
dateFormat  YYYY-MM-DD
title Adding GANTT diagram to mermaid
excludes weekdays 2014-01-10

section A section
Completed task            :done,    des1, 2014-01-06,2014-01-08
Active task               :active,  des2, 2014-01-09, 3d
Future task               :         des3, after des2, 5d
Future task2              :         des4, after des3, 5d
```

### 円グラフ

markdown

````
```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```
````

作成される図

```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
```

### ユーザージャーニー

markdown

````
```mermaid
  journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 3: Me
```
````

作成される図

```mermaid
  journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 3: Me
```

## mermaid-live-editor

mermaid を web 上で編集プレビューすることも出来る。  
https://mermaid-js.github.io/mermaid-live-editor/

## 記載例

### 方向

| 指定 | 方向     |
| ---- | -------- |
| TB   | 上から下 |
| BT   | 下から上 |
| LR   | 左から右 |
| RL   | 右から左 |

### ノード形状

markdown

````
```mermaid
graph TB
    id1[四角]
    id2((丸))
    id3(角丸四角)
    id4{ひし形}
    id5>リボン]
```
````

作成される図

```mermaid
graph TB
    id1[四角]
    id2((丸))
    id3(角丸四角)
    id4{ひし形}
    id5>リボン]
```

### 線

markdown

````
```mermaid
graph LR
    A-- テキスト -->B
    A-->|テキスト|B
    C-- 実線 ---D
    C---|実線|D
    C-- 実線矢印 -->D
    C-->|実線矢印|D
    E-. 点線 .-F
    E-.-|点線|F
    E-. 点線矢印 .->F
    E-.->|点線矢印|F
    G== 太線 ===H
    G===|太線|H
    G== 太線矢印 ==>H
    G==>|太線矢印|H
```
````

作成される図

```mermaid
graph LR
    A-- テキスト -->B
    A-->|テキスト|B
    C-- 実線 ---D
    C---|実線|D
    C-- 実線矢印 -->D
    C-->|実線矢印|D
    E-. 点線 .-F
    E-.-|点線|F
    E-. 点線矢印 .->F
    E-.->|点線矢印|F
    G== 太線 ===H
    G===|太線|H
    G== 太線矢印 ==>H
    G==>|太線矢印|H
```

### グルーピング

markdown

````
```mermaid
graph TB
    subgraph s1
        s1a --> s1b
    end
    subgraph s2
        s2a --> s2b
        s2a --> s1b
    end
```
````

作成される図

```mermaid
graph TB
    subgraph s1
        s1a --> s1b
    end
    subgraph s2
        s2a --> s2b
        s2a --> s1b
    end
```

markdown

````
```mermaid
graph LR
    subgraph s1
        s1a --> s2a
    end
    subgraph s2
        s2a[s2内にあってほしいノード]
    end

    subgraph s3
        s3a
    end

    subgraph s4
        s4a[s4内にあってほしいノード]
    end
    s3a --> s4a
```
````

作成される図

```mermaid
graph LR
    subgraph s1
        s1a --> s2a
    end
    subgraph s2
        s2a[s2内にあってほしいノード]
    end

    subgraph s3
        s3a
    end

    subgraph s4
        s4a[s4内にあってほしいノード]
    end
    s3a --> s4a
```

### 装飾

markdown

````
```mermaid
graph LR
    customnode --> normal
    style customnode fill:#f00,stroke:#fff,stroke-width:5px,stroke-dasharray:3

    customlink --> normal
    normalA --> normalB

    linkStyle 1 stroke:#ff3,stroke-width:4px,stroke-dasharray: 1
```
````

作成される図

```mermaid
graph LR
    customnode --> normal
    style customnode fill:#f00,stroke:#fff,stroke-width:5px,stroke-dasharray:3

    customlink --> normal
    normalA --> normalB

    linkStyle 1 stroke:#ff3,stroke-width:4px,stroke-dasharray: 1
```
