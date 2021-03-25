import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserInfoService } from '../user-info.service';

@Component({
  selector: 'app-portfolio-page',
  templateUrl: './portfolio-page.component.html',
  styleUrls: ['./portfolio-page.component.css']
})
export class PortfolioPageComponent implements OnInit {
  reset:any;
  username:string="";

  contactRef = new FormGroup({
    name:new FormControl(),
    phoneNumber:new FormControl()
  });

  constructor(public userInfo:UserInfoService) { 
    this.username = this.userInfo.getUsername();
  }

  ngOnInit(): void {
  }

  saveContact() : void {
    let table = document.getElementById("contactTable") as HTMLTableElement;
    let body = table?.getElementsByTagName("tbody")[0];
    let newRow:any = body?.insertRow(0);

    newRow.insertCell(0).innerHTML = this.contactRef.get("name")?.value;
    newRow.insertCell(1).innerHTML = this.contactRef.get("phoneNumber")?.value;
    this.reset = null;
  }
}
