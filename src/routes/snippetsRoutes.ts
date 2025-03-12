import express from 'express';
import {
  createSnippet,
  getSnippets,
  getSnippetsByID,
} from '../controllers/snippetController';

const router = express.Router();

router
  .post('/', createSnippet)
  .get('/', getSnippets)
  .get('/:id', getSnippetsByID);

export default router;
