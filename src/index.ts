import dotenv from 'dotenv';
import app from './app';
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import createAdmin from './middleware/CreateAdmin';

// import createConversation from './api/conversation/controllers/create';
const io = new Server(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: true,
  cors: {
    credentials: true,
    origin: '*',
  },
});

dotenv.config();

const port = process.env.PORT || 5000;

createAdmin();

let users = [] as { userId: string; socketId: string }[];

const addUser = (userId: string, socketId: string) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId: string) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId: string) => {
  return users.find((user) => user.userId === userId);
};

io.on('connection', (socket) => {
  //when connect
  // take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // send new conversation
  socket.on('createConversation', ({ receiverId }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId as string).emit('getConversation');
  });

  // send and get message
  socket.on('sendMessage', ({ receiverId, text, senderId, conversationId }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId as string).emit('getMessage', {
      text,
      senderId,
      conversationId,
    });
  });

  // when disconnect
  socket.on('disconnect', () => {
    removeUser(socket.id);
    io.emit('getUsers', users);
  });
});

server.listen(port, async () => {
  // eslint-disable-next-line no-console
  async () => {
    // eslint-disable-next-line no-console
    console.log(`Listening: http://localhost:${port}`);
  };
});
