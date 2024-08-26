import { z } from 'zod';

export const loginCustomerSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export type LoginCustomerData = z.infer<typeof loginCustomerSchema>;
