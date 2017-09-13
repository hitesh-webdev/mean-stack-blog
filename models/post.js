var mongoose = require('mongoose');
var User = require('./user');
var Schema = mongoose.Schema;

var schema = new Schema({
    postId: {type: Number, required: true},
    title: {type: String, required: true},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    timestamp: {type: Number, required: true},
    imagePath: {type: String, required: true},
    content: {type: String, required: true},
    tags: [{type: String}],
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

/* Schema Hooks 
======================================================= */

// Adding the post to the associated User model

schema.post('save', (doc, next) => {
    
    User.findById(doc.author).then(
        (user) => {
            user.posts.push(doc._id);
            user.save();
        }
    ).catch(
        (err) => {
            res.status(500).json({
                title: 'Post could not be added',
                error: err
            })
        }
    );
    next();
});

// Collection name will be created by the lowercase plural version of the model name (in this case 'posts')

module.exports = mongoose.model('Post', schema);
