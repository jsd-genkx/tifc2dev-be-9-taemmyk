const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Simulated data for API
const books = [
  { id: 1, title: "1984", author: "George Orwell", genre: "Dystopian" },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
  },
];

// Filter books by genre (optional)
app.get("/books", (req, res, next) => {
  try {
    setTimeout(() => {
      const { genre } = req.query;
      //TODO: ADD CODE to Filter books by genre.
      let filteredBooks = books;
      if (genre) {
        filteredBooks = books.filter((book) => book.genre.includes(genre));
      }

      //TODO: ADD CODE
      if (genre && filteredBooks.length === 0) {
        const err = new Error(`No books found with the ${genre} genre.`);
        err.status = 404;
        return next(err);
      }
      res.send(filteredBooks);
    }, 1000); // Simulate a 1-second delay
  } catch (err) {
    next(err);
  }
});

// GET specific book by ID with async/await
app.get("/books/:id", async (req, res, next) => {
  try {
    const book = await new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundBook = books.find(
          (b) => b.id === parseInt(req.params.id, 10)
        );
        if (foundBook) {
          resolve(foundBook);
        } else {
          //TODO: ADD CODE to reject the promise
          const err = new Error("Book not found");
          err.status = 404;
          reject(err);
        }
      }, 1000); // Simulate a 1-second delay
    });
    res.send(book);
  } catch (err) {
    //TODO: ADD CODE HERE ⬇️
    err.status = 404;
    next(err);
  }
});

//TODO: ADD CODE HERE ⬇️
app.use((err, req, res, next) => {
  const status = err.status;
  const response = {
    message: err.message,
    status: status,
  };

  res.status(status).send(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
