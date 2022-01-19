import React, { useState, useEffect } from 'react'
import './App.css'
import Prefectures from './Prefectures'
import axios from 'axios'

// 都道府県のコードと名前を定義
interface prefectures {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}

// 都道府県ごとの人口を定義
interface populations {
	prefCode: number,
	data: Array<data>,
}

// 年度ごとの値を定義
interface data {
	year: number,
	value: number
}

// APIにアクセスするURL
interface compositionUrl {
	prefCode: number,
	url: string
}
function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
