const express = require("express");
const Review = require("../models/Review");

const router = express.Router();

// Add a review
router.post("/", async (req, res) => {
    try {
        const { userId, bookId, rating, review } = req.body;

        const newReview = new Review({
            userId,
            bookId,
            rating,
            review
        });

        await newReview.save();

        res.status(201).json({
            message: "Review added successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Get all reviews for one book
router.get("/:bookId", async (req, res) => {
    try {
        const reviews = await Review.find({
            bookId: req.params.bookId
        })
        .populate("userId", "name")
        .sort({ createdAt: -1 });

        res.json(reviews);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;