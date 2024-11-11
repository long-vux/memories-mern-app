import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import redis from 'redis';

import postRoutes from './routes/posts.js';
import userRoutes from './routes/user.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

const client = redis.createClient({
  host: 'redis',
  port: 6379
});

client.on('connect', () => {
  console.log('Connected to Redis');
});


app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/api/posts', postRoutes);
app.use('/api/user', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
