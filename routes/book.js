const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const bookCtrl = require('../controllers/bookController');
const { searchBooks } = require('../controllers/bookController');

router.get('/search', searchBooks);

router.post('/books', auth, bookCtrl.addBook);
router.get('/books', bookCtrl.getBooks);
router.get('/books/:id', bookCtrl.getBookById);

module.exports = router;
