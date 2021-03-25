import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private username:string="";

  constructor() { }

  setUsername(enteredUsername:string):void {
    this.username = enteredUsername;
  }

  getUsername():string{
    return this.username;
  }
}
