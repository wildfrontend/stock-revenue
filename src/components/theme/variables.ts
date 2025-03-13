'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light', // 使用明亮模式
      primary: {
        main: '#720e9e', // Yahoo Finance 的藍色
      },
      secondary: {
        main: '#f5f5f5', // 淺灰色
      },
      success: {
        main: '#14b12c', // 上漲綠色 (Yahoo Finance 色調)
      },
      error: {
        main: '#e02424', // 下跌紅色 (Yahoo Finance 色調)
      },
      background: {
        default: '#f9f9f9', // 淺灰色背景
        paper: '#fff', // 卡片背景
      },
      text: {
        primary: '#333333', // 主要文字顏色 (深灰色)
        secondary: '#666666', // 次要文字顏色 (灰色)
      },
      divider: '#e0e0e0', // 分隔線顏色
    },
  })
);

export default theme;
