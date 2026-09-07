export type asset = {
  name: string;
  ticker_symbol: string;
  logo_url: string;
};

export type holdingAsset = {
  asset: asset;
  asset_amount: number;
  gain_amount: number;
  gain_ratio: number;
  holding_ratio: number;
};

export type portfolioResponse = {
  hodlingAsset: holdingAsset[]; // array
  total_asset_amount: number;
  total_gain_amount: number;
  total_gain_ratio: number;
};
