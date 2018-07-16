const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    game: String,
    console: String,
    time: Number,
    userId: String,
    youtubeLink: String
}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
});

const Entry = mongoose.model("Entry", entrySchema);

module.exports = entrySchema;