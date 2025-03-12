import { Container, Stack } from '@mui/material';
import React from 'react';

import MouthRevenueChart from '@/components/taiwan-stocks/detail/chart';
import RevenueTable from '@/components/taiwan-stocks/detail/table';

const Page = async () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: '32px' }}>
      <Stack spacing="16px">
        <MouthRevenueChart />
        <RevenueTable />
      </Stack>
    </Container>
  );
};

export default Page;
