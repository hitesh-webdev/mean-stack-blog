import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCredentials: boolean = false;
  @ViewChild('invalidText') invalidText: ElementRef;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onLogin(form: NgForm) {

    this.authService.loginUser(form.value.email, form.value.password).subscribe(
      (data) => {
        console.log(data);
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('userEmail', data.userEmail);
        this.authService.userEmail = data.userEmail;
        this.authService.loginStatus.next(true);
        this.invalidCredentials = false;
        this.router.navigate(['/posts']);
      },
      (err) => {
        console.log(err);
        this.invalidCredentials = true;
        form.reset();
      }
    );

  }

  /* Removing the Invalid Email/Password status on field updations */
  updateInvalidStatus() {
    if (this.invalidCredentials) {
      this.invalidCredentials = false;
      this.invalidText.nativeElement.textContent = '';
    }
  }

}
