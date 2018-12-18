import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { Employee } from '../employeeParameter.model';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { map} from 'rxjs/operators';
import { parse } from 'url';
import {Project} from '../projectParameter.model';
import {Timesheet} from '../timesheetParameter.model';
import {weeklyTimesheetParameter} from '../weeklyTimesheetParameter.model';

@Component({
  selector: 'app-edit-timesheet',
  templateUrl: './edit-timesheet.component.html',
  styleUrls: ['./edit-timesheet.component.css']
})
export class EditTimesheetComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router) { }
  EmpId:string;
  EmpIdNum: number;
  timesheetWeek: string; timesheetDate: Date;
  weekStart: string; weekEnd: string;
  timesheet1Date; timesheet2Date; timesheet3Date; timesheet4Date; timesheet5Date; timesheet6Date; timesheet7Date; 

  ngOnInit() {
    this.timesheetWeek = this.activatedRoute.snapshot.paramMap.get('id');
    var timesheetDates: string[] = this.timesheetWeek.split("--",1);
    var timesheetDate : string[] = timesheetDates[0].split("-",3);
    var date: string = timesheetDate[2]+"-"+timesheetDate[1]+"-"+timesheetDate[0];
    this.EmpId = this.activatedRoute.snapshot.paramMap.get('id1');
    this.EmpIdNum = parseInt(this.EmpId);

    var employee1 : Employee = {emailId:'', password:'', empId: this.EmpIdNum, empName: "",IsRM:0};
    this.http.post('http://localhost:59974/api/RetrieveEmployeeDetails/details', employee1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayEmployeesDetails(data); });
    
    var weeklyTimesheet: weeklyTimesheetParameter = {timesheet1Date: new Date(Date.parse(date)), timesheet2Date:new Date(Date.parse(date)),timesheet3Date:new Date(Date.parse(date)),timesheet4Date:new Date(Date.parse(date)),timesheet5Date:new Date(Date.parse(date)),timesheet6Date:new Date(Date.parse(date)),timesheet7Date:new Date(Date.parse(date))}
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: '',timesheet1Date:new Date(Date.parse(date)), timesheet1DateEffort: 0, timesheet2DateEffort: 0,timesheet3DateEffort: 0,timesheet4DateEffort: 0,timesheet5DateEffort: 0,timesheet6DateEffort: 0,timesheet7DateEffort: 0,  taskDescription: "",timesheetStatus:""}; 
    
    this.http.post('http://localhost:59974/api/RetrieveTimesheetDates/timesheetDates', weeklyTimesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayTimesheet1(data); })
    
    this.http.post('http://localhost:59974/api/RetrieveTimesheet/EditTimesheet', timesheet5).pipe(map( (response) => response.json())).subscribe( (data) => { console.log("Hello "+ data); this.displayTimesheet2(data);})
   
    this.http.post('http://localhost:59974/api/ProjectEmployeeMapped/viewProjectId', employee1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaydata(data); });
    
  }
  RetrieveTimesheet; RetrieveEffort:any; httpdata; projectLength: number =0;employeeDetails;RetrieveTimesheet1Date;
  RetrieveTimesheetProject1;RetrieveTimesheetProject2;RetrieveTimesheetProject3;RetrieveTimesheetProject4;RetrieveTimesheetProject5;
  RetrieveTimesheetProject6;
  displayTimesheet1(data){
    this.RetrieveTimesheet = data;
    this.RetrieveTimesheet1Date = this.RetrieveTimesheet[0]['timesheet1Date'];
    this.RetrieveTimesheet1Date = this.RetrieveTimesheet1Date.split("T")[0];
    console.log(this.RetrieveTimesheet1Date);
  }  
  displayTimesheet2(data){
    this.RetrieveEffort = data;
    this.projectLength = this.RetrieveEffort.length
    if(this.projectLength===1){
      this.RetrieveTimesheetProject1 = this.RetrieveEffort[0]['projectId'];
    }
    else if(this.projectLength===2){
      this.RetrieveTimesheetProject1 = this.RetrieveEffort[0]['projectId'];
      this.RetrieveTimesheetProject2 = this.RetrieveEffort[1]['projectId'];
    }
    else if(this.projectLength===3){
      this.RetrieveTimesheetProject1 = this.RetrieveEffort[0]['projectId'];
      this.RetrieveTimesheetProject2 = this.RetrieveEffort[1]['projectId'];
      this.RetrieveTimesheetProject3 = this.RetrieveEffort[2]['projectId'];
    }
    else if(this.projectLength===4){
      this.RetrieveTimesheetProject1 = this.RetrieveEffort[0]['projectId'];
    this.RetrieveTimesheetProject2 = this.RetrieveEffort[1]['projectId'];
    this.RetrieveTimesheetProject3 = this.RetrieveEffort[2]['projectId'];
      this.RetrieveTimesheetProject4 = this.RetrieveEffort[3]['projectId'];
    }
    else if(this.projectLength===5){
      this.RetrieveTimesheetProject1 = this.RetrieveEffort[0]['projectId'];
      this.RetrieveTimesheetProject2 = this.RetrieveEffort[1]['projectId'];
      this.RetrieveTimesheetProject3 = this.RetrieveEffort[2]['projectId'];
        this.RetrieveTimesheetProject4 = this.RetrieveEffort[3]['projectId'];
      this.RetrieveTimesheetProject5 = this.RetrieveEffort[4]['projectId'];
    }
    else if(this.projectLength===6){
      this.RetrieveTimesheetProject1 = this.RetrieveEffort[0]['projectId'];
      this.RetrieveTimesheetProject2 = this.RetrieveEffort[1]['projectId'];
      this.RetrieveTimesheetProject3 = this.RetrieveEffort[2]['projectId'];
        this.RetrieveTimesheetProject4 = this.RetrieveEffort[3]['projectId'];
      this.RetrieveTimesheetProject5 = this.RetrieveEffort[4]['projectId'];
      this.RetrieveTimesheetProject6 = this.RetrieveEffort[5]['projectId'];
    }

  } 
  counter(i: number) {
    return new Array(i);
}
  displaydata(data) {this.httpdata = data;  } 
  displayEmployeesDetails(data) {
    this.employeeDetails = data;
  }
  getDayName(id: number)
  {
    if(id==0)
    {
        return 'Sunday';
    }
    else if(id==1)
    {
        return 'Monday';
    }
    else if(id==2)
    {
        return 'Tuesday';
    }
    else if(id==3)
    {
        return 'Wednesday';
    }
    else if(id==4)
    {
        return 'Thursday';
    }
    else if(id==5)
    {
        return 'Friday';
    }
    else
    {
        return 'Saturday';
    }
  }

  cancelEdittedTimesheet(){
    setTimeout(()=> {
      this.router.navigate(['/EmployeeHome']);
    }, 900);
  }

  selectHour11;selectHour12;selectHour13;selectHour14;selectHour15;selectHour16;selectHour17;
  selectHour21;selectHour22;selectHour23;selectHour24;selectHour25;selectHour26;selectHour27;
  selectHour31;selectHour32;selectHour33;selectHour34;selectHour35;selectHour36;selectHour37;
  selectHour41;selectHour42;selectHour43;selectHour44;selectHour45;selectHour46;selectHour47;
  selectHour51;selectHour52;selectHour53;selectHour54;selectHour55;selectHour56;selectHour57;
  selectHour61;selectHour62;selectHour63;selectHour64;selectHour65;selectHour66;selectHour67;
  selectedValue1;selectedValue2;selectedValue3;selectedValue4;selectedValue5;selectedValue6;
  workDescription1: string;workDescription2: string;workDescription3: string;workDescription4: string;workDescription5: string;workDescription6: string;
  submitEdittedTimesheet(){
    if(this.projectLength===1)
    {
     
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue2 != null)
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue3 != null)
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue4 != null)
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    

    if(this.projectLength===2)
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
  
    if(this.selectedValue3 != null)
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue4 != null)
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===3)
    {
      
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
   
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
    
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue4 != null)
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===4)
    {
      
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
   
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
    
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===5)
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
    
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
  
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===6)
    {
     
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
   
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
   
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
    
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
  }

  saveEdittedTimesheet(){
    if(this.projectLength===1)
    {
     
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue2 != null)
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue3 != null)
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue4 != null)
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    

    if(this.projectLength===2)
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved'}; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
  
    if(this.selectedValue3 != null)
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue4 != null)
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved'}; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved'}; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===3)
    {
      
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
   
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
    
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue4 != null)
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved'}; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===4)
    {
      
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
   
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved'}; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
    
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===5)
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved'}; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
    
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
  
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    if(this.projectLength===6)
    {
     
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject1,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved' }; 
    console.log(timesheet1.timesheet1Date);
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
   
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject2,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved'}; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject3,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved' }; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet3).subscribe( (data) => { console.log(data); });
   
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject4,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
   
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject5,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved'}; 
    this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet1).subscribe( (data) => { console.log(data); });
    
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.RetrieveTimesheetProject6,timesheet1Date:this.RetrieveTimesheet1Date, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/UpdateTimesheet/Update', timesheet2).subscribe( (data) => { console.log(data); });
    
      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
  }
}  