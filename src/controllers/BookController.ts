// src/controllers/BookController.ts

import { Request, Response } from 'express';
import { Book } from '../entities/Book';
import * as bookService from '../services/BookService';

export async function getBooks(req: Request, res: Response): Promise<void> {
  try {
    const books: Book[] = await bookService.getBooks();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

export async function buyBook(req: Request, res: Response): Promise<void> {
  const id: number = parseInt(req.params.id);
  try {
    await bookService.buyBook(id);
    res.json({ message: 'Book purchased successfully' });
  } catch (error) {
    res.status(404).json({ error: `Book purchase not successfull` });
  }
}
