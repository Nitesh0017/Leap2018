import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { map} from 'rxjs/operators';
import {Employee} from '../employeeParameter.model';
import {weeklyTimesheetParameter} from '../weeklyTimesheetParameter.model';
import { Timesheet } from 'src/app/timesheetParameter.model';

@Component({
  selector: 'app-view-timesheet',
  templateUrl: './view-timesheet.component.html',
  styleUrls: ['./view-timesheet.component.css']
})
export class ViewTimesheetComponent implements OnInit {
  selectedEmployee:boolean;
  varSelectedEmployeeTimesheet: boolean;
  reviewedTimesheet: boolean;
  EmpIdNum: number;
  constructor(private http:Http) { }

  ngOnInit() {
    this.selectedEmployee=false;
    this.reviewedTimesheet = false;
    this.varSelectedEmployeeTimesheet=false;
  this.EmpIdNum = parseInt('107832');
  var employee1 : Employee = {emailId:'', password:'', empId: 107832, empName: "",IsRM:0};
  this.http.post('http://localhost:59974/api/RetreiveTeamMember/team', employee1).pipe(map( (response) => response.json()))
  .subscribe( (data) => { console.log(data); this.displayTeamMember(data); })

  }
  retrieveTeam;
  displayTeamMember(data)
  {
    this.retrieveTeam = data;
  }

  selectedEmployeeTimesheet(empId: number){
    
    console.log(empId);
    var employee1 : Employee = {emailId:'', password:'', empId:empId, empName: "",IsRM:0};
    this.http.post('http://localhost:59974/api/ViewTimesheet/view', employee1)
    .pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaySelectedEmployeeTimesheet(data); })
    this.selectedEmployee = true;
  }
  retrieveEmployeeTimesheet;
  displaySelectedEmployeeTimesheet(data)
  {
    this.retrieveEmployeeTimesheet = data;
  }

  timesheetWeek: string; timesheetDate: Date; date:string;
  reviewEmployeeTimesheet(selectedItem: any){
    this.selectedEmployee = false;
    this.varSelectedEmployeeTimesheet = true;
    this.timesheetWeek = selectedItem.timesheetWeek;
    var timesheetDates: string[] = this.timesheetWeek.split("--",1);
    var timesheetDate : string[] = timesheetDates[0].split("-",3);
    this.date= timesheetDate[2]+"-"+timesheetDate[1]+"-"+timesheetDate[0];
    this.EmpIdNum = parseInt(selectedItem.employeeId);
    var weeklyTimesheet: weeklyTimesheetParameter = {timesheet1Date: new Date(Date.parse(this.date)), timesheet2Date:new Date(Date.parse(this.date)),timesheet3Date:new Date(Date.parse(this.date)),timesheet4Date:new Date(Date.parse(this.date)),timesheet5Date:new Date(Date.parse(this.date)),timesheet6Date:new Date(Date.parse(this.date)),timesheet7Date:new Date(Date.parse(this.date))}
    
    this.http.post('http://localhost:59974/api/RetrieveTimesheetDates/timesheetDates', weeklyTimesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayTimesheet1(data); })
    

    var timesheet: Timesheet = {RMId:0,timesheet1Date: new Date(Date.parse(this.date)), empId: this.EmpIdNum, projectId: '',timesheet1DateEffort: 0,
      timesheet2DateEffort: 0,timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0,
      timesheet7DateEffort: 0, taskDescription: '', timesheetStatus: ''}
    
    this.http.post('http://localhost:59974/api/RetrieveTimesheet/EditTimesheet', timesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data); this.displayTimesheet2(data);})
   
  }
  RetrieveTimesheet; RetrieveEffort;
  displayTimesheet1(data){
    this.RetrieveTimesheet = data;
  }  
  displayTimesheet2(data){
    this.RetrieveEffort = data;
    
  } 

  rejectTimesheet(){
    var timesheet: Timesheet = {RMId:107832,timesheet1Date: new Date(Date.parse(this.date)), empId: this.EmpIdNum, projectId: '',timesheet1DateEffort: 0,
      timesheet2DateEffort: 0,timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0,
      timesheet7DateEffort: 0, taskDescription: '', timesheetStatus: 'Rejected'}
    this.http.post('http://localhost:59974/api/ReviewEmployeeTimesheet/reviewed', timesheet).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data); this.displayMessage(data);})
    this.http.post('http://localhost:59974/api/EmailRejectTimesheet/EditTimesheet', timesheet).subscribe( (data) => { console.log(data);})
   
    this.reviewedTimesheet =true;
   this.varSelectedEmployeeTimesheet = false;
  }

  approveTimesheet(){
    var timesheet: Timesheet = {RMId:107832,timesheet1Date: new Date(Date.parse(this.date)), empId: this.EmpIdNum, projectId: '',timesheet1DateEffort: 0,
      timesheet2DateEffort: 0,timesheet3DateEffort: 0, timesheet4DateEffort: 0, timesheet5DateEffort: 0, timesheet6DateEffort: 0,
      timesheet7DateEffort: 0, taskDescription: '', timesheetStatus: 'Approved'}
    this.http.post('http://localhost:59974/api/ReviewEmployeeTimesheet/reviewed', timesheet).subscribe( (data) => { console.log(data); this.displayMessage(data);})
    this.http.post('http://localhost:59974/api/EmailApproveTimesheet/EditTimesheet', timesheet).subscribe( (data) => { console.log(data);})
   
    this.reviewedTimesheet =true;
   this.varSelectedEmployeeTimesheet = false;
  }
  reviewedMessage: string;
  displayMessage(data){
   this.reviewedMessage = data['_body'];
    
  } 
}
