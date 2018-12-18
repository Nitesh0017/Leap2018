import { Component, OnInit} from '@angular/core';
import {EmployeeHomeScreenComponent} from '../employee-home-screen/employee-home-screen.component';
import {DataService} from '../globalVariable.service';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ViewTimesheetComponent } from 'src/app/view-timesheet/view-timesheet.component';
import {Employee} from '../employeeParameter.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-headerscreen',
  templateUrl: './timesheet-headerscreen.component.html',
  styleUrls: ['./timesheet-headerscreen.component.css']
})
export class TimesheetHeaderscreenComponent implements OnInit {
  currentEmployee: Employee;
  employees: Employee[] = [];
  closeResult: string;
constructor(private router: Router,private modalService: NgbModal ) {
  this.currentEmployee = JSON.parse(localStorage.getItem('currentEmployee'));
 }
ngOnInit() {
  // this.EmployeeService.getAll().pipe(first()).subscribe(employees => { 
  //   this.employees = employees; })
}

approveTimesheet(){
   
  this.router.navigate(['viewRMTimesheet']);
}

Logout(){
  this.router.navigate(['Login']);
}

viewTimesheet(){
  this.router.navigate(['viewRMTeamTimesheet']);
}

open(content) {
  this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return  `with: ${reason}`;
  }
}
}
