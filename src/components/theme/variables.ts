'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';

const theme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark', // 深色模式
      primary: {
        main: '#1E88E5', // 深藍色 (金融感)
      },
      secondary: {
        main: '#fdd835', // 金色 (強調色)
      },
      success: {
        main: '#00C853', // 綠色 (上漲)
      },
      error: {
        main: '#D32F2F', // 紅色 (下跌)
      },
      background: {
        default: '#121212', // 深灰色背景
        paper: '#1C1C1C', // 卡片背景
      },
      text: {
        primary: '#E0E0E0', // 主要文字顏色
        secondary: '#BDBDBD', // 次要文字顏色
      },
      divider: '#424242', // 分隔線顏色
    },
    typography: {
      fontFamily: "'Inter', 'Roboto', 'Arial', sans-serif", // 現代專業感
      fontSize: 14,
      h1: { fontSize: '2rem', fontWeight: 700 },
      h2: { fontSize: '1.75rem', fontWeight: 700 },
      h3: { fontSize: '1.5rem', fontWeight: 600 },
      button: { textTransform: 'none', fontWeight: 600 },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '10px 20px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundColor: '#1C1C1C',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: ({ ownerState, theme }) => {
            return {
              textDecoration: 'none',
            };
          },
        },
      },
    },
  })
);

export default theme;
