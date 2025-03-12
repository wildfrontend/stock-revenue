import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { formatMouthRevenue, generateYoY } from '@/utils/stocks/revenue';

import {
  twStocksMonthRevenueQueryOptions,
  twStocksQueryOptions,
} from './query-options';

export const useFetchTaiwanStocks = () => {
  const query = useQuery(twStocksQueryOptions);
  return { ...query, stocks: query.data?.data ?? [] };
};

export const useFetchTWMounthRevenue = (stockId: PathParamId) => {
  const query = useQuery(twStocksMonthRevenueQueryOptions(stockId));
  const revenue = useMemo(
    () => generateYoY(formatMouthRevenue([...(query.data?.data ?? [])])),
    [query.data]
  );
  return { ...query, revenue };
};
