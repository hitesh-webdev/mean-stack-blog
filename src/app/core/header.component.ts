import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  loggedIn: boolean = this.authService.isAuthenticated();
  userEmail: string = this.authService.userEmail;
  subscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.subscription = this.authService.loginStatus.subscribe(
      (status) => {
        this.loggedIn = this.authService.isAuthenticated();
        this.userEmail = this.authService.userEmail;
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onLogout() {
    this.authService.onLogout();
  }

}
