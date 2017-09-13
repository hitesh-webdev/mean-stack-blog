import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PostService } from '../../shared/posts.service';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../post';

@Component({
  selector: 'app-tag-posts',
  templateUrl: './tag-posts.component.html',
  styleUrls: ['./tag-posts.component.css']
})
export class TagPostsComponent implements OnInit, OnDestroy {

  tag: string;
  posts: Post[];
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private postService: PostService) { }

  ngOnInit() {

    this.subscription = this.route.params.subscribe(
      (params: Params) => {
        this.tag = params['tag'];

        // Fetching only those posts whose tags contains the searched string
        this.posts = this.postService.postsList.filter(
          (post) => {
            // Checking even if one tag of the current post contains the searched string
            return post['tags'].some(
              (data) => {
                // Checking the existence of substring in each tag of the current post
                return data.toLowerCase().indexOf(this.tag.toLowerCase()) !== -1;
              }
            );
          }
        );
      }
    );

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
