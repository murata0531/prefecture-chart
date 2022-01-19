import React, {useEffect} from 'react'
import * as Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

// グラフに表示する都道都道府県
interface prefectures {
	prefCode: number,
	prefName: string,
	isSelected: boolean
}

// グラフに表示する人口
interface populations {
	prefCode: number,
	data: Array<data>
}

// 年ごとのデータを表示する
interface data {
	year: number,
	value: number
}

// グラフ表示に使用するパラメータ
interface series {
	type: string,
	name: string,
	data: Array<number>
}