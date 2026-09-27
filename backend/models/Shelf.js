const mongoose = require("mongoose");

const shelfSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Book",
        required: true
    },

    status: {
        type: String,
        enum: ["want_to_read", "reading", "read"],
        required: true
    }
});

module.exports = mongoose.model("Shelf", shelfSchema);