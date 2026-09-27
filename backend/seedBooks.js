const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Book = require("./models/Book");

dotenv.config();

const books = [
    {
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        description: "A novel about justice, prejudice, and growing up in the American South.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780061120084-L.jpg",
        genre: "Classic Fiction",
        price: 399
    },
    {
        title: "Pride and Prejudice",
        author: "Jane Austen",
        description: "A classic story of love, family, social expectations, and misunderstanding.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg",
        genre: "Romance",
        price: 299
    },
    {
        title: "The Diary of a Young Girl",
        author: "Anne Frank",
        description: "The diary of Anne Frank describing her life in hiding during World War II.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780553296983-L.jpg",
        genre: "Biography",
        price: 349
    },
    {
        title: "Harry Potter and the Philosopher's Stone",
        author: "J. K. Rowling",
        description: "A young boy discovers that he is a wizard and begins his education at Hogwarts.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780747532699-L.jpg",
        genre: "Fantasy",
        price: 499
    },
    {
        title: "The Catcher in the Rye",
        author: "J. D. Salinger",
        description: "A coming-of-age novel following teenager Holden Caulfield in New York City.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780316769488-L.jpg",
        genre: "Classic Fiction",
        price: 399
    },
    {
        title: "Romeo and Juliet",
        author: "William Shakespeare",
        description: "A tragedy about two young lovers whose families are bitter enemies.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780743477116-L.jpg",
        genre: "Tragedy",
        price: 249
    },
    {
        title: "Little Women",
        author: "Louisa May Alcott",
        description: "The story of the four March sisters as they grow from childhood into adulthood.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg",
        genre: "Classic Fiction",
        price: 349
    },
    {
        title: "Hamlet",
        author: "William Shakespeare",
        description: "A tragedy following Prince Hamlet as he seeks revenge for his father's death.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780743477123-L.jpg",
        genre: "Tragedy",
        price: 249
    },
    {
        title: "The Odyssey",
        author: "Homer",
        description: "An ancient epic following Odysseus on his long journey home after the Trojan War.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780140268867-L.jpg",
        genre: "Epic Poetry",
        price: 399
    },
    {
        title: "The Count of Monte Cristo",
        author: "Alexandre Dumas",
        description: "A story of imprisonment, escape, revenge, and redemption.",
        coverImage: "https://covers.openlibrary.org/b/isbn/9780140449266-L.jpg",
        genre: "Adventure",
        price: 449
    }
];

async function seedBooks() {
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB connected");

        // Prevent duplicates if we accidentally run this again
        await Book.deleteMany({});

        await Book.insertMany(books);

        console.log("10 books added successfully!");

        await mongoose.connection.close();
    } catch (error) {
        console.log("Error adding books:", error);
        await mongoose.connection.close();
    }
}

seedBooks();