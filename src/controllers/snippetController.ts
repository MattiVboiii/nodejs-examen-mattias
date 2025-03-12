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
    const {
      page = 1,
      limit = 10,
      sort = 'createdAt',
      order = 'desc',
    } = req.query;

    // Find snippets based on query parameters
    const snippets = await Snippet.find({
      ...(req.query.language && {
        language: { $eq: req.query.language },
      }),
      ...(req.query.tags
        ? {
            tags: {
              $all: (req.query.tags as string).split(','),
            },
          }
        : {}),
    }).sort({ [sort as string]: order === 'desc' ? -1 : 1 });

    // Paginate the snippets
    const paginatedSnippets = snippets.slice(
      (+page - 1) * +limit,
      +page * +limit
    );

    // Decode the code for each snippet
    const decodedSnippets = paginatedSnippets.map((snippet) => {
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
