import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    FINMIND_API_TOKEN:
      'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRlIjoiMjAyNS0wMy0xMiAxNzowNzo0MiIsInVzZXJfaWQiOiJ0ZXN0X3N0YXJrLXRlY2hfMjAyNTAzMDciLCJpcCI6IjEyNS4yMzAuMjExLjEyOCJ9.mIXrJk-7sq9WNVmrTKqTrM-uGJC6Cs4ElLiS2WWsatE',
  },
  logging: {
    fetches: {
      fullUrl: true,
      hmrRefreshes: true,
    },
  },
};

module.exports = nextConfig;
