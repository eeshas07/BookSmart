import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function BookDetails() {
    const { id } = useParams();

    const [book, setBook] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const [message, setMessage] = useState("");
    const [shelfMessage, setShelfMessage] = useState("");

    // Get book
    useEffect(() => {
        axios
            .get(`http://localhost:5005/api/books/${id}`)
            .then((response) => {
                setBook(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    // Get reviews
    const getReviews = () => {
        axios
            .get(`http://localhost:5005/api/reviews/${id}`)
            .then((response) => {
                setReviews(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getReviews();
    }, [id]);

    // Submit review
    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        if (rating === 0) {
            setMessage("Please select a star rating.");
            return;
        }

        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (!storedUser) {
            setMessage("Please login to write a review.");
            return;
        }

        try {
            await axios.post(
                "http://localhost:5005/api/reviews",
                {
                    userId: storedUser.id,
                    bookId: id,
                    rating: rating,
                    review: reviewText
                }
            );

            setMessage("Review added successfully!");
            setRating(0);
            setReviewText("");

            // Refresh reviews immediately
            getReviews();

        } catch (error) {
            console.log(error);
            setMessage("Could not add review.");
        }
    };

    // Calculate average rating
    const averageRating =
        reviews.length > 0
            ? (
                reviews.reduce(
                    (total, item) => total + item.rating,
                    0
                ) / reviews.length
            ).toFixed(1)
            : "No ratings yet";

    if (!book) {
        return <h2>Loading...</h2>;
    }

    const updateShelf = async (status) => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
        setShelfMessage("Please login first.");
        return;
    }

    try {
        await axios.post(
            "http://localhost:5005/api/shelves",
            {
                userId: storedUser.id,
                bookId: id,
                status: status
            }
        );

        setShelfMessage("Reading status updated!");

    } catch (error) {
        console.log(error);
        setShelfMessage("Could not update reading status.");
    }
};

const handleBuyNow = async () => {
    try {
        // Ask our backend to create a Razorpay order
        const response = await axios.post(
            "http://localhost:5005/api/orders/create-order",
            {
                amount: book.price
            }
        );

        const { order, key } = response.data;

        const options = {
            key: key,
            amount: order.amount,
            currency: order.currency,
            name: "BookSmart",
            description: book.title,
            order_id: order.id,

            handler: function (response) {
                alert(
                    "Payment Successful!\nPayment ID: " +
                    response.razorpay_payment_id
                );
            },

            prefill: {
                name:
                    JSON.parse(localStorage.getItem("user"))?.name || "",
                email:
                    JSON.parse(localStorage.getItem("user"))?.email || ""
            },

            theme: {
                color: "#6b3e3e"
            }
        };

        const paymentObject = new window.Razorpay(options);

        paymentObject.open();

    } catch (error) {
        console.log(error);
        alert("Could not start payment.");
    }
};

    return (
         <>
        <Navbar />

        <div className="book-details">

            <Link to="/home">
                ← Back to Home
            </Link>

            <div className="details-content">

                <img
                    src={book.coverImage}
                    alt={book.title}
                    className="details-cover"
                />

                <div>
                    <h1>{book.title}</h1>

                    <h3>by {book.author}</h3>

                    <p>
                        <strong>Genre:</strong> {book.genre}
                    </p>

                    <p>{book.description}</p>

                    <h3>₹{book.price}</h3>
                    <button
    className="buy-button"
    onClick={handleBuyNow}
>
    Buy Now
</button>
                    <div className="shelf-section">
    <h3>Add to My Books</h3>

    <button onClick={() => updateShelf("want_to_read")}>
        Want to Read
    </button>

    <button onClick={() => updateShelf("reading")}>
        Currently Reading
    </button>

    <button onClick={() => updateShelf("read")}>
        Read
    </button>

    {shelfMessage && <p>{shelfMessage}</p>}
</div>

                    <p>
                        <strong>Average Rating:</strong>{" "}
                        {averageRating}
                        {reviews.length > 0 && " / 5"}
                    </p>
                </div>

            </div>

            <hr />

            <h2>Rate & Review</h2>

            <form onSubmit={handleReviewSubmit}>

                <div className="star-rating">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => setRating(star)}
                            className={
                                star <= rating
                                    ? "star selected"
                                    : "star"
                            }
                        >
                            ★
                        </span>
                    ))}

                </div>

                <p>
                    Selected Rating:{" "}
                    {rating === 0 ? "None" : `${rating}/5`}
                </p>

                <textarea
                    placeholder="Write your review..."
                    value={reviewText}
                    onChange={(e) =>
                        setReviewText(e.target.value)
                    }
                    required
                    rows="4"
                    cols="50"
                />

                <br />

                <button type="submit">
                    Submit Review
                </button>

            </form>

            {message && <p>{message}</p>}

            <hr />

            <h2>Reader Reviews</h2>

            {reviews.length === 0 ? (
                <p>No reviews yet. Be the first to review!</p>
            ) : (
                reviews.map((item) => (
                    <div
                        key={item._id}
                        className="review-card"
                    >
                        <h3>
                            {item.userId?.name || "BookSmart User"}
                        </h3>

                        <p className="review-stars">
                            {"★".repeat(item.rating)}
                            {"☆".repeat(5 - item.rating)}
                        </p>

                        <p>{item.review}</p>
                    </div>
                ))
            )}

            <hr />

<h2>Similar Books</h2>

{book.similarBooks && book.similarBooks.length > 0 ? (
    <div className="similar-books">
        {book.similarBooks.map((similarBook) => (
            <div
                key={similarBook._id}
                className="similar-book-card"
            >
                <img
                    src={similarBook.coverImage}
                    alt={similarBook.title}
                />

                <h3>{similarBook.title}</h3>

                <p>by {similarBook.author}</p>

                <Link to={`/books/${similarBook._id}`}>
                    View Details
                </Link>
            </div>
        ))}
    </div>
) : (
    <p>No similar books available.</p>
)}

        </div>
    );
        </>
);
}

export default BookDetails;