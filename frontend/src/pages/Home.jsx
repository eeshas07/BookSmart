import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";import axios from "axios";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar";
import API_URL from "../api";

function Home() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios
            .get(`${API_URL}/api/books`)
            .then((response) => {
                setBooks(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
    <>
        <Navbar />

        <main className="home-page">

            <div className="home-header">
                <div>
                    
                    <h1>Discover Your Next Great Read</h1>
                    
                </div>

                
            </div>

            

            <div className="book-grid">
                {books.map((book) => (
                    <BookCard
                        key={book._id}
                        book={book}
                    />
                ))}
            </div>

        </main>
    </>
);
}

export default Home;