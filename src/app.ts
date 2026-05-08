import express from "express";
import { routes } from "./controller";
import { config } from "dotenv";
import { dbConnection } from "./config/dbConfig";
import sequelize from './config/dbConfig';
import { insertDefaultUser } from "./config/defaultUser";
import cors from 'cors';

config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

app.use(express.json());
app.use(routes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

(async () => {
  await dbConnection();
  await sequelize.sync({ alter: true });
  await insertDefaultUser()
  console.log('All models synced!');
})();