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

    const query: any = {};
    if (req.query.language) {
      query.language = req.query.language;
    }
    if (req.query.tags) {
      query.tags = { $all: (req.query.tags as string).split(',') };
    }

    const snippets = await Snippet.find(query)
      .sort({ [sort as string]: order === 'desc' ? -1 : 1 })
      .skip((+page - 1) * +limit)
      .limit(+limit);

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

export const getSnippetsByID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { showExpired } = req.query;

    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    if (
      !showExpired &&
      snippet.expiresIn &&
      Date.now() > new Date(snippet.expiresIn).getTime()
    ) {
      return res.status(404).json({ message: 'Snippet has expired' });
    }

    const decodedCode = Buffer.from(snippet.code, 'base64').toString('utf-8');

    res.status(200).json({
      status: 'success',
      data: {
        ...snippet.toObject(),
        code: decodedCode,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};

export const updateSnippet = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { code, ...rest } = req.body;

    if (code) {
      rest.code = Buffer.from(code).toString('base64');
    }

    const snippet = await Snippet.findByIdAndUpdate(id, rest, { new: true });
    if (!snippet) {
      return res.status(404).json({ message: 'Snippet not found' });
    }

    const decodedCode = Buffer.from(snippet.code, 'base64').toString('utf-8');
    res.status(200).json({
      status: 'success',
      data: { ...snippet.toObject(), code: decodedCode },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
};
