import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule, Routes} from '@angular/router';
import { MatFormFieldModule, MatInputModule , MatSelectModule, MatOptionModule} from '@angular/material';

import { MatDatepickerModule,MatButtonModule,MatRippleModule,MatNativeDateModule  } from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//import {PasswordModule, InputTextModule, CalendarModule, PanelModule } from 'primeng/primeng';
import {Employee} from './employeeParameter.model';
import {Employee1} from './empParameter.model';
import { AppComponent } from './app.component';
import { EmployeeHomeScreenComponent } from './employee-home-screen/employee-home-screen.component';
import { Component } from '@angular/core/src/metadata/directives';
import { EmployeeFilltimesheetScreenComponent } from './employee-filltimesheet-screen/employee-filltimesheet-screen.component';
import { TimesheetHeaderscreenComponent } from './timesheet-headerscreen/timesheet-headerscreen.component';
import { TimesheetFooterscreenComponent } from './timesheet-footerscreen/timesheet-footerscreen.component';
import { TimesheetLoginscreenComponent } from './timesheet-loginscreen/timesheet-loginscreen.component';
import { ProjectManagementSectionComponent } from './project-management-section/project-management-section.component';
import {DataService} from './globalVariable.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditTimesheetComponent } from './edit-timesheet/edit-timesheet.component';
import { ViewTimesheetComponent } from './view-timesheet/view-timesheet.component';
import {AuthenticationService} from './Authentication';
//import {SessionTokenService} from './SessionTokenService';
import { ViewTeamTimesheetComponent } from './view-team-timesheet/view-team-timesheet.component';
import { TimesheetChartComponent } from './timesheet-chart/timesheet-chart.component';

import { ChartsModule } from 'ng2-charts';
import { SendForgotPassLinkComponent } from './send-forgot-pass-link/send-forgot-pass-link.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';


@NgModule({
  declarations: [
    AppComponent,
    EmployeeHomeScreenComponent,
    EmployeeFilltimesheetScreenComponent,
    TimesheetHeaderscreenComponent,
    TimesheetFooterscreenComponent,
    TimesheetLoginscreenComponent,
    ProjectManagementSectionComponent,
    EditTimesheetComponent,
    ViewTimesheetComponent,
    ViewTeamTimesheetComponent,
    TimesheetChartComponent,
    SendForgotPassLinkComponent,
    ResetPasswordComponent
  ],
  imports: [
    BrowserModule, FormsModule,HttpModule,MatFormFieldModule, MatInputModule, NgbModule, ChartsModule ,
   
    MatDatepickerModule,MatButtonModule,MatRippleModule,MatNativeDateModule ,HttpClientModule, MatSelectModule,
    BrowserAnimationsModule ,MatOptionModule,RouterModule.forRoot([
      {
        path: 'logout',
        component: TimesheetLoginscreenComponent
      },
      {
        path: 'EmployeeHome',
        component: EmployeeHomeScreenComponent
      },
      {
        path: 'EmployeeFillTimeSheet/:id/:id1/:id2/:id3',
        component:  EmployeeFilltimesheetScreenComponent
      },
      {
        path: 'EmployeeEditTimesheet/:id/:id1',
        component:  EditTimesheetComponent
      },
      {
        path: '',
        component:  TimesheetLoginscreenComponent
      },
      {
        path: 'viewRMTimesheet',
        component:  ViewTimesheetComponent
      },
      {
        path: 'viewRMTeamTimesheet',
        component:  ViewTeamTimesheetComponent
      },
      {
        path: 'ProjectManagementSection',
        component: ProjectManagementSectionComponent
      },
      {
        path: 'forgotPass',
        component: SendForgotPassLinkComponent
      },
      {
        path: 'resetPassword/:id',
        component: ResetPasswordComponent
      }
    ])
  ],
  providers: [DataService,MatDatepickerModule,AuthenticationService ], //SessionTokenService
  bootstrap: [AppComponent]
})
export class AppModule { 
}
