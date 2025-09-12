import express from "express";
import cors from "cors";

const app = express();
const PORT = 4001;
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`🚀 GraphQL server running at http://localhost:${PORT}/graphql`);
});
