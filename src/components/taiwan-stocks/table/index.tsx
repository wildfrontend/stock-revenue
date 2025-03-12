'use client';

import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useMemo, useState } from 'react';

import { useFetchTaiwanStocks } from '@/apis/stock/api';
import { StockItem } from '@/types/apis/stock';
import { generateStockHerf } from '@/utils/global/link';

const columns: GridColDef<StockItem>[] = [
  {
    field: 'id',
    headerName: 'ID',
    headerAlign: 'center',
    align: 'center',
    width: 90,
  },
  {
    field: 'industry_category',
    headerName: '產業別',
    minWidth: 200,
  },
  {
    field: 'stock_id',
    minWidth: 240,
    headerName: '股票代碼',
    renderCell: (params) => {
      return (
        <Typography component={Link} href={generateStockHerf(params.value)}>
          {params.value}
        </Typography>
      );
    },
  },
  {
    field: 'stock_name',
    headerName: '股票名稱',
    flex: 1,
  },
  {
    field: 'type',
    headerName: '市場別',
  },
  {
    field: 'date',
    headerName: '更新日期',
  },
];
const TaiwanStockTable: React.FC = () => {
  const { stocks, isFetching } = useFetchTaiwanStocks();
  return (
    <Paper>
      <DataGrid
        loading={isFetching}
        rows={stocks.map((item, i) => ({ id: i + 1, ...item }))}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[10, 20]}
      />
    </Paper>
  );
};

export default TaiwanStockTable;
