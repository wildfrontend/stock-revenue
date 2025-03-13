'use client';

import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import numeral from 'numeral';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useFetchTWMounthRevenue } from '@/apis/stock/api';
import { RevenueItem } from '@/types/apis/stock';
import { generateYoY } from '@/utils/stocks/revenue';

const generateChartData = (mouthRevenue: RevenueItem[]) => {
  return mouthRevenue.map((item) => ({
    ...item,
    revenue_date: `${item.revenue_year}-${item.revenue_month}`,
  }));
};

function simplifyRenvenue(money: number) {
  if (money >= 100000000) {
    // 超過1億
    return (money / 100000000).toFixed(0) + ' 億';
  } else if (money >= 10000000) {
    // 超過1千萬
    return (money / 10000000).toFixed(0) + ' 千萬';
  } else if (money >= 1000000) {
    // 超過1百萬
    return (money / 1000000).toFixed(0) + ' 百萬';
  }
  return numeral(money).format('1,000');
}

const MouthRevenueChart: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  const { data } = useFetchTWMounthRevenue(stockId);

  const chartdata = useMemo(
    () => generateYoY(generateChartData(data?.data ?? [])),
    [data?.data]
  );

  const minRevenue = Math.min(...chartdata.map((d) => d.revenue)) * 0.9; // 讓範圍略小一些
  const maxRevenue = Math.max(...chartdata.map((d) => d.revenue)) * 1.1; // 讓範圍略大一些
  const minYoY = Math.min(...chartdata.map((d) => d.yoy_growth)) - 5; // 年增率最小值 -5 (留點空間)
  const maxYoY = Math.max(...chartdata.map((d) => d?.yoy_growth)) + 5; // 年增率最大值 +5 (留點空間)
  return (
    <Box width="100%" height="500px">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          width={1152}
          height={500}
          data={chartdata}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="revenue_date" />
          <YAxis
            yAxisId="yoy_growth"
            domain={[minYoY, maxYoY]}
            orientation="right"
          />
          <YAxis
            yAxisId="revenue"

            orientation="left"
            tickFormatter={(value) => simplifyRenvenue(value)}
            domain={[minRevenue, maxRevenue]}
          />
          <Tooltip formatter={(value, name) => {
            if (name === '年增率') {
              return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
            }
            if (name === '營收') {
              return numeral(value).format('1,000')
            }
            return undefined
          }} />
          <Legend />
          <Bar yAxisId="revenue" name="營收" dataKey="revenue" fill="#8884d8" />
          <Line yAxisId="yoy_growth" name="年增率" dataKey="yoy_growth" />
        </ComposedChart>
      </ResponsiveContainer>
    </Box>
  );
};
export default MouthRevenueChart;
