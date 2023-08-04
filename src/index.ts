// src/index.ts

import express, { Request, Response } from 'express';
import cors from 'cors';
import * as bookController from './controllers/BookController';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/books', bookController.getBooks);
app.post('/books/:id/buy', bookController.buyBook);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
