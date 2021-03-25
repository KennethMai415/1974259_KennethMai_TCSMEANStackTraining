import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  //styles:['.container-fluid {background-color:red;}']
}) 

export class LoginPageComponent implements OnInit {
  loginRef = new FormGroup({
    user:new FormControl(),
    pass:new FormControl()
  });

  constructor(public router : Router, public userInfo:UserInfoService) { }

  ngOnInit(): void {
  }

  checkUser() : void {
      let enteredUsername:string = this.loginRef.get("user")?.value;
      let enteredPassword:string = this.loginRef.get("pass")?.value;
      let userInfo:any = sessionStorage.getItem(enteredUsername);
      this.userInfo.setUsername(this.loginRef.get("user")?.value);

      let user = JSON.parse(userInfo);

      if(user != null) {
        if(enteredPassword == user.password) {
          this.router.navigate(["portfolio-page"]);
        }
      }
  }

  goToSignup() : void {
    this.router.navigate(["signup-page"]);
  }
}
