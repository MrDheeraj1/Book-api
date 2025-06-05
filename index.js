// index.js

// 2. Install Express (npm install express)
const express = require('express');

// 3. Setup basic Express server on port 3000
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// 4. Create an array to store book objects {id, title, author}
let books = [];
let nextId = 1;

// 5. Implement GET /books to return all books
app.get('/books', (req, res) => {
  res.json(books);
});

// 6. POST /books to add a new book from request body
app.post('/books', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({ message: 'Title and author are required.' });
  }

  const newBook = { id: nextId++, title, author };
  books.push(newBook);
  res.status(201).json(newBook);
});

// 7. PUT /books/:id to update a book by ID
app.put('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const { title, author } = req.body;

  const book = books.find(b => b.id === bookId);
  if (!book) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

// 8. DELETE /books/:id to remove a book
app.delete('/books/:id', (req, res) => {
  const bookId = parseInt(req.params.id);
  const index = books.findIndex(b => b.id === bookId);

  if (index === -1) {
    return res.status(404).json({ message: 'Book not found.' });
  }

  books.splice(index, 1);
  res.json({ message: 'Book deleted successfully.' });
});

// Start server (3. Confirming again: running on port 3000)
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
