/**
 * Created by anandm at 01-Mar-16
 */
var mongoose = require("mongoose");

var CommentSchema = mongoose.Schema({
    postId: {
        type: mongoose.Schema.Types.ObjectId
    },
    username: { //name given by anonymous poster
       type: String
    },
    emailId: {
        type: String
    },
    comment: {
      type: String
    },
    postedAt: {
        type: Date,
        default: Date.now
    }
}, {strict: false});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;