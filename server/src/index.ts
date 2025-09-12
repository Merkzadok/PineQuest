import express from 'express';


const app = express();
app.use(express.json());



app.listen(4000, () => {
  console.log('🚀 GraphQL server running at http://localhost:4000/graphql');
});
