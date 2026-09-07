type asset = {
  name: string;
  ticker_symbol: string;
  logo_url: string;
};

type holdingAsset = {
  asset: asset;
  asset_amount: number;
  gain_amount: number;
  gain_ratio: number;
  holding_ratio: number;
};

type portfolioResponse = {
  hodlingAsset: holdingAsset[]; // array
  total_asset_amount: number;
  total_gain_amount: number;
  total_gain_ratio: number;
};
