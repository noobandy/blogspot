/**
 * Created by anandm at 01-Mar-16
 */
var mongoose = require("mongoose");

var PostSchema = mongoose.Schema({
    blogId: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String
    },
    content: {
        type: String
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
}, {strict: false});

var Post = mongoose.model("Post", PostSchema);

module.exports = Post;