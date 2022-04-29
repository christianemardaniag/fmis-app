import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private baseUrl = "https://wfar-management-system-default-rtdb.firebaseio.com";
  onSigninSpinner = false;
  isIncorrect = false;
  isLoggedIn = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  userLogin(loginForm: NgForm) {
    
    let email = loginForm.value.email;
    let password = loginForm.value.password;
    this.onSigninSpinner = true;

    this.http.get<any>(this.baseUrl + '/users.json').subscribe(data => {
        console.log("LOGGING IN: EMAIL[" + email + "]");
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            if (email == element.email && password == element.password) {
              this.isLoggedIn = true;
              this.router.navigate(['/main/dashboard']);
            }
          }
        }
        this.onSigninSpinner = false;
        if (!this.isLoggedIn) {
          this.isIncorrect = true;
        }
      });
  }
}