import { CreateCustomerData } from '../validators/create-customer.schema';
import { apiCartTest } from '@/shared/services/api';

export const createUserServices = async (data: CreateCustomerData) => {

  const sendData = {
    email: data.email,
    username: data.name,
    password: data.password,
    name: {
      firstname: data.name,
      lastname: data.surname
    },
    address:{
      city:'kilcoole',
      street:'7835 new road',
      number:3,
      zipcode:'12926-3874',
      geolocation:{
          lat:'-37.3159',
          long:'81.1496'
      }
  },
   phone: data.phone,
  }


  try {
    const responseApi = await apiCartTest.post('users', sendData);

    return responseApi
  } catch (error) {
    console.error('createUserServices, error =>', error)
   
  }
};
