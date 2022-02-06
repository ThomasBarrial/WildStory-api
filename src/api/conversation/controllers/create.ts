// import { User } from '@prisma/client';
// import { Socket } from 'socket.io';
// import { DefaultEventsMap } from 'socket.io/dist/typed-events';
// import { prisma } from '../../../../prisma/prismaClient';

// const createConversation = async ({
//   roomName,
//   user,
//   socket,
// }: {
//   roomName: string;
//   user: User;
//   socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>;
// }): Promise<void> => {
//   const users = roomName.split('_');

//   try {
//     const foundedRoom = await prisma.conversation.findUnique({
//       where: {
//         name: roomName,
//       },
//       select: {
//         id: true,
//         name: true,
//         members: true,
//         message: true,
//         socketId: true,
//       },
//     });

//     if (!foundedRoom) {
//       const room = await prisma.conversation.create({
//         data: {
//           name: roomName,
//           socketId: socket.id,
//           members: {
//             connect: [{ id: users[0] }, { id: users[1] }],
//           },
//         },
//         select: {
//           id: true,
//           name: true,
//           members: true,
//           message: true,
//           socketId: true,
//         },
//       });

//       socket.emit('message', { message: 'test', users: user.username });
//       socket.broadcast
//         .to(room.name)
//         .emit('message', { message: `${user.username} as joined` });
//     }
//   } catch (error) {
//     return console.log(error);
//   }
// };

// export default createConversation;
