import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import postRoutes from './routes/posts.js';

// Load environment variables from .env file
dotenv.config();

const app = express();

// Enable JSON body parsing
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// API routes
app.use('/posts', postRoutes);

// Connect to MongoDB
const CONNECTION_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

if (!CONNECTION_URL) {
  console.error('MONGODB_URI is not defined in .env file');
  process.exit(1);
}

mongoose.connect(CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log('Error connecting to MongoDB:', error.message));
