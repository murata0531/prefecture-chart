import React, { useState, useEffect } from 'react'
import './App.scss'
import Prefectures from './components/Prefectures'
import Graph from './components/Graph'
import axios from 'axios'

interface prefectures {
  prefCode: number;
  prefName: string;
  isSelected: boolean;
}
interface populations {
  prefCode: number;
  data: Array<data>;
}
interface data {
  year: number;
  value: number;
}
interface compositionUrl {
  prefCode: number;
  url: string;
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
  const prefUrl: string =
    'https://opendata.resas-portal.go.jp/api/v1/prefectures'
  const fetchPrefecture = async () => {
    await axios.get(prefUrl, resasConfig).then((response) => {
      if (response.data.result) {
        const prefList: Array<prefectures> = response.data.result.map(
          (item: prefectures) => {
            return {
              prefCode: item.prefCode,
              prefName: item.prefName,
              isSelected: false
            }
          }
        )
        setPrefectures(prefList)
      }
    })
  }

  // 人口構成を取得
  const fetchCompositions = async (prefectures: Array<prefectures>) => {
    const compositionUrls: Array<compositionUrl> = []
    for (let i = 0; i < prefectures.length; i++) {
      const prefCode = i + 1
      compositionUrls.push({
        prefCode: prefCode,
        url:
          'https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?cityCode=-&prefCode=' +
          prefCode
      })
    }
    const compositions: Array<populations> = []
    for (const compositionUrl of compositionUrls) {
      await axios.get(compositionUrl.url, resasConfig).then((response) => {
        compositions.push({
          prefCode: compositionUrl.prefCode,
          data: response.data.result.data[0].data
        })
      })
    }
    setPopulations(compositions)
  }

  useEffect(() => {
    fetchPrefecture()
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    fetchCompositions(prefectures)
    // eslint-disable-next-line
  }, [prefectures]);

  const ShowGraph = () => {
    const isSelected = prefectures.find(
      (prefecture: prefectures) => prefecture.isSelected
    )
    if (isSelected) {
      return <Graph prefectures={prefectures} populations={populations} />
    }
    return <></>
  }

  const ShowContents = () => {
    if (prefectures.length && populations.length) {
      return (
        <main className="App-main">
          <Prefectures
            prefectures={prefectures}
            setPrefectures={setPrefectures}
          />
          <ShowGraph />
        </main>
      )
    }
    return (
      <main className="App-main-loading">
        <h2>データ取得中...</h2>
      </main>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="App-header-title">都道府県別人口推移</h1>
      </header>
      <ShowContents />
    </div>
  )
}

export default App
