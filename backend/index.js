import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import os from 'os';
import session from 'express-session';
import RedisStore from 'connect-redis';
import redisClient from './config/redisClient.js';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import connectDB from './config/db.js';

const app = express();
dotenv.config();
connectDB();
app.use(cors());

const store = new RedisStore({ client: redisClient });

app.use(session({
    store: store,
    secret: 'secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 60000 }
}));

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

const hostname = os.hostname();

app.get('/api/data', (req, res) => {
  res.send(`Data fetched successfully from ${hostname}`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${hostname} at port: ${PORT}`);
});
