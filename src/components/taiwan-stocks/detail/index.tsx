import { CircularProgress, Stack, Typography } from '@mui/material';

import { useFetchTWMounthRevenue } from '@/apis/stock/api';
import { StockItem } from '@/types/apis/stock';

import MouthRevenueChart from './chart';
import RevenueTable from './table';

const SotckDetail: React.FC<{ stock: StockItem }> = ({ stock }) => {
  const { revenue, isFetching, error } = useFetchTWMounthRevenue(
    stock.stock_id
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
      <Typography component="div" gutterBottom variant="h6">
        {stock.stock_name}-{stock.stock_id} 月營收
      </Typography>
      <MouthRevenueChart mouthRevenue={revenue} />
      <RevenueTable mouthRevenue={revenue} />
    </Stack>
  );
};

export default SotckDetail;
