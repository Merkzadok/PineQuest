import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { PrismaClient } from "@prisma/client";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";

const prisma = new PrismaClient();

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers: resolvers(prisma),
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({ prisma }),
  });

  console.log(`🚀 Server ready at ${url}`);
}

startServer().catch((err) => {
  console.error(err);
  process.exit(1);
});
