import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class AuthService {

    constructor(private http: Http) {}

    userEmail: string = localStorage.getItem('userEmail');

    loginStatus = new Subject<boolean>();

    isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    onLogout() {
        localStorage.clear();
        this.loginStatus.next(false);
    }


    // Registering user in the application
    registerUser(email: String, password: String) {

        const data = {email: email, password: password};

        // Making the HTTP request to save user to MongoDB
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:8000/register-user', JSON.stringify(data), {headers: headers}).map(
            (response) => {
                return response.json();
            }
        );
    }


    // Logging in User
    loginUser(email: String, password: String) {

        const data = {email: email, password: password};

        // Making the HTTP request to check the existence of user in MongoDB
        const headers = new Headers({'Content-Type': 'application/json'});

        return this.http.post('http://localhost:8000/signin', JSON.stringify(data), {headers: headers}).map(
            (response) => {
                return response.json();
            }
        );

    }

}
