// Imports
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { notFound } from './controllers/notFoundController';
import { helloMiddleware } from './middleware/exampleMiddleware';
import mongoose from 'mongoose';
import snippetsRoutes from './routes/snippetsRoutes';

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/snippets', snippetsRoutes);
app.all('*', notFound);

// Database connection
try {
  await mongoose.connect(process.env.MONGO_URI!);
  console.log('Database connection OK');
} catch (err) {
  console.error(err);
  process.exit(1);
}

// Server Listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}! 🚀`);
});
