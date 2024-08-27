

import { apiCartTest } from '@/shared/services/api';

export const getProductServices = async () => {
  try {
    const responseApi = await apiCartTest.get(`products`);
    return responseApi.data;
  } catch (error) {
    console.error('getProductServices, error =>', error)
  }
};
