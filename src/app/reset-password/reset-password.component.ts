import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { Employee } from '../employeeParameter.model';
import {Http} from '@angular/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  credentials:string;
  userId:string;
  password:string;
  resetPassword: boolean = false;
  message: string;
  constructor(private activatedRoute: ActivatedRoute, private http:Http) { }

  ngOnInit() {

    this.credentials = this.activatedRoute.snapshot.paramMap.get('id');
    this.userId = CryptoJS.AES.decrypt(this.credentials.split("/")[0].trim(), "leap2018").toString(CryptoJS.enc.Utf8)
    this.password = CryptoJS.AES.decrypt(this.credentials.split("/")[1].trim(), "leap2018").toString(CryptoJS.enc.Utf8)

    var employee : Employee = {emailId:this.userId, password:this.password, empId: 0, empName: "",IsRM:0};

    this.http.post('http://localhost:59974/api/ValidateEmployeeCredentials/LoginCheck', employee).subscribe(result => { console.log(result);

    this.resetPassword = true;
    if(CryptoJS.AES.decrypt(result['_body'], 'leap2018').toString(CryptoJS.enc.Utf8) === this.password)
    {
        this.message = "You can reset your password.";
    }
    else
    {
      this.message = "You can't reset your password. Please try again.";
  }
});
  
}
}
