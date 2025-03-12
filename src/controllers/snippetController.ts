import { Request, Response } from 'express';
import { Snippet } from '../models/snippetModel';

export const createSnippet = async (req: Request, res: Response) => {
  try {
    const { code, ...rest } = req.body;
    const encodedCode = Buffer.from(code).toString('base64');
    const snippet = await Snippet.create({ ...rest, code: encodedCode });
    res.status(201).json({ status: 'success', data: snippet });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

export const getSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await Snippet.find();
    const decodedSnippets = snippets.map((snippet) => {
      const decodedCode = Buffer.from(snippet.code, 'base64').toString('utf-8');
      return { ...snippet.toObject(), code: decodedCode };
    });
    res.status(200).json({ status: 'success', data: decodedSnippets });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};
