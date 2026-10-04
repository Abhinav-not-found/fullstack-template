import mongoose from 'mongoose';
import env from './env.config.js';
import { colorText } from '@/shared/utils/color-text.utils.js';
import logger from './logger.config.js';
import { createSpinner } from '@/shared/utils/spinner.utils.js';

async function connectDb() {
  const spinner = createSpinner('Connecting to database...');
  try {
    // const conn = await mongoose.connect(env.MONGODB);
    // logger.info(colorText(`Database connected [name: ${conn.connection.name}]`, 'black', 'green'));

    const conn = await mongoose.connect(env.MONGODB);

    spinner.success(
      colorText(`Database connected [name: ${conn.connection.name}]`, 'black', 'green'),
    );
  } catch (error) {
    spinner.error('Database connection failed');
    logger.error(`Error in database connection: ${error}`);
    throw error
  }
}

export default connectDb;
