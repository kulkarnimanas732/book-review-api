const Book = require('../models/Book');
const Review = require('../models/Review');

exports.addBook = async (req, res) => {
  try {
    const book = await Book.create(req.body);
    res.status(201).json(book);
  } catch {
    res.status(500).json({ message: 'Book not created' });
  }
};

exports.getBooks = async (req, res) => {
  const { author, genre, page = 1, limit = 5 } = req.query;
  const filter = {};
  if (author) filter.author = author;
  if (genre) filter.genre = genre;

  const books = await Book.find(filter)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));
  res.json(books);
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    const reviews = await Review.find({ book: book._id });

    const avgRating =
      reviews.length > 0
        ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1)
        : null;

    res.json({ book, averageRating: avgRating, reviews });
  } catch {
    res.status(404).json({ message: 'Book not found' });
  }
};

exports.searchBooks = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const regex = new RegExp(query, 'i'); 

    const books = await Book.find({
      $or: [
        { title: regex },
        { author: regex }
      ]
    });

    res.status(200).json(books);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
