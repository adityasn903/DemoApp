const mongoose = require('mongoose');
//const jwt = require('jsonwebtoken');
const _ = require('lodash');
let date = require('date-and-time');

var postsSchema = new  mongoose.Schema({
    authorName: {
        type: String
    },
    postTitle: {
      type: String
    },
    postDescription: {
        type:String,
    }
    ,
    postedDate:{
        type: Date
    }
})

postsSchema.statics.findByTokenPosts = function(token){
    var posts = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123')
        return Promise.resolve(posts.find());

    } catch(e){
        return Promise.reject("error");
    }
}

var posts = mongoose.model('posts',postsSchema);


module.exports = {posts};