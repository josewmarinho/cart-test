

import { apiCartTest } from '@/shared/services/api';
import { LoginCustomerData } from '../validators/login-customer.schema';

export const loginCustomerServices = async ({
  username,
  password,
}: LoginCustomerData) => {
  try {
    const data = {
      username,
      password,
    };
    const responseApi = await apiCartTest.post('/auth/login', data);

    return responseApi
  } catch (error) {
    console.error('loginCustomerServices, error =>', error)
   
  }
};
