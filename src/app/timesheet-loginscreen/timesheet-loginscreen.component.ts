import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Http, Response, RequestMethod, RequestOptions} from '@angular/http';
import {HttpClient,HttpErrorResponse } from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ParamMap} from '@angular/router/src/shared';
import {Route} from '@angular/router/src/config';
import { Employee } from '../employeeParameter.model';
import {DataService} from '../globalVariable.service';
import * as CryptoJS from 'crypto-js';
import {AuthenticationService} from '../Authentication';
import { first } from 'rxjs/operators';
//import {SessionTokenService} from '../SessionTokenService';

@Component({
  selector: 'app-timesheet-loginscreen',
  templateUrl: './timesheet-loginscreen.component.html',
  styleUrls: ['./timesheet-loginscreen.component.css'],
  providers: [DataService] //SessionTokenService
})
export class TimesheetLoginscreenComponent implements OnInit {
  isLoginError : boolean = false;
  constructor(public http: Http, public router: Router,private AuthenticationService: AuthenticationService) { //private SessionTokenService: SessionTokenService
    
  }

  result: string = "";
  btnStatus: boolean = false;
  retrievePassword: string = "";
  password: string = 'leap2018';
  message: string;
  private empId: number;
  // empName: string;
  IsRMMessage: string;

  ngOnInit() {
  }

  ForgotPass(){
    console.log("clicked");
    this.router.navigate(['/forgotPass']);
  }

  onLoginEmp(form : NgForm) {
    if(form.invalid) 
    { 
      if(form.value.empEmail == "" && form.value.empPassword != "")
      {
        this.message = "Please enter email id";
      }
      else if(form.value.empEmail != "" && form.value.empPassword == "")
      {
        this.message = "Please enter password";
      }
      else
      {
        this.message = "Please enter both email id and password.";
      } 
      this.btnStatus = true;
      return; 

    }
    var employee : Employee = {emailId:form.value.empEmail, password:'', empId: 0, empName: "",IsRM:0};
    // var emailid = form.value.empEmail;

    this.http.post('http://localhost:59974/api/ValidateEmployeeCredentials/LoginCheck', employee).subscribe(result => { console.log(result);
    if(CryptoJS.AES.decrypt(result['_body'], 'leap2018').toString(CryptoJS.enc.Utf8) === form.value.empPassword)
    {
      this.AuthenticationService.login(form.value.empEmail)
      .subscribe((data : any)=>{
        localStorage.setItem('userToken',Math.round(Math.random()).toString());
        this.router.navigate(['EmployeeHome']);
      },
      (err : HttpErrorResponse)=>{
        this.isLoginError = true;
      });
     
      // var employee1 : Employee = {emailId:'', password:'', empId: this.empId, empName: "",IsRM:0};
      // // this.http.post('http://localhost:59974/api/RetrieveEmployeeName/RetrieveName', employee1).subscribe(result => { 
      // // this.empName = result['_body']});

      // this.http.post('http://localhost:59974/api/IsEmployeeRM/IsRM', employee1).subscribe(result => { 
      // this.IsRMMessage = result['_body']});

      // console.log(this.IsRMMessage);
      // if(this.IsRMMessage =='Not RM')
      // {
      //   this.dataService.IsRM = false;
      // }
      // else
      // {
      //   this.dataService.IsRM = true;
      // }
      // console.log(this.dataService.EmpId+" "+this.empId+" "+this.dataService.IsRM+" ");
    }
    else
    {
      this.btnStatus = true;
      this.message = "Incorrect email id and password. Please try again.";
      form.value.empEmail = '';
      form.value.empPassword = '';
      this.router.navigate(['Login']);
    };
  });
  this.btnStatus = true;
  };
}

