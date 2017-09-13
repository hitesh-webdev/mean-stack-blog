import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PostService } from './posts.service';
import { Post } from '../post/post';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostDetailResolver implements Resolve<Post> {

    constructor(private postsService: PostService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.postsService.fetchPostDetail(route.params['id']);
    }

}
