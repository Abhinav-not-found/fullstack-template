import pino from 'pino';
import env from './env.config.js';

const logger = pino({
  level: env.IS_PROD ? 'info' : 'debug',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  },
  timestamp: env.IS_PROD,
});

export default logger;
