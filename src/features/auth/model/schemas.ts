import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Wrong email'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
});

const registerSchema = z
  .object({
    name: z.string(),
    email: z.email('Invalid email address'),
    password: z
      .string()
      .min(6, 'Password must be at least 6 characters.')
      .regex(/[A-Z]/, 'At least one uppercase letter is required"')
      .regex(/[0-9]/, 'At least one number is required"'),
    confirmPassword: z.string().min(1, 'Repeat password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export { loginSchema, registerSchema };
