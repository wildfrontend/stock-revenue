'use client';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  Box,
  CircularProgress,
  Collapse,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import { useFetchTaiwanStocks } from '@/apis/stock/api';
import { StockItem } from '@/types/apis/stock';

import StockDetail from '../detail';

const StockRow: React.FC<{ stock: StockItem }> = ({ stock }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableRow
        sx={{
          '& > *': { borderBottom: 'unset' },
          '&:last-child td, &:last-child th': { border: 0 },
        }}
      >
        <TableCell>
          <IconButton
            aria-label="expand row"
            onClick={() => setOpen(!open)}
            size="small"
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {stock.industry_category}
        </TableCell>
        <TableCell>{stock.stock_id}</TableCell>
        <TableCell>{stock.stock_name}</TableCell>
        <TableCell>{stock.type}</TableCell>
        <TableCell>{stock.date}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBottom: 0, paddingTop: 0 }}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <StockDetail stock={stock} />
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

const rowsPerPage = 10;
const TaiwanStockTable: React.FC = () => {
  const { stocks, isFetching } = useFetchTaiwanStocks();
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState('');

  // 🔹 計算過濾後的資料
  const filteredRows = useMemo(() => {
    if (!search) return stocks;
    const lowerSearch = search.toLowerCase();
    return stocks.filter(
      (stock) =>
        stock.stock_name.toLowerCase().includes(lowerSearch) ||
        stock.stock_id.includes(search)
    );
  }, [stocks, search]);

  useEffect(() => {
    if (page !== 0) {
      setPage(0);
    }
  }, [search, page]);

  return (
    <Paper component={Stack} padding="8px" spacing="16px">
      <TextField
        fullWidth
        label="搜尋股票"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="輸入股票代碼或是股票名稱"
        value={search}
        variant="outlined"
      />
      <TableContainer component={Paper} variant="outlined">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>產業別</TableCell>
              <TableCell>股票代碼</TableCell>
              <TableCell>股票名稱</TableCell>
              <TableCell>市場別</TableCell>
              <TableCell>更新日期</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isFetching ? (
              <TableRow style={{ height: 680 }}>
                <TableCell align="center" colSpan={6}>
                  <CircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              <>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((stock, i) => (
                    <StockRow key={i} stock={stock} />
                  ))}
              </>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                count={filteredRows.length}
                onPageChange={(event, newPage) => {
                  setPage(newPage);
                }}
                page={page}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[rowsPerPage]}
                slotProps={{
                  select: {
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  },
                }}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default TaiwanStockTable;
