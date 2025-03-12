// Imports
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { notFound } from './controllers/notFoundController';
import mongoose from 'mongoose';
import snippetsRoutes from './routes/snippetsRoutes';
import { Snippet } from './models/snippetModel';

// Variables
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', 'src/views');
app.use(express.static('src/public'));

// Redirect root to /table
app.get('/', (req, res) => {
  res.redirect('/table');
});

// EJS
app.get('/table', async (req, res) => {
  const snippets = await Snippet.find();
  res.render('index', {
    title: 'Snippet Manager',
    snippets,
  });
});

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
