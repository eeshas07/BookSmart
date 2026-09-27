const express = require("express");
const Shelf = require("../models/Shelf");

const router = express.Router();

module.exports = router;

// Remove a book from user's shelves
router.delete("/:userId/:bookId", async (req, res) => {
    try {
        const { userId, bookId } = req.params;

        await Shelf.findOneAndDelete({
            userId: userId,
            bookId: bookId
        });

        res.json({
            message: "Book removed from My Books"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Could not remove book"
        });
    }
});
// Add or update a book's reading status
router.post("/", async (req, res) => {
    try {
        const { userId, bookId, status } = req.body;

        const shelf = await Shelf.findOneAndUpdate(
            { userId, bookId },
            { status },
            {
                new: true,
                upsert: true
            }
        );

        res.json({
            message: "Book shelf updated",
            shelf
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

// Get all books belonging to one user
router.get("/:userId", async (req, res) => {
    try {
        const shelves = await Shelf.find({
            userId: req.params.userId
        }).populate("bookId");

        res.json(shelves);

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;