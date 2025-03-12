'use client';

import { Box } from '@mui/material';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { useFetchTWMounthRevenue } from '@/apis/stock/api';
import numeral from 'numeral';

const MouthRevenueChart: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  const { revenue } = useFetchTWMounthRevenue(stockId);
  const chartdata = useMemo(
    () =>
      revenue.map((item) => ({
        ...item,
        revenue_date: `${item.revenue_year}-${item.revenue_month}`,
      })),
    [revenue]
  );
  return (
    <Box width="100%" height="500px">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="revenue" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
export default MouthRevenueChart;
