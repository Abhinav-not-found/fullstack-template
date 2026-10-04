import { createServer } from 'node:http';
import { Server } from 'socket.io';
import type { Express } from 'express';
import registerSocketEvents from './socket.events.js';

const createSocketServer = (app: Express) => {
  const httpServer = createServer(app);

  const io = new Server(httpServer, {
    cors: {
      origin: '*',
    },
  });

  registerSocketEvents(io)

  return httpServer;
};

export default createSocketServer;

