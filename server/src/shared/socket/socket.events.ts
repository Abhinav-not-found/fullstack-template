import type { Server } from 'socket.io';
import logger from '../config/logger.config.js';
import { colorText } from '../utils/color-text.utils.js';

const registerSocketEvents = (io: Server) => {
  io.on('connection', (socket) => {
    logger.info(colorText(`Socket connected: ${socket.id}`, 'yellow'));

    socket.on('disconnect', (reason) => {
      logger.info(colorText(`Socket disconnected: ${socket.id}, ${reason}`, 'yellow'));
    });
  });
};

export default registerSocketEvents;
