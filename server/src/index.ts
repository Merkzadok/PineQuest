import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 4001;

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
