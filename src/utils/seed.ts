import mongoose from 'mongoose';
import { Snippet } from '../models/snippetModel';
import { snippetData } from './data';
import { MONGO_URI } from '../config/env';

const seedSnippets = async () => {
  try {
    await mongoose.connect(MONGO_URI! as string);
    await Snippet.deleteMany();
    await Snippet.insertMany(snippetData);
    console.log('Seeding snippets completed successfully! 🌱');
  } catch (error) {
    console.error('Seeding error:', error);
  } finally {
    await mongoose.connection.close();
  }
};

await seedSnippets();
