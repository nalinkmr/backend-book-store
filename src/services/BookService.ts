// src/services/BookService.ts

import * as bookRepository from '../repositories/BookRepository';
import { Book } from '../entities/Book';

export async function getBooks(): Promise<Book[]> {
  return await bookRepository.getBooks();
}

export async function buyBook(id: number): Promise<void> {
  return await bookRepository.buyBook(id);
}
