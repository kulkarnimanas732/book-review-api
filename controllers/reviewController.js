const Review = require('../models/Review');

exports.addReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const bookId = req.params.id;
    const { rating, comment } = req.body;

  
    const existingReview = await Review.findOne({ book: bookId, user: userId });
    if (existingReview) {
      return res.status(400).json({ message: 'You have already reviewed this book' });
    }

    const review = new Review({ book: bookId, user: userId, rating, comment });
    await review.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review' });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviewId = req.params.id;
    const { rating, comment } = req.body;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error updating review' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const userId = req.user.userId;
    const reviewId = req.params.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });

    if (review.user.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting review' });
  }
};

