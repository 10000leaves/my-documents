---
tags: [フロントエンド]
sidebar_position: 4
---

状態管理のためのフックで、`useState` と似たような機能です。`useState`は`useReducer`に内部実装されています。

`(state, action) => newState` という型の`reducer` を受け取り、現在の`state`と`dispatch`関数の両方を返します。

```js
const [state, dispatch] = useReducer(reducer,'初期値')
```

`reducer`は`state`を更新するための関数で、`dispatch`は、`reducer`を実行するための呼び出し関数です。 （変数を宣言するときに、stateの更新方法をあらかじめ設定しておくことが出来ます。）

## dispatch(action)で実行
- `action`は何をするのかを示すオブジェクト　
- `{type: increment, payload: 0}`のように、`type`プロパティ（`action`の識別子）と値のプロパティで構成されている。

## useReducer()を使用したカウンター
```js
//useReducerをimport
import React, {useReducer} from 'react'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

//counterの初期値を0に設定
const initialState = 0
//reducer関数を作成
//countStateとactionを渡して、新しいcountStateを返すように実装する
const reducerFunc = (countState, action)=> {
//reducer関数にincrement、increment、reset処理を書く
//どの処理を渡すかはactionを渡すことによって判断する
  switch (action){
    case 'increment':
      return countState + 1
    case 'decrement':
      return countState - 1
    case 'reset':
      return initialState
    default:
      return countState
  }
}
const Counter = () => {
//作成したreducerFunc関数とcountStateをuseReducerに渡す
//useReducerはcountStateとdispatchをペアで返すので、それぞれを分割代入
  const [count, dispatch] = useReducer(reducerFunc, initialState)
//カウント数とそれぞれのactionを実行する<Button/>を設置する
  return (
    <>
      <h2>カウント：{count}</h2>
      <ButtonGroup color="primary" aria-label="outlined primary button group">
        <Button onClick={()=>dispatch('increment')}>increment</Button>
        <Button onClick={()=>dispatch('decrement')}>decrement</Button>
        <Button onClick={()=>dispatch('reset')}>reset</Button>
      </ButtonGroup>
    </>
  )
}

export default Counter
```