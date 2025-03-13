'use client';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import numberal from 'numeral';
import { useMemo } from 'react';

import { MouthRevenueItem } from '@/types/apis/stock';
import { formatYoyGrowth } from '@/utils/stocks/revenue';

const RevenueTable: React.FC<{ mouthRevenue: MouthRevenueItem[] }> = ({
  mouthRevenue,
}) => {
  const revenue = useMemo(
    () =>
      mouthRevenue.sort((a, b) => {
        if (b.revenue_year !== a.revenue_year) {
          return b.revenue_year - a.revenue_year;
        }
        return b.revenue_month - a.revenue_month;
      }),
    [mouthRevenue]
  );
  return (
    <Paper sx={{ width: '100%' }} variant="outlined">
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table aria-label="sticky table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>年份</TableCell>
              <TableCell>月份</TableCell>
              <TableCell>股票代碼</TableCell>
              <TableCell>國家</TableCell>
              <TableCell>營收</TableCell>
              <TableCell>年增率</TableCell>
              <TableCell>更新日期</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {revenue.map((item, i) => {
              return (
                <TableRow key={i}>
                  <TableCell>{item.revenue_year}</TableCell>
                  <TableCell>{item.revenue_month}</TableCell>
                  <TableCell>{item.stock_id}</TableCell>
                  <TableCell>{item.country}</TableCell>
                  <TableCell>
                    {numberal(item.revenue).format('$1,000')}
                  </TableCell>
                  <TableCell>{formatYoyGrowth(item.yoy_growth)}</TableCell>
                  <TableCell>{item.date}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default RevenueTable;
