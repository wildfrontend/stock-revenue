import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

import pagePath from '@/constants/global/path';

const MainLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AppBar position="fixed">
        <Toolbar style={{ justifyContent: 'space-between', height: '64px' }}>
          <Link href={pagePath.home}>
            <Typography component="div" variant="h6">
              台股資訊
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        margin="0 auto"
        minHeight="100vh"
        paddingBottom="64px"
        paddingTop="64px"
      >
        {children}
      </Box>
    </>
  );
};

export default MainLayout;
