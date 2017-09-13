import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from '../../shared/auth.service';
import { PostService } from '../../shared/posts.service';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from '../../shared/can-deactivate-guard.service';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Comment } from '../comment';
import { Post } from '../post';
import 'rxjs/Rx';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, CanComponentDeactivate, OnDestroy {

  changesSaved: boolean = false;
  postForm: FormGroup;
  subscription: Subscription;

  constructor(private router: Router, private authService: AuthService, private postService: PostService, private http: Http) { }

  ngOnInit() {
    this.postForm = new FormGroup({
      'title': new FormControl(null, Validators.required),
      'imagePath': new FormControl(null, Validators.required),
      'content': new FormControl(null, Validators.required),
      'tags': new FormArray([new FormControl(null, Validators.required)])
    });

    this.subscription = this.authService.loginStatus.subscribe(
      (loginStatus) => {
        if (!loginStatus) {
          this.changesSaved = true;
          this.router.navigate(['/posts']);
        }
      }
    );
  }

  onAddPost() {
    this.changesSaved = true;
    // console.log(this.postForm);

    const postId: number = this.postService.postsList.length + 1;
    const title: string = this.postForm.get('title').value;
    const author: string = this.authService.userEmail;
    const timestamp: number = new Date().getTime();
    const imagePath: string = this.postForm.get('imagePath').value;
    const content: string = this.postForm.get('content').value;

    /* Converting FormArray to String Array of Tags */
    const tags: string[] = [];
    for (const tag of (<FormArray>this.postForm.get('tags')).controls) {
      tags.push(tag.value.toString());
    }

    const comments: Comment[] = [];

    const post = new Post(postId, title, author, timestamp, imagePath, content, tags, comments);

    this.postService.addPost(post).subscribe(
      (data) => {
        alert('Your post has been published!');
        this.router.navigate(['/posts']);
      },
      (err) => {
        console.log(err);
        alert('Token has expired. Kindly login to continue.');
        this.authService.onLogout();
      }
    );

  }

  onAddTag() {
    (<FormArray>this.postForm.get('tags')).push(
      new FormControl(null, Validators.required)
    );
  }

  onRemoveTag(index: number) {
    (<FormArray>this.postForm.get('tags')).removeAt(index);
  }

  onCancel() {
    this.changesSaved = true;
    this.postForm.reset();
    this.router.navigate(['/posts']);
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (this.changesSaved) {
      return true;
    } else {
      return confirm('Do you want to discard the changes?');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
