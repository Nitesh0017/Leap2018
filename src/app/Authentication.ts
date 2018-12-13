import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Employee1} from '../app/empParameter.model';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(emailId:string): Observable<Employee1> {
        var employee : Employee1 = {emailId:emailId, password:'', empId: 0, empName: "",IsRM:0};
        console.log('hello Authentication');
        //this.http.post<Employee1>('http://localhost:59974/api/GetEmployeeId/RetrieveEmployee', employee).subscribe(data=> {console.log(data);});
        
    return this.http.post<Employee1>('http://localhost:59974/api/GetEmployeeId/RetrieveEmployee', employee);
    }

  
}