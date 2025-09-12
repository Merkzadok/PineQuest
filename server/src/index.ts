import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import { server } from './graphql/server';

const app = express();
app.use(express.json());

app.use('/graphql', expressMiddleware(server));

app.listen(4000, () => {
  console.log('🚀 GraphQL server running at http://localhost:4000/graphql');
});
