// src/repositories/BookRepository.ts

import { Pool } from 'pg';
import { Book } from '../entities/Book';
import { dbConfig } from '../config';

const pool = new Pool(dbConfig);

export async function getBooks(): Promise<Book[]> {
  const client = await pool.connect();
  try {
    const result = await client.query('SELECT * FROM books');
    return result.rows;
  } finally {
    client.release();
  }
}

export async function buyBook(id: number): Promise<void> {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    const book = await client.query('SELECT * FROM books WHERE id = $1 FOR UPDATE', [id]);
    if (!book.rows.length) {
      throw new Error('Book not found');
    }

    const price = book.rows[0].price;
    await client.query('UPDATE books SET stock = stock - 1 WHERE id = $1', [id]);
    await client.query('INSERT INTO orders (book_id, price) VALUES ($1, $2)', [id, price]);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
