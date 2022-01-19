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

const App = () => {
  const [prefectures, setPrefectures] = useState<Array<prefectures>>([])
	const [populations, setPopulations] = useState<Array<populations>>([])
	const resasConfig = {
		headers: {
			'Content-Type': 'application/json',
			'x-api-key': process.env.REACT_APP_RESAS_API_KEY || ''
		}
	}

  // 都道府県コード、都道府県名を取得
  const prefUrl: string = 'https://opendata.resas-portal.go.jp/api/v1/prefectures'
	const fetchPrefecture = async () => {
		await axios.get(prefUrl, resasConfig).then(response => {
			if(response.data.result) {
				const prefList: Array<prefectures> = response.data.result.map((item: prefectures) => {
					return {
						prefCode: item.prefCode,
						prefName: item.prefName,
						isSelected: false
					}
				})
				setPrefectures(prefList)
			}
		})
	}
}

export default App;
