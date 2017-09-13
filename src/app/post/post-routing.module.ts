import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostComponent } from './post.component';
import { PostListComponent } from './post-list/post-list.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TagPostsComponent } from './tag-posts/tag-posts.component';
import { AddPostComponent } from './add-post/add-post.component';

import { AuthGuard } from '../shared/auth-guard.service';
import { CanDeactivateGuard } from '../shared/can-deactivate-guard.service';
import { PostDetailResolver } from '../shared/post-detail-resolver.service';

const postsRoutes: Routes = [
    {path: 'posts', component: PostComponent, children: [
        {path: '', component: PostListComponent, pathMatch: 'full'},
        {path: 'post-detail/:id', component: PostDetailComponent, resolve: { post: PostDetailResolver }},
        {path: 'tags/:tag', component: TagPostsComponent}
    ]},
    {path: 'add-post', canActivate: [AuthGuard], canDeactivate: [CanDeactivateGuard], component: AddPostComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(postsRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class PostRouting {

}
