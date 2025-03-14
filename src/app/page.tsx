import { Container } from '@mui/material';
import React from 'react';

import TaiwanStockTable from '@/components/taiwan-stocks/table';

const Page = async () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: '32px' }}>
      <TaiwanStockTable />
    </Container>
  );
};

export default Page;
