import { Request, Response } from 'express';
import { Snippet } from '../models/snippetModel';

export const createSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await Snippet.create({ ...req.body });
    res.status(201).json({ status: 'success', data: snippet });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};
