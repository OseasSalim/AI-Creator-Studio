import { describe, expect, it } from 'vitest';
import { emailSchema, loginSchema, signupSchema } from './validation';

describe('auth validation', () => {
  it('accepts a valid signup', () => expect(signupSchema.safeParse({ fullName: 'Ana Souza', email: 'ana@example.com', password: 'segura123', confirmPassword: 'segura123' }).success).toBe(true));
  it('rejects mismatched passwords', () => expect(signupSchema.safeParse({ fullName: 'Ana Souza', email: 'ana@example.com', password: 'segura123', confirmPassword: 'diferente' }).success).toBe(false));
  it('rejects malformed emails', () => expect(emailSchema.safeParse({ email: 'invalid' }).success).toBe(false));
  it('requires a password on login', () => expect(loginSchema.safeParse({ email: 'ana@example.com', password: '' }).success).toBe(false));
});
