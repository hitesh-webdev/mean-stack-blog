import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Post } from '../post/post';
import { Comment } from '../post/comment';

@Injectable()
export class PostService {

    constructor(private http: Http) {}

    postsList: Post[] = [];

    // Fetching posts from MongoDB
    fetchPosts() {

        return this.http.get('http://localhost:8000/fetch-post').map(
            (response: Response) => {

                // Parsing and storing the returned posts in a variable
                const posts = response.json().obj;

                const postsList: Post[] = [];

                posts.forEach(
                    (post) => {

                        // Extracting the comments out of the current post
                        const comments = post.comments;
                        const commentList: Comment[] = [];

                        // Storing each comment of the current post in the form of Comment object
                        comments.forEach(
                            (comment) => {
                                commentList.push(new Comment(comment.username, comment.text, comment.timestamp));
                            }
                        );

                        // Storing each post in the form of Post object
                        postsList.push(
                            new Post(
                                post.postId,
                                post.title,
                                post.author,
                                post.timestamp,
                                post.imagePath,
                                post.content,
                                post.tags,
                                commentList
                            )
                        );

                    }
                );

                this.postsList = postsList;
                return postsList;
            }
        );
    }

    // Adding new post to MongoDB
    addPost(post: Post) {

        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        // Making the HTTP request to save post to MongoDB
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post(`http://localhost:8000/add-post${token}`, JSON.stringify(post), {headers: headers}).map(
            (response) => {
                return response.json();
            }
        );

    }

    // Adding comment to a post
    addComment(postId: Number, comment: Comment) {

        const data = {postId: postId, comment: comment};

        const token = localStorage.getItem('token') ? '?token=' + localStorage.getItem('token') : '';

        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.patch(`http://localhost:8000/add-comment${token}`, JSON.stringify(data), {headers: headers}).map(
            (response: Response) => {
                return response.json();
            }
        );
    }

    // Fetching detailed post
    fetchPostDetail(postId) {

        return this.http.get(`http://localhost:8000/post-detail/${postId}`).map(
            (response: Response) => {
                return response.json();
            }
        );

    }

}
