/**
 * Created by anandm at 01-Mar-16
 */
var mongoose = require("mongoose");

var BlogSchema = mongoose.Schema({
    name: {
        type: String
    },
    owner: { //owner username
        type: String
    }
}, {strict: false});

var Blog = mongoose.model("Blog", BlogSchema);

module.exports = Blog;