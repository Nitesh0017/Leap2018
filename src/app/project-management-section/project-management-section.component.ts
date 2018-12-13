import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { TimesheetHomescreenComponent } from 'src/app/timesheet-homescreen/timesheet-homescreen.component';
import {TimesheetLoginscreenComponent} from '../timesheet-loginscreen/timesheet-loginscreen.component';
import {Employee} from '../employeeParameter.model';
import {DataService} from '../globalVariable.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-project-management-section',
  templateUrl: './project-management-section.component.html',
  styleUrls: ['./project-management-section.component.css'],
  providers: [ DataService ]
})
export class ProjectManagementSectionComponent implements OnInit {
  currentEmployee: Employee;
  employees: Employee[] = [];
  constructor(public router: Router, public activatedRoute: ActivatedRoute, private dataService: DataService) {
    this.currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'));
  }
 ngOnInit() {
   
 }
  

    Timesheet()
    {
      this.router.navigate(['EmployeeHome']);
    }
}
