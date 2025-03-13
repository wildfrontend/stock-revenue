import {
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useMemo, useState } from 'react';

import { useFetchTWMounthRevenue } from '@/apis/stock/api';
import { StockItem } from '@/types/apis/stock';
import dayjs from '@/utils/global/dayjs';

import MouthRevenueChart from './chart';
import RevenueTable from './table';

const SotckDetail: React.FC<{ stock: StockItem }> = ({ stock }) => {
  const [timeRange, setTimeRange] = useState(5);
  const { revenue, isFetching, error } = useFetchTWMounthRevenue(
    stock.stock_id,
    timeRange
  );

  const mouthRevenue = useMemo(
    () =>
      revenue.filter((item) => {
        return dayjs(
          `${item.revenue_year}-${item.revenue_month < 10 ? `0${item.revenue_month}` : item.revenue_month}-01`
        ).isAfter(dayjs().subtract(timeRange, 'year'));
      }),
    [revenue, timeRange]
  );

  if (isFetching) {
    return (
      <Stack
        alignItems="center"
        height="120px"
        justifyContent="center"
        width="100$"
      >
        <CircularProgress />
      </Stack>
    );
  }
  if ((revenue.length ?? 0) === 0 || error) {
    return (
      <Stack
        alignItems="center"
        height="120px"
        justifyContent="center"
        width="100$"
      >
        <Typography color="error">沒有資料</Typography>
      </Stack>
    );
  }
  return (
    <Stack spacing="16px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          sx={{ float: 'left' }}
          component="div"
          gutterBottom
          variant="h6"
        >
          {stock.stock_name}-{stock.stock_id} 月營收
        </Typography>
        <FormControl sx={{ float: 'right' }}>
          <InputLabel id="date-select-label">時間範圍</InputLabel>
          <Select
            size="small"
            labelId="date-select-label"
            id="demo-simple-select"
            value={timeRange}
            label="Age"
            onChange={(e) => {
              setTimeRange(e.target.value as number);
            }}
          >
            <MenuItem value={5}>近5年</MenuItem>
            <MenuItem value={10}>近10年</MenuItem>
            <MenuItem value={20}>近20年</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <MouthRevenueChart mouthRevenue={mouthRevenue} />
      <RevenueTable mouthRevenue={mouthRevenue} />
    </Stack>
  );
};

export default SotckDetail;
