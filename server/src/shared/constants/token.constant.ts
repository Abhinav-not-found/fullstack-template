import type { SignOptions } from 'jsonwebtoken';
import env from '../config/env.config.js';

const tokenConst = {
  accessTokenExpireIn: { expiresIn: env.IS_PROD ? '5m' : '5s' } satisfies SignOptions,
  refreshTokenExpireIn: { expiresIn: env.IS_PROD ? '1h' : '1h' } satisfies SignOptions,
};

export default tokenConst;
