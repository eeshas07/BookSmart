const mongoose = require("mongoose");
require("dotenv").config();

const Book = require("./models/Book");

async function assignSimilarBooks() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        const books = await Book.find();

        const findBook = (title) =>
            books.find((book) => book.title === title);

        const relationships = {
            "To Kill a Mockingbird": [
                "The Catcher in the Rye",
                "Little Women",
                "The Diary of a Young Girl"
            ],

            "Pride and Prejudice": [
                "Little Women",
                "Romeo and Juliet",
                "The Diary of a Young Girl"
            ],

            "The Diary of a Young Girl": [
                "To Kill a Mockingbird",
                "Little Women",
                "The Catcher in the Rye"
            ],

            "Harry Potter and the Philosopher's Stone": [
                "The Odyssey",
                "The Count of Monte Cristo",
                "Little Women"
            ],

            "The Catcher in the Rye": [
                "To Kill a Mockingbird",
                "Little Women",
                "The Diary of a Young Girl"
            ],

            "Romeo and Juliet": [
                "Hamlet",
                "Pride and Prejudice",
                "Little Women"
            ],

            "Little Women": [
                "Pride and Prejudice",
                "To Kill a Mockingbird",
                "The Diary of a Young Girl"
            ],

            "Hamlet": [
                "Romeo and Juliet",
                "The Odyssey",
                "The Count of Monte Cristo"
            ],

            "The Odyssey": [
                "The Count of Monte Cristo",
                "Harry Potter and the Philosopher's Stone",
                "Hamlet"
            ],

            "The Count of Monte Cristo": [
                "The Odyssey",
                "Harry Potter and the Philosopher's Stone",
                "Hamlet"
            ]
        };

        for (const book of books) {
            const similarTitles = relationships[book.title];

            if (!similarTitles) continue;

            const similarIds = similarTitles
                .map((title) => findBook(title))
                .filter(Boolean)
                .map((similarBook) => similarBook._id);

            book.similarBooks = similarIds;
            await book.save();

            console.log(`Updated: ${book.title}`);
        }

        console.log("Similar books assigned successfully!");

        await mongoose.connection.close();

    } catch (error) {
        console.log("Error:", error);
        await mongoose.connection.close();
    }
}

assignSimilarBooks();