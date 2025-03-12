import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';
import React from 'react';

import MainLayout from '@/components/layouts/main';
import ReactQueryProvider from '@/components/react-query/provider';
import MuiThemeProvider from '@/components/theme';

export const metadata: Metadata = {
  title: {
    template: '台灣股市資訊 - %s',
    default: '台灣股市資訊 - 探索台灣股票與投資的世界',
  },
  description:
    '發現深入的台灣股市數據、公司表現、趨勢與專家分析，幫助您做出明智的投資決策。',
};

const RootLayout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <html suppressHydrationWarning>
      <body>
        <ReactQueryProvider>
          <AppRouterCacheProvider>
            <MuiThemeProvider>
              <MainLayout>{children}</MainLayout>
            </MuiThemeProvider>
          </AppRouterCacheProvider>
        </ReactQueryProvider>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
