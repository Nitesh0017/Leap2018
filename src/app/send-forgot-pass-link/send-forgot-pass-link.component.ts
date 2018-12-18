import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import { Employee } from '../employeeParameter.model';
import { Http } from '@angular/http';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-send-forgot-pass-link',
  templateUrl: './send-forgot-pass-link.component.html',
  styleUrls: ['./send-forgot-pass-link.component.css']
})
export class SendForgotPassLinkComponent implements OnInit {
btnStatus: Boolean;
message: String;
password:string;
encryptedPassword:string;
empEmailId:string;
Url: string;

  constructor(private router: Router, private http: Http) { }

  ngOnInit() {
  }

  onForgotEmp(form : NgForm){
    if(form.invalid) 
    { 
      if(form.value.empEmail == "" )
      {
        this.message = "Please enter email id";
      }
      this.btnStatus = true;
      return; 

    }
    var employee : Employee = {emailId:form.value.empEmail, password:'', empId: 0, empName: "",IsRM:0};
    this.empEmailId= CryptoJS.AES.encrypt(form.value.empEmail.trim(),'leap2018').toString();
    this.http.post('http://localhost:59974/api/ValidateEmployeeCredentials/LoginCheck', employee).subscribe(result => {console.log(result);
    
    this.password = CryptoJS.AES.decrypt(result['_body'], 'leap2018').toString(CryptoJS.enc.Utf8);
    
    this.encryptedPassword = CryptoJS.AES.encrypt(this.password.trim(),'leap2018').toString();

    this.Url = 'http://localhost:4200/resetPassword/'+this.empEmailId+'/'+this.encryptedPassword;
    
    console.log(this.encryptedPassword+' '+this.empEmailId+' '+this.Url);
    var employee1 : Employee = {emailId:this.Url, password:'', empId: 0, empName: "",IsRM:0};
    //this.http.post('http://localhost:59974/api/sendForgotPass/EditTimesheet',employee1).subscribe(result => {console.log(result);});
    });
  }

  LoginScreen(){
    this.router.navigate(['Login']);
  }
}
