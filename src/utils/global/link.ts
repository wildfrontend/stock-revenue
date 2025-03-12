import { compile } from 'path-to-regexp';

import pagePath from '@/constants/global/path';

export const generateStockHerf = (stockId: PathParamId) => {
  return compile(pagePath.stockDetail)({
    stockId: `${stockId}`,
  });
};
