import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { connectDB } from './config/db';
import { routers } from './routers';
import passport from 'passport';
import cookieSession from 'cookie-session';
// import passportSetup from './config/passport';
import path from 'path';

const pathdir = path.join(__dirname.replace('/src', '/'), '/upload');
// express app
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// middleware localhost config
app.use(
  cors({
    origin: 'https://localhost:5001',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
  })
);

// cookies session
app.use(
  cookieSession({
    name: 'cookie-session',
    keys: ['cookie-session'],
    maxAge: 3600 * 24 * 60 * 60 * 1000
  })
);

// passport config
app.use(passport.initialize());
app.use(passport.session());

// public routes
app.use('/upload', express.static(pathdir));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// dot env file config
dotenv.config();

// connect mongoodb
connectDB();

// dotenv port connect
const PORT: number | string = process.env.PORT || 5000;

app.use('/api-v1', routers);

app.listen(PORT, (): void => {
  console.log('======== ⚡️ SERVER RUNNING ⚡️ =======');
  console.log(`Express server running on port ${PORT}`);
});
