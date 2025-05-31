const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const reviewCtrl = require('../controllers/reviewController');

router.post('/books/:id/reviews', auth, reviewCtrl.addReview);
router.put('/reviews/:id', auth, reviewCtrl.updateReview);
router.delete('/reviews/:id', auth, reviewCtrl.deleteReview);

module.exports = router;
