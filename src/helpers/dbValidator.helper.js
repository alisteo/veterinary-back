import { prisma } from '../db/mysql/index.js';

export const isAlreadyRegistered = async (query, collection) => {
  let model;

  const checkInCollection = () => {
    if (model)
      throw new Error(
        `The ${collection}${
          query.includes('@') ? "'s email" : ' username'
        } is already registered!`
      );
  };

  switch (collection) {
    case 'user':
      model = await prisma.user.findFirst({
        where: {
          email: query,
        },
      });
      return checkInCollection();

    case 'username':
      model = await prisma.user.findFirst({
        where: {
          username: query,
        },
      });
      return checkInCollection();

    default:
      throw new Error('Something went wrong!');
  }
};
