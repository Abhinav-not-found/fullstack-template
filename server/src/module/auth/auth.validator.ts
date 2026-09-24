import { z } from 'zod';
import env from '../../shared/config/env.config.js';

class AuthValidator {
  readonly passwordSchema = env.IS_PROD
    ? z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password must not exceed 128 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number')
        .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
    : z
        .string()
        .min(6, 'Password must be at least 6 characters')
        .max(128, 'Password must not exceed 128 characters');

  readonly emailSchema = z
    .string()
    .trim()
    .toLowerCase()
    .email('Please provide a valid email address')
    .max(255, 'Email must not exceed 255 characters');

  readonly registerSchema = z.object({
    name: z
      .string()
      .trim()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must not exceed 50 characters')
      .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),

    email: this.emailSchema,
    password: this.passwordSchema,
  });

  readonly loginSchema = z.object({
    email: this.emailSchema,
    password: this.passwordSchema,
  });
}
export default AuthValidator;
