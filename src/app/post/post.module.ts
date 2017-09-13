import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';

import { PostListComponent } from './post-list/post-list.component';
import { PostItemComponent } from './post-list/post-item.component';
import { PostComponent } from './post.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { TagPostsComponent } from './tag-posts/tag-posts.component';

@NgModule({
    declarations: [
        AddPostComponent,
        PostDetailComponent,
        PostListComponent,
        PostItemComponent,
        SidebarComponent,
        TagPostsComponent,
        PostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule,
        HttpModule
    ]
})
export class PostModule {

}
