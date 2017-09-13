var Post = require('./post');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    postId: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
    username: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Number, required: true}
});

/* Schema Hooks 
======================================================= */

// Adding the comment to the associated post model

schema.post('save', (doc, next) => {

    Post.findById(doc.postId).then(
        (post) => {
            post.comments.push(doc._id);
            post.save();
        }
    ).catch(
        (err) => {
            res.status(500).json({
                title: 'Comment could not be added',
                error: err
            })
        }
    );
    next();
});

// Collection name will be created by the lowercase plural version of the model name (in this case 'comments')

module.exports = mongoose.model('Comment', schema);
