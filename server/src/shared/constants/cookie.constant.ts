import type { CookieOptions } from 'express';
import env from '../config/env.config.js';

const cookie: {
  accessTokenOpts: CookieOptions;
  refreshTokenOpts: CookieOptions;
} = {
  accessTokenOpts: {
    httpOnly: true,
    secure: env.IS_PROD,
    sameSite: 'strict',
    maxAge: env.IS_PROD ? 1000 * 60 * 5 : 1000 * 5,
  },
  refreshTokenOpts: {
    httpOnly: true,
    secure: env.IS_PROD,
    sameSite: 'strict',
    maxAge: env.IS_PROD ? 1000 * 60 * 60 * 24 : 1000 * 60 * 60,
  },
};

export default cookie;
