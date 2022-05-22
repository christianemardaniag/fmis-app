import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  private baseUrl = "https://fmis-app-default-rtdb.firebaseio.com/";
  onSigninSpinner = false;
  isIncorrect = false;
  isLoggedIn = false;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
  }

  userLogin(loginForm: NgForm) {
    
    let username = loginForm.value.username;
    let password = loginForm.value.password;
    this.onSigninSpinner = true;

    this.http.get<any>(this.baseUrl + 'admin.json').subscribe(data => {
        for (const key in data) {
          if (data.hasOwnProperty(key)) {
            const element = data[key];
            console.log(element);
            
            if (username == element.username && password == element.password) {
              this.isLoggedIn = true;
              localStorage.setItem('position', 'admin');
              this.router.navigate(['/main/report']);
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
