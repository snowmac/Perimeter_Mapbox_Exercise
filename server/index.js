import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'

import resolvers from './src/resolvers'; 
import typeDefs from './src/typedefs';

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: resolvers.Query,
    Mutation: resolvers.Mutation,
  },
});

const { url } = await startStandaloneServer(server, { listen: { port: 4000 } });

console.log(`🚀 Server listening at: ${url}`);
