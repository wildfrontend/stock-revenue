# Stock Revenue

本文件說明 **Stock Revenue** 應用程式的設定與使用方式。

## Local Development

要在本地運行範例，請依照以下步驟操作：

### 安裝依賴：

```jsx
npm install
npm run dev
```

### 訪問應用程式：

打開您的瀏覽器，並前往 http://localhost:3000。

### 功能

- 顯示台股列表並能查詢 **股票代碼** 及**股票名稱**
- 因為FinMind API設計問題 我這邊直接將月營收圖表做在表格內
- 部份股票是ETF等非個股類型所以沒有營收資料，故顯示空白