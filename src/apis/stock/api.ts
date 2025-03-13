import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { MouthRevenueItem } from '@/types/apis/stock';
import { generateYoY } from '@/utils/stocks/revenue';

import {
  twStocksMonthRevenueQueryOptions,
  twStocksQueryOptions,
} from './query-options';

export const useFetchTaiwanStocks = () => {
  const query = useQuery(twStocksQueryOptions);
  return { ...query, stocks: query.data?.data ?? [] };
};

export const useFetchTWMounthRevenue = (
  stockId: PathParamId,
  timeRange: number
) => {
  const query = useQuery(twStocksMonthRevenueQueryOptions(stockId, timeRange));
  const revenue: MouthRevenueItem[] = useMemo(
    () => generateYoY([...(query.data?.data ?? [])]),
    [query.data]
  );
  return { ...query, revenue };
};
