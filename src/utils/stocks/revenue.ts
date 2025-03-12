import { RevenueItem } from '@/types/apis/stock';

// 照日期從新到舊排序，新增月營收年增率
export const formatMouthRevenue = (mouthRevenue: RevenueItem[]) => {
  return mouthRevenue.sort((a, b) => {
    if (b.revenue_year !== a.revenue_year) {
      return b.revenue_year - a.revenue_year;
    }
    return b.revenue_month - a.revenue_month;
  });
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

    let yoyGrowth: number | null = null;
    let yoyGrowthFormatted: string | null = null;

    if (prevRevenue) {
      yoyGrowth = ((item.revenue - prevRevenue) / prevRevenue) * 100;
      yoyGrowthFormatted = `${yoyGrowth > 0 ? '+' : ''}${yoyGrowth.toFixed(2)}%`; // 保留兩位小數
    }
    return {
      ...item,
      yoy_growth: yoyGrowth?.toFixed(2), // 原始數值 (可能為負)
      yoy_growth_formatted: yoyGrowthFormatted, // 格式化為 "+x.xx%" or "-x.xx%"
    };
  });
  return updatedData;
};
