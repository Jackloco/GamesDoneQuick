const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    game: String,
    difficulty: String,
    console: String,
    time: String,
    username: String,
    youtubeLink: String
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = Entry;