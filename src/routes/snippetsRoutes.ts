import express from 'express';
import { createSnippet, getSnippets } from '../controllers/snippetController';

const router = express.Router();

router.post('/', createSnippet).get('/', getSnippets);

export default router;
