# prefecture-chart

Resas APIからデータを取得して都道府県別人口推移グラフを表示するアプリ

このアプリケーションはherokuにて公開しています↓

`https://sleepy-plains-15496.herokuapp.com`

# 環境

docker: 20.10.7

docker-compose:  1.29.2

node: 16.13.2

yarn: 1.22.15

npm: 8.1.2

node-sass: 7.0.1

react: 17.0.2

typescript: 4.5.4

axios: 0.25.0

highcharts: 9.3.2

eslint-config-prettier: 8.3.0

# 環境の構築
事前にRESAS-API(`https://opendata.resas-portal.go.jp/`) のページからユーザ登録をし、APIキーを取得

dockerコンテナ立ち上げ
```
$ git clone https://github.com/murata0531/prefecture-chart

$ cd prefecture-chart/

$ make init
```
`app/prefecture-chart`配下に`.env` ファイルが作成されているので　事前に取得したAPIキーを貼り付ける


上記を実行したら `http://localhost:3000` にアクセス

# モジュールをインストールしたくなったら
```
$ docker-compose run --rm node sh -c "cd prefecture-chart && npm install {インストールしたいモジュール}"
```

# prettierでコードを検査する
 違反のチェックだけしたいとき
```
$ make lint-prettier
```
自動修正
```
$ make fix-prettier
```
# ESLintでコーディングルールにしたがっているか検査する
ESLint の実行
```
$ make lint-eslint
```
自動修正
```
$ make fix-eslint
```
