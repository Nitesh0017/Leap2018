import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Http, RequestOptions, Headers, Response} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ParamMap} from '@angular/router/src/shared';
import {Route} from '@angular/router/src/config';
import { Employee } from '../employeeParameter.model';
import {weeklyTimesheetParameter} from '../weeklyTimesheetParameter.model';
import { map} from 'rxjs/operators';
import {NgbModal, ModalDismissReasons, NgbDate} from '@ng-bootstrap/ng-bootstrap';
import { parse } from 'url';
import {Timesheet} from '../timesheetParameter.model';
@Component({
  selector: 'app-employee-home-screen',
  templateUrl: './employee-home-screen.component.html',
  styleUrls: ['./employee-home-screen.component.css']
})
export class EmployeeHomeScreenComponent implements OnInit {
  httpdata;
  closeResult: string;
  deletedTimesheet: boolean;
  constructor(private router: Router, public http: Http, public activtedRoute:ActivatedRoute,private modalService: NgbModal) { }

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
  EmpId: string;
  EmpIdNum: number;
  ngOnInit() {
    this.deletedTimesheet = false;
    this.EmpId = this.activtedRoute.snapshot.paramMap.get('id');
    this.EmpIdNum = parseInt('107832');
    var employee1 : Employee = {emailId:'', password:'', empId: this.EmpIdNum, empName: "",IsRM:0};
    this.http.post('http://localhost:59974/api/ViewTimesheet/view', employee1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaydata(data); })
  }
  
  displaydata(data) {this.httpdata = data;  }

  year;
  month;
  day; date;   day_of_week;
  startDate:number;
  endDate: number;
  firstDay;firstDate: number=0; firstMonth: number=0; firstYear: number=0;
  secondDay;secondDate: number=0; secondMonth: number=0; secondYear: number=0;
  thirdDay;thirdDate: number=0;   thirdMonth: number=0; thirdYear: number=0;
  fourthDay; fourthDate: number=0; fourthMonth: number=0;  fourthYear: number=0;
  fifthDay;fifthDate: number=0;  fifthMonth: number=0;  fifthYear: number=0;
  sixthDay;sixthDate: number=0;  sixthMonth: number=0;  sixthYear: number=0;
  seventhDay;seventhDate: number=0;  seventhMonth: number=0; seventhYear: number=0;
  weekStart; weekEnd;
  date1; date2; date3; date4; date5; date6; date7;
  selectHour11;selectHour12;selectHour13;selectHour14;selectHour15;selectHour16;selectHour17;
  selectHour21;selectHour22;selectHour23;selectHour24;selectHour25;selectHour26;selectHour27;
  selectHour31;selectHour32;selectHour33;selectHour34;selectHour35;selectHour36;selectHour37;
  selectHour41;selectHour42;selectHour43;selectHour44;selectHour45;selectHour46;selectHour47;
  selectHour51;selectHour52;selectHour53;selectHour54;selectHour55;selectHour56;selectHour57;
  selectHour61;selectHour62;selectHour63;selectHour64;selectHour65;selectHour66;selectHour67;
  selectedValue1;selectedValue2;selectedValue3;selectedValue4;selectedValue5;selectedValue6;
  weekHours: number=0; messageStatus:boolean; submitMessage:string; day1WorkHours: number=0;  day2WorkHours: number=0;   day3WorkHours: number=0;  
  day4WorkHours: number=0; day5WorkHours: number=0; day6WorkHours: number=0;  day7WorkHours: number=0;
  DateSelected(dateSelected: NgbDate) {
    this.year = dateSelected.year;
    this.month = dateSelected.month;
    this.day = dateSelected.day;
    this.day = parseInt(this.day);
    this.month = parseInt(this.month);
    this.year = parseInt(this.year);
    this.date = this.year + "-" + this.month + "-" + this.day;
    let date = new Date(this.date);
    this.day_of_week = date.getDay();
    if(this.day_of_week == 1)                 //Monday
    {
      console.log("Monday");
      this.startDate=this.day;
      if(((parseInt(this.day)+6<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)) || ((parseInt(this.day)+6<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+6<=28)&&(parseInt(this.month)==2)))
      {
        console.log("No issue");
        this.endDate=parseInt(this.day)+6;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-24;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-25;
        }
        else
        {
          this.endDate = parseInt(this.day)-22;
        }
       
      }
    }
    else if(this.day_of_week == 2)               //Tuesday
    {
      console.log("Tuesday");
      if(((parseInt(this.day)-1>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-1>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-1>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-1;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=30;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=31;
        }
        else
        {
          this.startDate=28;
        }
      }
      if(((parseInt(this.day)+5<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+5<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+5<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+5;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-25;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-26;
        }
        else
        {
          this.endDate = parseInt(this.day)-23;
        }
      }
    }
    else if(this.day_of_week == 3)        //Wednesday
    {
      console.log("Wednesday");
      if(((parseInt(this.day)-2>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-2>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-2>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-2;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+29;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+30;
        }
        else
        {
          this.startDate=parseInt(this.day)+27;
        }
      }
      if(((parseInt(this.day)+4<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+4<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+4<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+4;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-26;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-27;
        }
        else
        {
          this.endDate = parseInt(this.day)-24;
        }
      }
    }
    else if(this.day_of_week == 4)            //Thursday
    {
      console.log("Thursday");
      if(((parseInt(this.day)-3>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-3>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-3>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-3;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+28;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+29;
        }
        else
        {
          this.startDate=parseInt(this.day)+26;
        }
      }
      if(((parseInt(this.day)+3<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+3<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+3<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+3;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-27;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-28;
        }
        else
        {
          this.endDate = parseInt(this.day)-25;
        }
      }
    }
    else if(this.day_of_week == 5) //Friday
    {
      console.log("Friday");
      if(((parseInt(this.day)-4>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-4>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-4>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-4;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+27;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+28;
        }
        else
        {
          this.startDate=parseInt(this.day)+25;
        }
      }
      if(((parseInt(this.day)+2<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+2<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+2<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+2;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-28;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-29;
        }
        else
        {
          this.endDate = parseInt(this.day)-26;
        }
      }
    }
    else if(this.day_of_week == 6)        //Saturday
    {
      console.log("Saturday");
      if(((parseInt(this.day)-5>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-5>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-5>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-5;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+26;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+27;
        }
        else
        {
          this.startDate=parseInt(this.day)+24;
        }
      }
      if(((parseInt(this.day)+1<=30)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)+1<=31)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)+1<=28)&&(parseInt(this.month)==2)))
      {
        this.endDate=parseInt(this.day)+1;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.endDate = parseInt(this.day)-29;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.endDate = parseInt(this.day)-30;
        }
        else
        {
          this.endDate = parseInt(this.day)-27;
        }
      }
    }
    else if(this.day_of_week == 0)      //Sunday
    {
      console.log("Sunday");
      if(((parseInt(this.day)-6>=1)&&(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11))||((parseInt(this.day)-6>=1)&&(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)) || ((parseInt(this.day)-6>=1)&&(parseInt(this.month)==2)))
      {
        this.startDate=parseInt(this.day)-6;
      }
      else
      {
        if(parseInt(this.month)==4 || parseInt(this.month)==6 || parseInt(this.month)==9 || parseInt(this.month)==11)
        {
          this.startDate=parseInt(this.day)+25;
        }
        else if(parseInt(this.month)==1 ||parseInt(this.month)==3 || parseInt(this.month)==5 || parseInt(this.month)==7 || parseInt(this.month)==8 || parseInt(this.month)==10 || parseInt(this.month)==12)
        {
          this.startDate=parseInt(this.day)+26;
        }
        else
        {
          this.startDate=parseInt(this.day)+23;
        }
      }
      this.endDate=parseInt(this.day);
      
    }

    this.firstDate= this.startDate;
    if(parseInt(this.day)<this.firstDate)
    {
      if(parseInt(this.month)==1)  
      this.firstYear = parseInt(this.year)-1;
      else
      this.firstYear = parseInt(this.year);
      this.firstMonth = parseInt(this.month)-1;
    }
    else
    {
      this.firstYear = parseInt(this.year);
      this.firstMonth = parseInt(this.month);
    }
    this.secondDate = this.firstDate+1;         //secondDate
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.secondDate>30)
      {
        this.secondDate= this.firstDate-29;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 ||this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.secondDate>31)
          {
            this.secondDate= this.firstDate-30;
          }
        }
    else
        {
          if(this.secondDate>28)
          {
            this.secondDate= this.firstDate-27;
          }
        }   
    if(this.secondDate>parseInt(this.day)+7)    // 2nd date 30 & day 1
    {
      if(parseInt(this.month)==1)  {
      this.secondYear = parseInt(this.year)-1;
      this.secondMonth = 12
      }
      else
      {
      this.secondYear = parseInt(this.year);
      this.secondMonth = parseInt(this.month)-1;
      }
    }
    else if(this.secondDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.secondYear = parseInt(this.year)+1;
      this.secondMonth = 1;
      }
      else
      this.secondYear = parseInt(this.year);
      this.secondMonth = parseInt(this.month)+1;
    }
    else
    {
      this.secondYear = parseInt(this.year);
      this.secondMonth = parseInt(this.month);
    }

    this.thirdDate =this.firstDate+2;         //thirdDate
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 ||this.firstMonth==11)
    {
      if(this.thirdDate>30)
      {
        this.thirdDate= this.firstDate-28;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 ||this.firstMonth==12)
        {
          if(this.thirdDate>31)
          {
            this.thirdDate=this.firstDate-29;
          }
        }
    else
        {
          if(this.thirdDate>28)
          {
            this.thirdDate= this.firstDate-26;
          }
        }   
    if(this.thirdDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.thirdYear = parseInt(this.year)-1;
      else
      this.thirdYear = parseInt(this.year);
      this.thirdMonth = parseInt(this.month)-1;
    }
    else if(this.thirdDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.thirdYear = parseInt(this.year)+1;
      this.thirdMonth = 1;
      }
      else
      this.thirdYear = parseInt(this.year);
      this.thirdMonth = parseInt(this.month)+1;
    }
    else
    {
      this.thirdYear = parseInt(this.year);
      this.thirdMonth = parseInt(this.month);
    }

    this.fourthDate = this.firstDate+3;         //fourth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.fourthDate>30)
      {
        this.fourthDate= this.firstDate-27;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 ||this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.fourthDate>31)
          {
            this.fourthDate= this.firstDate-28;
          }
        }
    else
        {
          if(this.fourthDate>28)
          {
            this.fourthDate=this.firstDate-25;
          }
        }   
    if(this.fourthDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.fourthYear = parseInt(this.year)-1;
      else
      this.fourthYear = parseInt(this.year);
      this.fourthMonth = parseInt(this.month)-1;
    }
    else if(this.fourthDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.fourthYear = parseInt(this.year)+1;
      this.fourthMonth = 1;
      }
      else
      this.fourthYear = parseInt(this.year);
      this.fourthMonth = parseInt(this.month)+1;
    }
    else
    {
      this.fourthYear = parseInt(this.year);
      this.fourthMonth = parseInt(this.month);
    }

    this.fifthDate = this.firstDate+4;         //fifth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.fifthDate>30)
      {
        this.fifthDate= this.firstDate-26;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.fifthDate>31)
          {
            this.fifthDate= this.firstDate-27;
          }
        }
    else
        {
          if(this.fifthDate>28)
          {
            this.fifthDate= this.firstDate-24;
          }
        }   
    if(this.fifthDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.fifthYear = parseInt(this.year)-1;
      else
      this.fifthYear = parseInt(this.year);
      this.fifthMonth = parseInt(this.month)-1;
    }
    else if(this.fifthDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.fifthYear = parseInt(this.year)+1;
      this.fifthMonth = 1;
      }
      else
      this.fifthYear = parseInt(this.year);
      this.fifthMonth = parseInt(this.month)+1;
    }
    else
    {
      this.fifthYear = parseInt(this.year);
      this.fifthMonth = parseInt(this.month);
    }

    this.sixthDate = this.firstDate+5;         //fifth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.sixthDate>30)
      {
        this.sixthDate= this.firstDate-25;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 || this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 || this.firstMonth==12)
        {
          if(this.sixthDate>31)
          {
            this.sixthDate= this.firstDate-26;
          }
        }
    else
        {
          if(this.sixthDate>28)
          {
            this.sixthDate= this.firstDate-23;
          }
        }   
    if(this.sixthDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.sixthYear = parseInt(this.year)-1;
      else
      this.sixthYear = parseInt(this.year);
      this.sixthMonth = parseInt(this.month)-1;
    }
    else if(this.sixthDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.sixthYear = parseInt(this.year)+1;
      this.sixthMonth = 1;
      }
      else
      this.sixthYear = parseInt(this.year);
      this.sixthMonth = parseInt(this.month)+1;
    }
    else
    {
      this.sixthYear = parseInt(this.year);
      this.sixthMonth = parseInt(this.month);
    }

    this.seventhDate = this.firstDate+6;         //fifth Date
    if(this.firstMonth==4 || this.firstMonth==6 || this.firstMonth==9 || this.firstMonth==11)
    {
      if(this.seventhDate>30)
      {
        this.seventhDate= this.firstDate-24;
      }
    } 
    else if(this.firstMonth==1 ||this.firstMonth==3 ||this.firstMonth==5 || this.firstMonth==7 || this.firstMonth==8 || this.firstMonth==10 ||this.firstMonth==12)
        {
          if(this.seventhDate>31)
          {
            this.seventhDate= this.firstDate-25;
          }
        }
    else
        {
          if(this.seventhDate>28)
          {
            this.seventhDate= this.firstDate-22;
          }
        }   
    if(this.seventhDate>parseInt(this.day)+7)   // 3rd day 29 &  day 1
    {
      if(parseInt(this.month)==1)  
      this.seventhYear = parseInt(this.year)-1;
      else
      this.seventhYear = parseInt(this.year);
      this.seventhMonth = parseInt(this.month)-1;
    }
    else if(this.seventhDate+7<parseInt(this.day))   // 3rd day 2 & day 29
    {
      if(parseInt(this.month)==12) 
      { 
      this.seventhYear = parseInt(this.year)+1;
      this.seventhMonth = 1;
      }
      else
      this.seventhYear = parseInt(this.year);
      this.seventhMonth = parseInt(this.month)+1;
    }
    else
    {
      this.seventhYear = parseInt(this.year);
      this.seventhMonth = parseInt(this.month);
    }

    this.date1 = this.firstYear + "-" + this.firstMonth + "-" + this.firstDate;
    this.weekStart = this.date1;
    this.date1 = new Date(this.date1);
    this.firstDay = this.getDayName(this.date1.getDay());

    this.date2 = this.secondYear + "-" + this.secondMonth + "-" + this.secondDate;
    this.date2 = new Date(this.date2);
    this.secondDay = this.getDayName(this.date2.getDay());

    this.date3 = this.thirdYear + "-" + this.thirdMonth + "-" + this.thirdDate;
    this.date3 = new Date(this.date3);
    this.thirdDay = this.getDayName(this.date3.getDay());

    this.date4 = this.fourthYear + "-" + this.fourthMonth + "-" + this.fourthDate;
    this.date4 = new Date(this.date4);
    this.fourthDay = this.getDayName(this.date4.getDay());

    this.date5 = this.fifthYear + "-" + this.fifthMonth + "-" + this.fifthDate;
    this.date5 = new Date(this.date5);
    this.fifthDay = this.getDayName(this.date5.getDay());

    this.date6 = this.sixthYear + "-" + this.sixthMonth + "-" + this.sixthDate;
    this.date6 = new Date(this.date6);
    this.sixthDay = this.getDayName(this.date6.getDay());

    this.date7 = this.seventhYear + "-" + this.seventhMonth + "-" + this.seventhDate;
    this.weekEnd = this.date7;
    this.date7 = new Date(this.date7);
    this.seventhDay = this.getDayName(this.date7.getDay());

    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: '',timesheet1Date:this.date1, timesheet1DateEffort: 0, timesheet2DateEffort: 0,timesheet3DateEffort: 0,timesheet4DateEffort: 0,timesheet5DateEffort:0,timesheet6DateEffort:0,timesheet7DateEffort: 0,  taskDescription: '' ,timesheetStatus:''}; 
    
    this.http.post('http://localhost:59974/api/CheckTimesheetWeek/checkFirstDate', timesheet1).subscribe( (data) => { console.log(data);this.checkTimesheetDateResult(data); });
    }

    checkDateResult;
    checkTimesheetDateResult(data){
      this.checkDateResult = data['_body'];
      if(this.checkDateResult === "No timesheet exist.")
      {
        this.router.navigate(['EmployeeFillTimeSheet',this.EmpIdNum,this.year, this.month,this.day]);
      }
      else
      {
        this.deletedTimesheet = true;
        this.deletedMessage = this.checkDateResult;
      }
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

  onEditTimesheet(selectedItem: any){
    this.router.navigate(['EmployeeEditTimesheet',selectedItem.timesheetWeek,this.EmpIdNum]);
    }

    timesheetWeek:string;
    onDeleteTimesheet(selectedItem: any){
      this.deletedTimesheet =true;
      this.timesheetWeek = selectedItem.timesheetWeek;
      var timesheetDates: string[] = this.timesheetWeek.split("--",1);
    var timesheetDate : string[] = timesheetDates[0].split("-",3);
    var date: string = timesheetDate[2]+"-"+timesheetDate[1]+"-"+timesheetDate[0];
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: '',timesheet1Date:new Date(Date.parse(date)), timesheet1DateEffort: 0, timesheet2DateEffort: 0,timesheet3DateEffort: 0,timesheet4DateEffort: 0,timesheet5DateEffort: 0,timesheet6DateEffort: 0,timesheet7DateEffort: 0,  taskDescription: "",timesheetStatus:""}; 
    this.http.post('http://localhost:59974/api/DeleteTimesheet/delete', timesheet5).subscribe( (data) => { console.log(data); this.displayMessage(data);})
    var employee1 : Employee = {emailId:'', password:'', empId: this.EmpIdNum, empName: "",IsRM:0};
    this.http.post('http://localhost:59974/api/ViewTimesheet/view', employee1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaydata(data); })
  
      }
      deletedMessage:string;
      displayMessage(data){
        this.deletedMessage = data['_body'];
      }

  retrieveTimesheetData;
  displayTimesheet(data)
  {
    this.retrieveTimesheetData = data;
  }
}
