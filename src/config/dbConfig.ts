import { Sequelize } from 'sequelize';
import { config } from "dotenv";

config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  host: String(process.env.DB_HOST),
  port: Number(process.env.DB_PORT) || 3306,
  database: String(process.env.DB_NAME),
  username: String(process.env.DB_USER),
  password: String(process.env.DB_PASSWORD),
  logging: true,
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
};

export default sequelize;