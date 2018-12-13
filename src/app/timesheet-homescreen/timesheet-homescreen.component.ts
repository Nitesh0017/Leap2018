import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-timesheet-homescreen',
  templateUrl: './timesheet-homescreen.component.html',
  styleUrls: ['./timesheet-homescreen.component.css']
})
export class TimesheetHomescreenComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(()=> {
      this.router.navigate(['/EmployeeHome']);
    }, 100);
  }

  Logout() {
    localStorage.removeItem('userToken');
    this.router.navigate(['Login']);
  }
}
