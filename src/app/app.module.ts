import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PostModule } from './post/post.module';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';

/* Services
=========================================== */
import { AuthGuard } from './shared/auth-guard.service';
import { LoginGuard } from './shared/login-guard.service';
import { AuthService } from './shared/auth.service';
import { PostService } from './shared/posts.service';
import { SearchService } from './shared/search.service';
import { CanDeactivateGuard } from './shared/can-deactivate-guard.service';
import { PostDetailResolver } from './shared/post-detail-resolver.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    PostModule,
    CoreModule
  ],
  providers: [PostService, SearchService, AuthGuard, AuthService, CanDeactivateGuard, LoginGuard, PostDetailResolver],
  bootstrap: [AppComponent]
})
export class AppModule { }
