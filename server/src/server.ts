import createApp from '@/app.js';
import connectDb from '@/shared/config/db.config.js';
import env from '@/shared/config/env.config.js';
import { colorText } from '@/shared/utils/color-text.utils.js';
// import createSocketServer from './shared/socket/socket.server.js';
import logger from './shared/config/logger.config.js';

async function startServer() {
  try {
    const app = createApp();

    await connectDb();

    // const server = createSocketServer(app);

    app.listen(env.PORT, () => {
      logger.info(colorText(`Server started on port:${env.PORT}`, 'black', 'cyan'));
    });
  } catch (error) {
    logger.error(`Server startup failed: ${error}`);
    process.exit(1);
  }
}
startServer();
