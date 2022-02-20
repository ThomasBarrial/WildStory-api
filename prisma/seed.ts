import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const seed = async () => {
  const mediaIcons = [
    {
      name: 'Discord',
      iconUrl: 'https://svgshare.com/i/btZ.svg',
    },
    {
      name: 'Facebook',
      iconUrl: 'https://svgshare.com/i/c4g.svg',
    },
    {
      name: 'Linkedin',
      iconUrl: 'https://svgshare.com/i/c4f.svg',
    },
    {
      name: 'Github',
      iconUrl: 'https://svgshare.com/i/c5s.svg',
    },
  ];

  const skills = [
    {
      name: 'Node',
    },

    {
      name: 'React',
    },

    {
      name: 'Figma/AdobeXD/Scetch',
    },
    {
      name: 'Express',
    },
    {
      name: 'PHP',
    },
    {
      name: 'JavaScript',
    },
    {
      name: 'Java',
    },
    {
      name: 'HTML/CSS',
    },
    {
      name: 'Typescript',
    },
  ];

  const formations = [
    {
      formationName: 'BlockChain',
    },
    {
      formationName: 'Cybersécurité',
    },
    {
      formationName: 'Développement Web',
    },
    {
      formationName: 'Développement Web&Mobile avancée(alternance)',
    },
    {
      formationName: 'Data analyst',
    },
  ];

  const topics = [
    {
      topicsName: '#WildStory',
    },
    {
      topicsName: '#CryptoMonnaie',
    },
    {
      topicsName: '#JobOffer',
    },
    {
      topicsName: '#LeCode',
    },
    {
      topicsName: '#random',
    },
  ];

  const users = [
    {
      username: 'ThomasBarrial',
      profilTitle: 'WildStory Administrator',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('Thomas64', 10),
      city: 'Paris',
      birthDate: '06/10/95',
      role: 'ADMIN',
      avatarUrl:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
      landimageUrl:
        'https://images.unsplash.com/photo-1599725055007-b33b6755ef6f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1329&q=80',
    },
  ];

  // Create media Icons
  await Promise.all(
    mediaIcons.map((m) => {
      return prisma.mediaIcon.create({
        data: {
          name: m.name,
          iconUrl: m.iconUrl,
        },
      });
    })
  );

  // Create Skills
  await Promise.all(
    skills.map((s) => {
      return prisma.skills.create({
        data: {
          name: s.name,
        },
      });
    })
  );

  // Create Formations
  await Promise.all(
    formations.map((f) => {
      return prisma.formation.create({
        data: {
          formationName: f.formationName,
        },
      });
    })
  );

  // Create Topics
  await Promise.all(
    topics.map((t) => {
      return prisma.topics.create({
        data: {
          topicsName: t.topicsName,
        },
      });
    })
  );

  // Create a admin Account
  await Promise.all(
    users.map((u) => {
      return prisma.user.create({
        data: {
          username: u.username,
          profilTitle: u.profilTitle,
          email: u.email,
          password: u.password,
          city: u.city,
          birthDate: u.birthDate,
          avatarUrl: u.avatarUrl,
          landimageUrl: u.landimageUrl,
          idFormation: null,
          role: u.role as Role,
        },
      });
    })
  );
};

seed()
  .catch((e) => {
    // eslint-disable-next-line no-console
    console.error(e); //show back-end error
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
