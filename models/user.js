var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
});

// Collection name will be created by the lowercase plural version of the model name (in this case 'users')

module.exports = mongoose.model('User', schema);
