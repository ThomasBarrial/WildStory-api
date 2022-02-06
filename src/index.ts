import dotenv from 'dotenv';
import app from './app';
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';

// import createConversation from './api/conversation/controllers/create';
const io = new Server(server, {
  serveClient: false,
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false,
  cors: {
    credentials: true,
    origin: '*',
  },
});

dotenv.config();

const port = process.env.PORT || 5000;

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
  console.log('a user connected');
  // take userId and socketId from user
  socket.on('addUser', (userId) => {
    addUser(userId, socket.id);
    io.emit('getUsers', users);
  });

  // send and get message
  socket.on('sendMessage', ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user?.socketId as string).emit('getMessage', {
      senderId,
      text,
    });
  });

  // when disconnect
  socket.on('disconnect', () => {
    console.log('a user disconnect');
    removeUser(socket.id);
    io.emit('getUsers', users);
  });

  // socket.on('join', ({ roomName, user }) => {
  //   createConversation({ roomName, user, socket });
  // });
  // socket.on('sendMessage', ({ senderId, receiverId }) => {
  //   sendMessage(senderId, recevierId);
  // });
});

server.listen(port, async () => {
  // eslint-disable-next-line no-console
  console.log(`Listening: on port ${5000}`);
});
