import { config } from 'dotenv';
import { z } from 'zod';
import envConst from '@/shared/constants/env.constant.js';
import { colorText } from '@/shared/utils/color-text.utils.js';

config({ quiet: true });

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(envConst.PORT),
  MONGODB: z.string().trim().min(1, 'MONGODB is required').default(envConst.MONGODB),
  NODE_ENV: z.enum(['development', 'production']),
  JWT_SECRET_ACCESS: z.string().min(1, 'JWT_SECRET_ACCESS is required'),
  JWT_SECRET_REFRESH: z.string().min(1, 'JWT_SECRET_REFRESH is required'),
  CLIENT_URL: z.string().url('CLIENT_URL must be a valid URL'),
  // Optional integration
  IMAGEKIT_PUBLIC_KEY: z.string().trim().optional(),
  IMAGEKIT_PRIVATE_KEY: z.string().trim().optional(),
  IMAGEKIT_URL_ENDPOINT: z.string().trim().optional(),
});

type Env = z.infer<typeof envSchema>;
function reportOptionalIntegrations(env: Env) {
  const imageKitKeys = [
    'IMAGEKIT_PUBLIC_KEY',
    'IMAGEKIT_PRIVATE_KEY',
    'IMAGEKIT_URL_ENDPOINT',
  ] as const;

  const missing = imageKitKeys.filter((key) => !env[key]?.trim());

  if (!missing.length) return;

  console.warn(`\n${colorText('⚠ Optional integrations', 'yellow')}`);
  console.warn(`  ${colorText('ImageKit', 'cyan')} is not configured.`);

  console.warn(`  Missing: ${missing.map((key) => colorText(key, 'cyan')).join(', ')}`);

  console.warn(`  Image upload functionality will be unavailable.`);
  console.warn();
}

function reportDefaults() {
  const defaults = ['PORT', 'MONGODB'];

  const injected = defaults.filter((key) => process.env[key] === undefined);

  if (!injected.length) return;

  console.warn(`\n${colorText('⚠ Environment defaults', 'yellow')}`);

  for (const key of injected) {
    console.warn(`  ${colorText(key, 'cyan')} (injected from constants)`);
  }

  console.warn();
}

function validateEnv() {
  reportDefaults();

  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    console.error(colorText('✖ Environment validation failed', 'white', 'red'));

    console.error('\nMissing or invalid environment variables:\n');

    for (const issue of result.error.issues) {
      console.error(`  ${colorText('✖', 'red')} ${issue.path.join('.')}: ${issue.message}`);
    }

    console.error(`\n${colorText('Server could not start.', 'red')}`);

    process.exit(1);
  }

  reportOptionalIntegrations(result.data);

  return Object.freeze({
    ...result.data,
    IS_PROD: result.data.NODE_ENV === 'production',
  });
}

const env = validateEnv();

export default env;
