import express, { Request, Response } from "express";
import { routes } from "./controller";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});