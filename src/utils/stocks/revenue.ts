import { RevenueItem } from '@/types/apis/stock';

export const formatYoyGrowth = (value: number) => {
  if (isNaN(value)) return 'NA';
  return (
    new Intl.NumberFormat('en-US', {
      signDisplay: 'exceptZero', // 🔹 只有正數才加 "+", 負數正常顯示
      maximumFractionDigits: 2, // 🔹 兩位小數
    }).format(value) + '%'
  );
};
const convertYOY = (curRevenue: number, prevRevenue: number) => {
  return ((curRevenue - prevRevenue) / prevRevenue) * 100;
};

export const generateYoY = (mouthRevenue: RevenueItem[]) => {
  const revenueMap = new Map<string, number>();
  mouthRevenue.forEach((item) => {
    const key = `${item.revenue_year}-${item.revenue_month}`; // 取去年同月份 Key
    revenueMap.set(key, item.revenue);
  });

  const updatedData = mouthRevenue.map((item) => {
    const prevYearKey = `${item.revenue_year - 1}-${item.revenue_month}`;
    const prevRevenue = revenueMap.get(prevYearKey);
    const yoyGrowth: number = prevRevenue
      ? convertYOY(item.revenue, prevRevenue)
      : NaN;
    return {
      ...item,
      yoy_growth: yoyGrowth, // 原始數值 (可能為負)
    };
  });
  return updatedData;
};
