export type asset = {
  name: string;
  ticker_symbol: string;
  logo_url: string;
};

export type holding_assets = {
  asset: asset;
  asset_amount: number;
  gain_amount: number;
  gain_ratio: number;
  holding_ratio: number;
};

export type Portfolio = {
  holding_assets: holding_assets[];
  total_asset_amount: number;
  total_gain_amount: number;
  total_gain_ratio: number;
};

export type portfolioResponse = {
  holding_assets: holding_assets[]; // array
  total_asset_amount: number;
  total_gain_amount: number;
  total_gain_ratio: number;
};
