import { z } from 'zod';
import { unmask } from 'remask';

export const phonePatterns = ['9999-9999', '99999-9999'];

export const createCustomerSchema = z
  .object({
    name: z.string().trim().min(1, 'Nome é obrigatório'),
    surname: z.string().trim().min(1, 'Sobrenome é obrigatório'),
    email: z.string().email({ message: 'E-mail inválido' }),
    identificationNumber: z
      .string({ required_error: 'CPF obrigatório' })
      .trim()
      .min(12, 'CPF é obrigatório')
      .transform((value) => unmask(value)),
    areaCode: z
      .string()
      .trim()
      .length(2, { message: 'DDD deve conter 2 dígitos.' }),
    phone: z
      .string()
      .trim()
      .min(9, 'Telefone é obrigatório')
      .max(10)
      .transform((value) => unmask(value)),
    birthdate: z.string().min(1, 'Data de nascimento é obrigatório').optional(),
    password: z
      .string()
      .min(8, {
        message: 'A senha é obrigatória e precisa de mínimo 8 caracteres',
      })
      .regex(/(?=.*?[A-Z])/, 'É necessário ao menos uma letra maiúscula')
      .regex(/(?=.*?[a-z])/, 'É necessário ao menos uma letra minúscula')
      .regex(/(?=.*?\d)/, 'É necessário pelo menos um número')
      .regex(
        /(?=.*?[!@#$%^&*(),.?":{}|<>])/,
        'É necessário pelo menos um caractere especial',
      ),
    confirmPassword: z.string().min(1, 'A confirmação de senha é obrigatória'),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas precisam ser iguais',
    path: ['confirmPassword'],
  });

export type CreateCustomerData = z.infer<typeof createCustomerSchema>;
