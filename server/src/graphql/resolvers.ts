import { prisma } from '../prisma/client';

const withTimeout = <T>(promise: Promise<T>, ms: number) =>
  new Promise<T>((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Request timed out')), ms);
    promise
      .then(res => { clearTimeout(timeout); resolve(res); })
      .catch(err => { clearTimeout(timeout); reject(err); });
  });

export const resolvers = {
  Query: {
    getUser: async (_: any, { id }: { id: string }) =>
      await withTimeout(prisma.user.findUnique({ where: { id } }), 60_000),
    getUsers: async () =>
      await withTimeout(prisma.user.findMany(), 60_000),
    getRoom: async (_: any, { id }: { id: string }) =>
      await withTimeout(prisma.room.findUnique({ where: { id }, include: { players: true } }), 60_000),
    getRooms: async () =>
      await withTimeout(prisma.room.findMany({ include: { players: true } }), 60_000),
    getGame: async (_: any, { id }: { id: string }) =>
      await withTimeout(prisma.game.findUnique({ where: { id }, include: { room: true } }), 60_000),
  },
  Mutation: {
    createUser: async (_: any, { name, email, password }: { name: string; email: string; password: string }) =>
      await withTimeout(prisma.user.create({ data: { name, email, password } }), 60_000),
    createRoom: async (_: any, { name }: { name: string }) =>
      await withTimeout(prisma.room.create({ data: { name } }), 60_000),
    createGame: async (_: any, { roomId }: { roomId: string }) =>
      await withTimeout(prisma.game.create({ data: { roomId, status: "pending" } }), 60_000),
  },
};
