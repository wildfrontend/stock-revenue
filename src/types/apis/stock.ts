export type StockItem = {
  industry_category: string; // 行業類別
  stock_id: string; // 股票代號
  stock_name: string; // 股票名稱
  type: string; // 股票類型，例如 "twse" 等
  date: string; // 日期，格式如 "YYYY-MM-DD"
};

// 定義 API 回應的型別
export type GetTWStocksResponse = {
  msg: string; // 回應訊息
  status: number; // 回應狀態碼
  data: StockItem[]; // 股票資料陣列
};

export type RevenueItem = {
  date: string; // 日期，格式如 "YYYY-MM-DD"
  stock_id: string; // 股票代號
  country: string; // 國家名稱
  revenue: number; // 收入金額
  revenue_month: number; // 收入月份
  revenue_year: number; // 收入年份
};

export type MouthRevenueItem = RevenueItem & {
  yoy_growth: number;
};

export type GetTWMonthRevenueResponse = {
  msg: string; // 回應訊息
  status: number; // 回應狀態碼
  data: RevenueItem[]; // 收入資料陣列
};
