import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const apiClient = axios.create({
  baseURL,
});

// 发票解析 API (使用 FormData)
export const analyzeInvoice = async (formData: FormData) => {
  const { data } = await apiClient.post('/invoice/analyze', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return data;
};

// 获取账簿历史 API
export const getLedger = async () => {
  const { data } = await apiClient.get('/ledger');
  return data;
};

// 删除账簿记录 API
export const deleteLedgerItem = async (id: number) => {
  const { data } = await apiClient.delete(`/ledger/${id}`);
  return data;
};

// 获取老板经营报告 API
export const getCEOReport = async () => {
  const { data } = await apiClient.get('/analytics/mock-ceo-report');
  return data;
};
