import type { Socket } from 'socket.io';

export const joinRoom = (
  socket: Socket,
  room: string,
) => {
  socket.join(room);
};

export const leaveRoom = (
  socket: Socket,
  room: string,
) => {
  socket.leave(room);
};

export const emitToRoom = <T>(
  socket: Socket,
  room: string,
  event: string,
  data: T,
) => {
  socket.to(room).emit(event, data);
};