import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import MyBooks from "./pages/MyBooks";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/books/:id" element={<BookDetails />} />
                <Route path="/my-books" element={<MyBooks />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;