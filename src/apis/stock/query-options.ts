import { queryOptions } from '@tanstack/react-query';

import appConfig from '@/constants/global/config';
import {
  GetTWMonthRevenueResponse,
  GetTWStocksResponse,
} from '@/types/apis/stock';
import axios from '@/utils/global/axios';
import dayjs from '@/utils/global/dayjs';

export const twStocksQueryOptions = queryOptions({
  queryKey: ['stocks', 'taiwan'],
  queryFn: async ({ signal }) => {
    const res = await axios.get<GetTWStocksResponse>('/data', {
      signal,
      params: {
        dataset: 'TaiwanStockInfo',
        token: appConfig.finmind.apiToken,
      },
    });
    return res.data;
  },
});

function getStartDate(timeRange: number) {
  const currentDate = dayjs();
  const startDate = currentDate.subtract(timeRange + 1, 'year');
  const minDate = dayjs('2002-02-01');
  if (startDate.isBefore(minDate)) {
    return '2002-02-01';
  }
  return startDate.format('YYYY-MM-DD');
}

export const twStocksMonthRevenueQueryOptions = (
  stockId: PathParamId,
  timeRange: number
) =>
  queryOptions({
    queryKey: [
      'stocks',
      'taiwan',
      'revenue',
      'month',
      stockId ? `${stockId}` : undefined,
      timeRange,
    ],
    queryFn: async ({ signal }) => {
      const res = await axios.get<GetTWMonthRevenueResponse>('/data', {
        signal,
        params: {
          dataset: 'TaiwanStockMonthRevenue',
          data_id: stockId,
          token: appConfig.finmind.apiToken,
          start_date: getStartDate(timeRange),
        },
      });
      return res.data;
    },
    enabled: !!stockId,
  });
