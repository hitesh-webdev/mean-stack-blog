import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostRouting } from './post/post-routing.module';

/* Components
=========================================== */
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NotFoundComponent } from './core/not-found.component';

/* Services
=========================================== */
import { LoginGuard } from './shared/login-guard.service';

/* Routing paths
============================================ */

const appRoutes: Routes = [
    {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [LoginGuard]},
    {path: '', redirectTo: '/posts', pathMatch: 'full'},
    {path: '**', component: NotFoundComponent}
];

@NgModule({
    imports: [
        PostRouting,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}
