import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import {HttpClient} from '@angular/common/http';
import {Employee} from '../employeeParameter.model';
import { map} from 'rxjs/operators';

@Component({
  selector: 'app-timesheet-chart',
  templateUrl: './timesheet-chart.component.html',
  styleUrls: ['./timesheet-chart.component.css']
})
export class TimesheetChartComponent implements OnInit {

  constructor(private http: Http) { }

  httpdata;

  pieChartOptions:any;

pieChartLabels =  [];

color: number = 2;
colorCode1: number=0;
colorCode2: number=0;
colorCode3: number=0;
ColorCodeString: string;
colorCode: any = [];
// CHART COLOR.
pieChartColor:any;

valuedata:any=[];

pieChartData:any;
  
  ngOnInit() {

    var employee1 : Employee = {emailId:'', password:'', empId:107832, empName: "",IsRM:0};
    this.http.post('http://localhost:59974/api/ViewTimesheet/view',employee1).
    subscribe( (data) => { 
    
        this.httpdata = data;
        for(let i=0; i<this.httpdata.length; i++)
        {
          this.pieChartLabels.push(this.httpdata[i].timesheetWeek);
          this.valuedata.push(this.httpdata[i].effortHours);
          if(this.colorCode1>240) this.colorCode1 = 40;
          if(this.colorCode2>240) this.colorCode2 = 30;
          if(this.colorCode3>240) this.colorCode3 = 60;
          if(i%2==0){
          this.colorCode1 = i*this.colorCode1+158;
          this.colorCode2 = i*this.colorCode2+255;
          this.colorCode3 = i*this.colorCode3+120;
          }
          else
          {
          this.colorCode1 = i*this.colorCode1+97;
          this.colorCode2 = i*this.colorCode2-98;
          this.colorCode3 = i*this.colorCode3;    
          }
          
          this.ColorCodeString = 'rgba('+this.colorCode1+','+this.colorCode2+','+this.colorCode3+',0.9)';
          this.colorCode.push(this.ColorCodeString);
        }
      })

      this.pieChartData = [
        { 
            data: this.valuedata
        }
    ];

    this.pieChartColor = [
      {
          backgroundColor: this.colorCode
      }
  ]

  this.pieChartOptions= {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
        yAxes: [{
            ticks: {
                beginAtZero:true
            }
        }]
    }
}

var employee1 : Employee = {emailId:'', password:'', empId: 107832, empName: "",IsRM:0};
this.http.post('http://localhost:59974/api/RetreiveTeamMember/team', employee1).pipe(map( (response) => response.json()))
.subscribe( (data) => { console.log(data); this.displayTeamMember(data); });

}
retrieveTeam;
displayTeamMember(data)
{
  this.retrieveTeam = data;
}
    
      
    

  onChartClick(event) {
    console.log(event);
    console.log(this.pieChartLabels,  this.valuedata);
    console.log(this.pieChartData);
    console.log(this.pieChartColor);
}

}