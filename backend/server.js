const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const bookRoutes = require("./routes/books");
const reviewRoutes = require("./routes/reviews");
const shelfRoutes = require("./routes/shelves");
const orderRoutes = require("./routes/orders");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/shelves", shelfRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
    res.send("BookSmart Backend is Running!");
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    console.log("MongoDB Connected Successfully!");
    console.log("Database name:", mongoose.connection.name);

    const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
})
    .catch((err) => {
        console.log("MongoDB Connection Error:", err);
    });