const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const forumSchema = new Schema({
    username: req.body.username,
    topic: String,
    body: String

}, {
    timestamps: {createdAt: "created_at", updatedAt: "updated_at"}
});

const Forum = mongoose.model("Forum", forumSchema);

module.exports = Forum;