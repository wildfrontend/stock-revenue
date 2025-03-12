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

export const twStocksMonthRevenueQueryOptions = (stockId: PathParamId) =>
  queryOptions({
    queryKey: [
      'stocks',
      'taiwan',
      'revenue',
      'month',
      stockId ? `${stockId}` : undefined,
    ],
    queryFn: async ({ signal }) => {
      const res = await axios.get<GetTWMonthRevenueResponse>('/data', {
        signal,
        params: {
          dataset: 'TaiwanStockMonthRevenue',
          data_id: stockId,
          token: appConfig.finmind.apiToken,
          start_date: dayjs().subtract(6, 'year').format('YYYY-MM-DD'),
        },
      });
      return res.data;
    },
    enabled: !!stockId,
  });
