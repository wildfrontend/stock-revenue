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
import { useParams } from 'next/navigation';
import numberal from 'numeral';

import { useFetchTWMounthRevenue } from '@/apis/stock/api';

const RevenueTable: React.FC = () => {
  const { stockId } = useParams<{ stockId: string }>();
  const { revenue } = useFetchTWMounthRevenue(stockId);

  return (
    <Paper sx={{ width: '100%' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
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
                  <TableCell>{item.yoy_growth_formatted ?? 'NA'}</TableCell>
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
