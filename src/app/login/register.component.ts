import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {

    constructor(private authService: AuthService, private router: Router) {}

    onRegister(form: NgForm) {
        console.log(form);
        this.authService.registerUser(form.value.email, form.value.password).subscribe(
            (user) => {
                console.log(user);
                alert('User registered successfully. Kindly Login to continue.');
                this.router.navigate(['/login']);
            },
            (err) => {
                console.log(err);
                alert(err.json().title);
                form.reset();
            }
        );
    }

}
