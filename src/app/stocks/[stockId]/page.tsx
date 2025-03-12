import RevenueTable from '@/components/taiwan-stocks/detail/table';
import { Container } from '@mui/material';
import React from 'react';


const Page = async () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: '32px' }}>
      <RevenueTable />
    </Container>
  );
};

export default Page;
