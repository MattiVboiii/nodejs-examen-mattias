import express from 'express';
import {
  createSnippet,
  getSnippets,
  getSnippetsByID,
  updateSnippet,
} from '../controllers/snippetController';

const router = express.Router();

router
  .post('/', createSnippet)
  .get('/', getSnippets)
  .get('/:id', getSnippetsByID)
  .put('/:id', updateSnippet);

export default router;
