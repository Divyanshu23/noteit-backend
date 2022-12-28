const mongoose = require("mongoose")

const noteSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    tag: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model("notes", noteSchema)
module.exports = Note