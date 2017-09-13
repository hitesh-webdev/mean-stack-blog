import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../shared/posts.service';
import { Post } from '../post';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  subscription: Subscription;

  constructor(private postsService: PostService) { }

  ngOnInit() {
    this.subscription = this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.posts = posts;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
