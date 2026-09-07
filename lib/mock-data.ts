export const mock_data = {
  total_asset_amount: 115500, // 資産総額 (単位: 円, 型: Int, 例: 115,500円)
  total_gain_amount: 15500, // 評価損益額 (単位: 円, 型: Int, 例: 15,500円)
  total_gain_ratio: 15.5, // 評価損益率 (単位: %, 型: Float, 例: 15.5%)
  holding_assets: [
    // 顧客の保有銘柄情報 (型: Array)
    {
      asset: {
        // 銘柄情報
        name: "S&P 500 ETF (Vanguard)", // 銘柄名
        ticker_symbol: "VOO", // ティッカーシンボル
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/VOO.svg", // ロゴURL
      },
      asset_amount: 45969, // 銘柄の保有金額 (単位: 円, 型: Int, 例: 45,969円)
      gain_amount: 5242, // 銘柄の評価損益額 (単位: 円, 型: Int, 例: 5242円)
      gain_ratio: 12.87, // 銘柄の評価損益率 (単位: %, 型: Float, 例: 12.87%)
      holding_ratio: 39.8, // ポートフォリオの保有割合 (単位: %, 型: Float, 例: 39.8%)
    },
    {
      asset: {
        name: "Apple Inc.",
        ticker_symbol: "AAPL",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/AAPL.svg",
      },
      asset_amount: 36310,
      gain_amount: 3120,
      gain_ratio: 9.4,
      holding_ratio: 31.4,
    },
    {
      asset: {
        name: "Alphabet Inc.",
        ticker_symbol: "GOOGL",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/GOOGL.svg",
      },
      asset_amount: 20820,
      gain_amount: -890,
      gain_ratio: -4.1,
      holding_ratio: 18.0,
    },
    {
      asset: {
        name: "Microsoft Corp.",
        ticker_symbol: "MSFT",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/MSFT.svg",
      },
      asset_amount: 29930,
      gain_amount: 2010,
      gain_ratio: 7.2,
      holding_ratio: 25.9,
    },
    {
      asset: {
        name: "Bitcoin ETF",
        ticker_symbol: "BTC",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/BTC.svg",
      },
      asset_amount: 25360,
      gain_amount: -1850,
      gain_ratio: -6.8,
      holding_ratio: 22.0,
    },
  ],
};
