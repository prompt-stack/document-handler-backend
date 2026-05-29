import express from "express";
import { routes } from "./controller";
import { config } from "dotenv";
import { insertDefaultUser } from "./config/defaultUser";
import cors from 'cors';
import session from "express-session";
import cookieParser from 'cookie-parser';
import sequelize, { dbConnection } from "./config/dbConfig";


config();

declare module "express-session" {
  interface SessionData {
    userInfo: {
      id: string;
      email: string;
    };
    state?: string;
    nonce?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      isAuthenticated?: boolean;
    }
  }
}

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT || 8081;
app.set('view engine', 'ejs');
app.use(express.json());
app.use(
    session({
        secret: "super-secret-key",
        resave: false,
        saveUninitialized: false,

        cookie: {
            secure: false, // true only with HTTPS
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        },
    })
);
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api', routes);

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: false
}));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

(async () => {
  await dbConnection();
  await sequelize.sync({ alter: false });
  // await insertDefaultUser()
  console.log('All models synced!');
})();