

import { apiCartTest } from '@/shared/services/api';

export const getCategorisServices = async (name?: string) => {
  try {
    const responseApi = await apiCartTest.get(`products/${name}`);

    console.log('responseApiteste', responseApi)
    return responseApi.data;
  } catch (error) {
    console.error('getCategorisServices, error =>', error)
   
  }
};
