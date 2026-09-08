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
      asset_amount: 33530, // 銘柄の保有金額 (単位: 円, 型: Int, 例: 33,530円)
      gain_amount: 5242, // 銘柄の評価損益額 (単位: 円, 型: Int, 例: 5242円)
      gain_ratio: 12.87, // 銘柄の評価損益率 (単位: %, 型: Float, 例: 12.87%)
      holding_ratio: 29.03, // ポートフォリオの保有割合 (単位: %, 型: Float, 例: 29.03%)
    },
    {
      asset: {
        name: "Apple Inc.",
        ticker_symbol: "AAPL",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/AAPL.svg",
      },
      asset_amount: 26453,
      gain_amount: 3120,
      gain_ratio: 9.4,
      holding_ratio: 22.9,
    },
    {
      asset: {
        name: "Alphabet Inc.",
        ticker_symbol: "GOOGL",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/GOOGL.svg",
      },
      asset_amount: 15164,
      gain_amount: -890,
      gain_ratio: -4.1,
      holding_ratio: 13.13,
    },
    {
      asset: {
        name: "Microsoft Corp.",
        ticker_symbol: "MSFT",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/MSFT.svg",
      },
      asset_amount: 21819,
      gain_amount: 2010,
      gain_ratio: 7.2,
      holding_ratio: 18.89,
    },
    {
      asset: {
        name: "Bitcoin ETF",
        ticker_symbol: "BTC",
        logo_url:
          "https://storage.googleapis.com/brooklyn-asset-logo/alpaca/BTC.svg",
      },
      asset_amount: 18534,
      gain_amount: -1850,
      gain_ratio: -6.8,
      holding_ratio: 16.05,
    },
  ],
};
