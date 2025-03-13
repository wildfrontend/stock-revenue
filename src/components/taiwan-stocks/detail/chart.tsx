'use client';

import { Box } from '@mui/material';
import numeral from 'numeral';
import { useMemo } from 'react';
import {
  Bar,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { MouthRevenueItem } from '@/types/apis/stock';
import { formatYoyGrowth } from '@/utils/stocks/revenue';

// 🔹 格式化數字顯示（千萬/億）
const simplifyRevenue = (money: number) => {
  if (money >= 1e8) return `${(money / 1e8).toFixed(0)} 億`;
  if (money >= 1e7) return `${(money / 1e7).toFixed(0)} 千萬`;
  if (money >= 1e6) return `${(money / 1e6).toFixed(0)} 百萬`;
  return numeral(money).format('1,000');
};

const simplifyYoY = (yoy: number) => {
  return formatYoyGrowth(yoy);
};

// 🔹 Tooltip 格式化
const formatTooltipValue = (value: number, name: string) => {
  if (name === '年增率') return formatYoyGrowth(value);
  if (name === '營收') return numeral(value).format('1,000');
  return value;
};

const MouthRevenueChart: React.FC<{ mouthRevenue: MouthRevenueItem[] }> = ({
  mouthRevenue,
}) => {
  // 🔹 計算圖表數據
  const chartData = useMemo(
    () =>
      mouthRevenue.map((item) => ({
        ...item,
        revenue_date: `${item.revenue_year}-${item.revenue_month}`,
      })),
    [mouthRevenue]
  );

  // 🔹 計算 Y 軸範圍（營收 & 年增率）
  const revenueValues = chartData.map((d) => d.revenue);
  const yoyValues = chartData.map((d) => d.yoy_growth).filter(Boolean); // 避免 NaN

  const minRevenue = Math.min(...revenueValues) * 0.9;
  const maxRevenue = Math.max(...revenueValues) * 1.1;
  const minYoY = yoyValues.length ? Math.min(...yoyValues) - 5 : 0;
  const maxYoY = yoyValues.length ? Math.max(...yoyValues) + 5 : 10;

  return (
    <Box height="500px" width="100%">
      <ResponsiveContainer height="100%" width="100%">
        <ComposedChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="revenue_date" />
          <YAxis
            domain={[minYoY, maxYoY]}
            orientation="right"
            yAxisId="yoy_growth"
            tickFormatter={simplifyYoY}
          />
          <YAxis
            domain={[minRevenue, maxRevenue]}
            orientation="left"
            tickFormatter={simplifyRevenue}
            yAxisId="revenue"
          />
          <Tooltip formatter={formatTooltipValue} />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" name="營收" yAxisId="revenue" />
          <Line
            dataKey="yoy_growth"
            dot={{ r: 4 }}
            name="年增率"
            stroke="#ff7300" // 🔹 加入顏色讓線條明顯
            yAxisId="yoy_growth"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default MouthRevenueChart;
