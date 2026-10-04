import mongoose from 'mongoose';
import env from './env.config.js';
import { colorText } from '@/shared/utils/color-text.utils.js';
import logger from './logger.config.js';

async function connectDb() {
  try {
    const conn = await mongoose.connect(env.MONGODB);
    logger.info(colorText(`Database connected [name: ${conn.connection.name}]`, 'black', 'green'));
  } catch (error) {
    logger.error(`Error in database connection: ${error}`);
  }
}

export default connectDb;
