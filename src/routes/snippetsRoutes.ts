import express from 'express';
import { createSnippet } from '../controllers/snippetController';

const router = express.Router();

router.post('/', createSnippet);

export default router;
