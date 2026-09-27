import { Link } from "react-router-dom";

function BookCard({ book }) {
    return (
    <div className="book-card">

        <div className="book-cover-area">
            <img
                src={book.coverImage}
                alt={book.title}
                className="book-cover"
            />
        </div>

        <div className="book-card-info">

            <span className="book-genre">
                {book.genre}
            </span>

            <h2>{book.title}</h2>

            <p className="book-author">
                by {book.author}
            </p>

            <p className="book-description">
                {book.description}
            </p>

            <div className="book-card-bottom">

                <span className="book-price">
                    ₹{book.price}
                </span>

                <Link
                    to={`/books/${book._id}`}
                    className="details-button"
                >
                    View Details
                </Link>

            </div>

        </div>

    </div>
);
}

export default BookCard;