import { parseISO } from 'date-fns';
import { z } from 'zod';

export const customerSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  identificationNumber: z.string().nullish(),
  areaCode: z.string(),
  phone: z.string(),
  birthdate: z.string().transform((value) => parseISO(value)),
  externalId: z.string(),
  id: z.string(),
  isVerified: z.boolean(),
  isActive: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  userId: z.string(),
  contentCreator: z
    .object({
      id: z.string(),
      userId: z.string(),
      creatorProfileId: z.string().nullish(),
      profile: z.string(),
      marketplaceUrl: z.string(),
      logo: z.string(),
      createdAt: z.string(),
      updatedAt: z.string(),
    })
    .nullish(),
});

export type Customer = z.infer<typeof customerSchema>;
