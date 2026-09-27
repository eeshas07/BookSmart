import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import API_URL from "../api";

function MyBooks() {
    const [shelves, setShelves] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));

        if (storedUser) {
            axios
                .get(
                     `${API_URL}/api/shelves/${storedUser.id}`
                )
                .then((response) => {
                    setShelves(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, []);

    const displayBooks = (status) => {
        const filteredBooks = shelves.filter(
            (item) => item.status === status
        );

        if (filteredBooks.length === 0) {
            return <p>No books here yet.</p>;
        }

        return (
            <div className="my-books-grid">
                {filteredBooks.map((item) => (
                    <div
                        className="my-book-card"
                        key={item._id}
                    >
                        <img
                            src={item.bookId.coverImage}
                            alt={item.bookId.title}
                        />

                        <h3>{item.bookId.title}</h3>

                        <p>by {item.bookId.author}</p>
                        <button
    className="remove-book-button"
    onClick={() => removeBook(item.bookId._id)}
>
    Remove
</button>
                        <Link to={`/books/${item.bookId._id}`}>
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        );
    };

    const wantToRead = shelves.filter(
    (item) => item.status === "want_to_read"
);

const reading = shelves.filter(
    (item) => item.status === "reading"
);

const read = shelves.filter(
    (item) => item.status === "read"
);

const removeBook = async (bookId) => {
    const storedUser = JSON.parse(
        localStorage.getItem("user")
    );

    if (!storedUser) {
        return;
    }

    try {
        await axios.delete(
             `${API_URL}/api/shelves/${storedUser.id}/${bookId}`
        );

        // Immediately remove it from the page
        setShelves((currentShelves) =>
            currentShelves.filter(
                (item) => item.bookId._id !== bookId
            )
        );

    } catch (error) {
        console.log(error);
        alert("Could not remove book.");
    }
};

    return (
    <>
        <Navbar />

        <main className="my-books-page">

           
            <section className="shelf-group">
                <div className="shelf-title">
                    <h2>Want to Read</h2>
                    <span>{wantToRead.length} books</span>
                </div>

                {wantToRead.length === 0 ? (
                    <p className="empty-shelf">
                        No books added to this shelf yet.
                    </p>
                ) : (
                    <div className="my-books-grid">
                        {wantToRead.map((item) => (
                            <div
                                className="my-book-card"
                                key={item._id}
                            >
                                <img
                                    src={item.bookId.coverImage}
                                    alt={item.bookId.title}
                                />

                                <div>
                                    <h3>{item.bookId.title}</h3>

                                    <p>
                                        by {item.bookId.author}
                                    </p>
                                    <button
    className="remove-book-button"
    onClick={() => removeBook(item.bookId._id)}
>
    Remove
</button>
                                    <Link
                                        to={`/books/${item.bookId._id}`}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>


            <section className="shelf-group">
                <div className="shelf-title">
                    <h2>Currently Reading</h2>
                    <span>{reading.length} books</span>
                </div>

                {reading.length === 0 ? (
                    <p className="empty-shelf">
                        No books added to this shelf yet.
                    </p>
                ) : (
                    <div className="my-books-grid">
                        {reading.map((item) => (
                            <div
                                className="my-book-card"
                                key={item._id}
                            >
                                <img
                                    src={item.bookId.coverImage}
                                    alt={item.bookId.title}
                                />

                                <div>
                                    <h3>{item.bookId.title}</h3>

                                    <p>
                                        by {item.bookId.author}
                                    </p>

                                    <Link
                                        to={`/books/${item.bookId._id}`}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>


            <section className="shelf-group">
                <div className="shelf-title">
                    <h2>Read</h2>
                    <span>{read.length} books</span>
                </div>

                {read.length === 0 ? (
                    <p className="empty-shelf">
                        No books added to this shelf yet.
                    </p>
                ) : (
                    <div className="my-books-grid">
                        {read.map((item) => (
                            <div
                                className="my-book-card"
                                key={item._id}
                            >
                                <img
                                    src={item.bookId.coverImage}
                                    alt={item.bookId.title}
                                />

                                <div>
                                    <h3>{item.bookId.title}</h3>

                                    <p>
                                        by {item.bookId.author}
                                    </p>
                                    <button
    className="remove-book-button"
    onClick={() => removeBook(item.bookId._id)}
>
    Remove
</button>
                                    <Link
                                        to={`/books/${item.bookId._id}`}
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

        </main>
    </>
);
}

export default MyBooks;