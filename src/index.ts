import dotenv from 'dotenv';
import app from './app';
import http from 'http';
const server = http.createServer(app);
import { Server } from 'socket.io';
import { prisma } from '../prisma/prismaClient';
import bcrypt from 'bcrypt';

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

    const user = await prisma.user.findUnique({
      where: {
        email: process.env.USER_EMAIL,
      },
    });

    if (!user) {
      await prisma.user.create({
        data: {
          username: process.env.USER_USERNAME as string,
          profilTitle: process.env.USER_PROFILTITLE as string,
          email: process.env.USER_EMAIL as string,
          password: bcrypt.hashSync(process.env.USER_PASSWORD as string, 10),
          city: process.env.USER_CITY,
          birthDate: process.env.USER_BIRTHDATE as string,
          role: 'ADMIN',
          avatarUrl: process.env.USER_AVATAR_URL,
          landimageUrl: process.env.USER_LANDING_URL,
          idFormation: '',
        },
      });

      // eslint-disable-next-line no-console
      console.log(`Created new user with email ${process.env.USER_EMAIL}`);
    }
  };
});
