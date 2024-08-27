import { HttpResponse, http } from 'msw';

import { productsMock } from './data';

export const homeMockApi = [
  http.get('http://localhost:3000/products', () => {
    return HttpResponse.json(productsMock);
  }),
];
