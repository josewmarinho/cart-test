

import { apiCartTest } from '@/shared/services/api';

export const getProductServices = async (id?: string) => {
  try {
    const responseApi = await apiCartTest.get(`products/${id}`);
    console.log('responseApiteste', responseApi.data)

    return responseApi.data;
  } catch (error) {
    console.error('getProductServices, error =>', error)
   
  }
};
