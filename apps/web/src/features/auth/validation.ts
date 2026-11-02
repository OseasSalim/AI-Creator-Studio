import { z } from 'zod';

export const loginSchema = z.object({ email: z.string().email('Informe um e-mail válido.'), password: z.string().min(1, 'Informe sua senha.') });
export const signupSchema = z.object({ fullName: z.string().trim().min(2, 'Informe seu nome completo.'), email: z.string().email('Informe um e-mail válido.'), password: z.string().min(8, 'A senha deve ter pelo menos 8 caracteres.'), confirmPassword: z.string().min(1, 'Confirme sua senha.') }).refine((data) => data.password === data.confirmPassword, { path: ['confirmPassword'], message: 'As senhas não conferem.' });
export const emailSchema = z.object({ email: z.string().email('Informe um e-mail válido.') });
export type AuthUser = { id: string; email?: string; user_metadata?: { full_name?: string } };
