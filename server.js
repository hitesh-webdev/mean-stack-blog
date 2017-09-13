const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Fix to Mongoose Promise deprication
mongoose.Promise = global.Promise;

// Importing Mongoose models
const User = require('./models/user');
const Post = require('./models/post');
const Comment = require('./models/comment');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Setting up our express app
const app = express();

/* Connecting each request with MongoDB
===================================================================== */
mongoose.connect('mongodb://localhost/blog-poc', {
    useMongoClient: true
}).then((data) => {
    console.log("Connected Successfully");
}).catch((err) => {
    console.log("Error connecting to database", err);
});

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false})); // Parsing URL-encoded data using query string library

// Run the app by serving the static files in the dist directory
app.use(express.static(__dirname + '/dist'));

// Setting up middleware to always serve index.html
app.use('/', (err, req, res, next) => {
    console.log("Inside default route");
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    next();
});

/* Setting up MongoDB API routes
========================================================== */

// Fetching all posts for Post List component
app.get('/fetch-post', (req, res) => {
    console.log("Inside Fetch Post route");

    Post.find({}).populate('author').populate('comments').exec().then(
        (posts) => {
            res.status(201).json({
                title: 'Fetched Posts',
                obj: posts
            })
        }
    ).catch(
        (err) => {
            res.status(500).json({
                title: 'An Error occured',
                error: err
            })
        }
    )
});


// Fetching post details in Post Detail component
app.get('/post-detail/:id', (req, res) => {
    
    const postId = req.params.id;
    Post.find({postId: postId}).populate('comments').populate('author').exec().then(
        (data) => {
            res.status(201).json({
                title: 'Detailed Post',
                obj: data
            })
        }
    ).catch(
        (err) => {
            res.status(500).json({
                title: 'An Error occured',
                error: err
            })
        }
    );
    
});

// Adding a new post for Add Post Component
app.post('/add-post', (req, res) => {

    console.log("Inside Add Post route");

    const data = req.body;
    let user = null;
    
    jwt.verify(req.query.token, 'secret', (err, decoded) => {

            if(err){
                return res.status(401).json({
                    title: 'Token has expired. Kindly Login again to continue.',
                    error: err
                });
            }

            // Decoding the JWT to get the authenticated user's detail
            user = decoded.user;
        
            const post = new Post({postId: data.postId, title: data.title, author: user._id, timestamp: data.timestamp, imagePath: data.imagePath, content: data.content, tags: data.tags});

            post.save().then(
                (result) => {
                    res.status(201).json({
                        title: 'Post Saved',
                        obj: result
                    });
                }
            ).catch(
                (err) => {
                    res.status(500).json({
                        title: 'An Error occured',
                        error: err
                    });
                }
            );

        }
    );

});

// Adding a new comment in Post Detail component
app.patch('/add-comment', (req, res) => {

    console.log('Inside Add Comment Route');
    const data = req.body;
    let user = null;

    jwt.verify(req.query.token, 'secret', (err, decoded) => {

            if(err){
                return res.status(401).json({
                    title: 'Token has expired. Kindly Login again to continue.',
                    error: err
                });
            }

            // Decoding the JWT to get the authenticated user's detail
            user = decoded.user;

            const comment = new Comment({postId: data.postId, username: user.email, text: data.comment.text, timestamp: data.comment.timestamp});
            
            comment.save().then(
                (addedComment) => {
                    res.status(201).json({
                        title: 'Added Comment',
                        obj: addedComment
                    });
                }
            ).catch(
                (err) => {
                    res.status(500).json({
                        title: 'Comment could not be added',
                        error: err
                    })
                }
            );

        }
    );

});


// Registering new User
app.post('/register-user', (req, res) => {

    const data = req.body;

    console.log('Inside Register User route');
    console.log(data);

    User.findOne({email: data.email}).then(
        (user) => {

            if(user == null){
                // Encrypting the password before saving it to the database
                const user = new User({email: data.email, password: bcrypt.hashSync(data.password, 10)});
                
                user.save().then(
                    (data) => {
                        res.status(201).json({
                            title: 'Registered User',
                            obj: data
                        })
                    }
                ).catch(
                    (err) => {
                        res.status(500).json({
                            title: 'An Error occured',
                            error: err
                        })
                    }
                );
            }
            else {
                res.status(500).json({
                    title: 'User already exists with this ID.',
                    obj: user
                });
            }

        }
    ).catch(
        (err) => {
            res.status(500).json({
                title: 'An Error occured',
                error: err
            });
        }
    );
});


// Logging in User
app.post('/signin', (req, res) => {

    const data = req.body;

    User.findOne({email: data.email}).then(
        (user) => {

            if(!bcrypt.compareSync(data.password, user.password)){
                return res.status(401).json({
                    title: 'Invalid login credentials.'
                });
            }

            const token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});  // 7200 sec = 2 hrs

            res.status(200).json({
                message: 'Successfully Logged in.',
                token: token,
                userId: user._id,
                userEmail: user.email
            });

        }
    ).catch(
        (err) => {
            res.status(500).json({
                title: 'Invalid login credentials.',
                error: err
            })
        }
    );

})


// Catch all other routes and return the index file
app.get('/*', (req, res) => {
    console.log("Inside wildcard route");
    console.log(req.body);
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8000);