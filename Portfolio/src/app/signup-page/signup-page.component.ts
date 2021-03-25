import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {

  loginRef = new FormGroup({
    firstName:new FormControl(),
    lastName:new FormControl(),
    username:new FormControl(),
    password:new FormControl()
  });


  constructor(public router:Router) { }

  ngOnInit(): void {
  }

  registerUser() : void {
    let userObj = {
      firstName: this.loginRef.get("firstName")?.value,
      lastName: this.loginRef.get("lastName")?.value,
      username: this.loginRef.get("username")?.value,
      password: this.loginRef.get("password")?.value
    };

    sessionStorage.setItem(this.loginRef.get("username")?.value, JSON.stringify(userObj));
    this.router.navigate(["login-page"]);
  }

  returnToLogin() : void {
    this.router.navigate(["login-page"]);
  }

}
