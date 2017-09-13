import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { PostService } from '../../shared/posts.service';
import { Post } from '../post';
import { Comment } from '../comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  loggedIn: boolean = false;
  subscription: Subscription;
  post: any;

  constructor(private authService: AuthService,
     private route: ActivatedRoute,
     private postsService: PostService,
     private router: Router) { }

  ngOnInit() {

    this.post = this.route.snapshot.data['post'].obj[0];

    /* Visibility of comment box to the logged in user */
    if (this.authService.isAuthenticated()) {
      this.loggedIn = true;
    }
    this.subscription = this.authService.loginStatus.subscribe(
      (status) => {
        if (status) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );

  }

  onComment(form: NgForm) {
    const username: string = this.authService.userEmail;
    const text: string = form.value.comment;
    const timestamp: number = new Date().getTime();

    /* Creating a new comment */
    let comment = new Comment(username, text, timestamp);

    this.postsService.addComment(this.post._id, comment).subscribe(
      (data) => {
        console.log(data);
        comment = new Comment(data.obj.username, data.obj.text, data.obj.timestamp);
        this.post.comments.push(comment);
      },
      (err) => {
        console.log(err);
        alert('Token has expired. Kindly login to continue.');
        this.authService.onLogout();
      }
    );
    form.reset();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
