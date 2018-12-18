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
  selector: 'app-employee-filltimesheet-screen',
  templateUrl: './employee-filltimesheet-screen.component.html',
  styleUrls: ['./employee-filltimesheet-screen.component.css']
})
export class EmployeeFilltimesheetScreenComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private http: Http, private router: Router) { }
  month;   year;   day;   date;   day_of_week;
  startDate:number;
  endDate: number;
  firstDay;firstDate: number=0; firstMonth: number=0; firstYear: number=0;
  secondDay;secondDate: number=0; secondMonth: number=0; secondYear: number=0;
  thirdDay;thirdDate: number=0;   thirdMonth: number=0; thirdYear: number=0;
  fourthDay; fourthDate: number=0; fourthMonth: number=0;  fourthYear: number=0;
  fifthDay;fifthDate: number=0;  fifthMonth: number=0;  fifthYear: number=0;
  sixthDay;sixthDate: number=0;  sixthMonth: number=0;  sixthYear: number=0;
  seventhDay;seventhDate: number=0;  seventhMonth: number=0; seventhYear: number=0;
  EmpId:string;
  EmpIdNum: number;
  httpdata;
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
  displaydata(data) {this.httpdata = data;  }  
  timesheetWeek: string= this.firstDate+'/'+this.firstMonth+'/'+this.firstYear+'--'+this.seventhDate+'/'+this.seventhMonth+'/'+this.seventhYear;
  weekStart: string; weekEnd: string; workDescription1: string;workDescription2: string;workDescription3: string;workDescription4: string;workDescription5: string;workDescription6: string;
  dateSupplied: Date;
  ngOnInit() {
    this.EmpId = this.activatedRoute.snapshot.paramMap.get('id');
    this.EmpIdNum = parseInt('107832');
    
    this.year= this.activatedRoute.snapshot.paramMap.get('id1');
    this.month= this.activatedRoute.snapshot.paramMap.get('id2');
    this.day= this.activatedRoute.snapshot.paramMap.get('id3');
    this.day = parseInt(this.day);
    this.month = parseInt(this.month);
    this.year = parseInt(this.year);

    var employee1 : Employee = {emailId:'', password:'', empId: this.EmpIdNum, empName: "",IsRM:0};
    this.http.post('http://localhost:59974/api/RetrieveEmployeeDetails/details', employee1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displayEmployeesDetails(data); });
    
    this.date = this.year + "-" + this.month + "-" + this.day;
    let date = new Date(this.date);
    this.dateSupplied= date;
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
          this.startDate=parseInt(this.day)+24;
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
    console.log(this.firstDate);
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
    console.log(this.secondDate);
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
    console.log(this.thirdDate);
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
    console.log(this.fourthDate);
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
    console.log(this.fifthDate);
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
    console.log(this.sixthDate);
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
    console.log(this.seventhDate);
    this.date1 = this.firstYear + "-" + this.firstMonth + "-" + this.firstDate;
    this.weekStart = this.date1;
    this.date1 = new Date(this.date1);
    this.firstDay = this.getDayName(this.date1.getDay());
    console.log(this.date1);

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

    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue1,timesheet1Date:this.date1, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    
    this.http.post('http://localhost:59974/api/ProjectEmployeeMapped/viewProjectId', timesheet1).pipe(map( (response) => response.json())).subscribe( (data) => { console.log(data);this.displaydata(data); });
    
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

  submit()
  {
      if(this.selectHour11!=null)
      {
        this.weekHours += parseInt(this.selectHour11);
        this.day1WorkHours += parseInt(this.selectHour11);
      }
      if(this.selectHour12!=null)
      {
        this.weekHours += parseInt(this.selectHour12);
        this.day2WorkHours += parseInt(this.selectHour12);
      }
      if(this.selectHour13!=null)
      {
        this.weekHours += parseInt(this.selectHour13);
        this.day3WorkHours += parseInt(this.selectHour13);
      }
      if(this.selectHour14!=null)
      {
        this.weekHours += parseInt(this.selectHour14);
        this.day4WorkHours += parseInt(this.selectHour14);
      }
      if(this.selectHour15!=null)
      {
        this.weekHours += parseInt(this.selectHour15);
        this.day5WorkHours += parseInt(this.selectHour15);
      }
      if(this.selectHour16!=null)
      {
        this.weekHours += parseInt(this.selectHour16);
        this.day6WorkHours += parseInt(this.selectHour16);
      }
      if(this.selectHour17!=null)
      {
        this.weekHours += parseInt(this.selectHour17);
        this.day7WorkHours += parseInt(this.selectHour17);
      }
    if(this.selectHour21!=null)
      {
        this.weekHours += parseInt(this.selectHour21);
        this.day1WorkHours += parseInt(this.selectHour21);
      }
      if(this.selectHour22!=null)
      {
        this.weekHours += parseInt(this.selectHour22);
        this.day2WorkHours += parseInt(this.selectHour22);
      }
      if(this.selectHour23!=null)
      {
        this.weekHours += parseInt(this.selectHour23);
        this.day3WorkHours += parseInt(this.selectHour23);
      }
      if(this.selectHour24!=null)
      {
        this.weekHours += parseInt(this.selectHour24);
        this.day4WorkHours += parseInt(this.selectHour24);
      }
      if(this.selectHour25!=null)
      {
        this.weekHours += parseInt(this.selectHour25);
        this.day5WorkHours += parseInt(this.selectHour25);
      }
      if(this.selectHour26!=null)
      {
        this.weekHours += parseInt(this.selectHour26);
        this.day6WorkHours += parseInt(this.selectHour26);
      }
      if(this.selectHour27!=null)
      {
        this.weekHours += parseInt(this.selectHour27);
        this.day7WorkHours += parseInt(this.selectHour27);
      }if(this.selectHour31!=null)
      {
        this.weekHours += parseInt(this.selectHour31);
        this.day1WorkHours += parseInt(this.selectHour31);       
      }
      if(this.selectHour32!=null)
      {
        this.weekHours += parseInt(this.selectHour32);
        this.day2WorkHours += parseInt(this.selectHour32);
      }
      if(this.selectHour33!=null)
      {
        this.weekHours += parseInt(this.selectHour33);
        this.day3WorkHours += parseInt(this.selectHour33);
      }
      if(this.selectHour34!=null)
      {
        this.weekHours += parseInt(this.selectHour34);
        this.day4WorkHours += parseInt(this.selectHour34);
      }
      if(this.selectHour35!=null)
      {
        this.weekHours += parseInt(this.selectHour35);
        this.day5WorkHours += parseInt(this.selectHour35);
      }
      if(this.selectHour36!=null)
      {
        this.weekHours += parseInt(this.selectHour36);
        this.day6WorkHours += parseInt(this.selectHour36);
      }
      if(this.selectHour37!=null)
      {
        this.weekHours += parseInt(this.selectHour37);
        this.day7WorkHours += parseInt(this.selectHour37);
      }
    if(this.selectHour41!=null)
      {
        this.weekHours += parseInt(this.selectHour41);
        this.day1WorkHours += parseInt(this.selectHour41);
      }
      if(this.selectHour42!=null)
      {
        this.weekHours += parseInt(this.selectHour42);
        this.day2WorkHours += parseInt(this.selectHour42);
      }
      if(this.selectHour43!=null)
      {
        this.weekHours += parseInt(this.selectHour43);
        this.day3WorkHours += parseInt(this.selectHour43);
      }
      if(this.selectHour44!=null)
      {
        this.weekHours += parseInt(this.selectHour44);
        this.day4WorkHours += parseInt(this.selectHour44);
      }
      if(this.selectHour45!=null)
      {
        this.weekHours += parseInt(this.selectHour45);
        this.day5WorkHours += parseInt(this.selectHour45);
      }
      if(this.selectHour46!=null)
      {
        this.weekHours += parseInt(this.selectHour46);
        this.day6WorkHours += parseInt(this.selectHour46);
      }
      if(this.selectHour47!=null)
      {
        this.weekHours += parseInt(this.selectHour47);
        this.day7WorkHours += parseInt(this.selectHour47);
      }
      if(this.selectHour51!=null)
      {
        this.weekHours += parseInt(this.selectHour51);
        this.day1WorkHours += parseInt(this.selectHour51);
      }
      if(this.selectHour52!=null)
      {
        this.weekHours += parseInt(this.selectHour52);
        this.day2WorkHours += parseInt(this.selectHour52);
      }
      if(this.selectHour53!=null)
      {
        this.weekHours += parseInt(this.selectHour53);
        this.day3WorkHours += parseInt(this.selectHour53);
      }
      if(this.selectHour54!=null)
      {
        this.weekHours += parseInt(this.selectHour54);
        this.day4WorkHours += parseInt(this.selectHour54);
      }
      if(this.selectHour55!=null)
      {
        this.weekHours += parseInt(this.selectHour55);
        this.day5WorkHours += parseInt(this.selectHour55);
      }
      if(this.selectHour56!=null)
      {
        this.weekHours += parseInt(this.selectHour56);
        this.day6WorkHours += parseInt(this.selectHour56);
      }
      if(this.selectHour57!=null)
      {
        this.weekHours += parseInt(this.selectHour57);
        this.day7WorkHours += parseInt(this.selectHour57);
      }
    if(this.selectHour61!=null)
      {
        this.weekHours += parseInt(this.selectHour61);
        this.day1WorkHours += parseInt(this.selectHour61);
      }
      if(this.selectHour62!=null)
      {
        this.weekHours += parseInt(this.selectHour62);
        this.day2WorkHours += parseInt(this.selectHour62);
      }
      if(this.selectHour63!=null)
      {
        this.weekHours += parseInt(this.selectHour63);
        this.day3WorkHours += parseInt(this.selectHour63);
      }
      if(this.selectHour64!=null)
      {
        this.weekHours += parseInt(this.selectHour64);
        this.day4WorkHours += parseInt(this.selectHour64);
      }
      if(this.selectHour65!=null)
      {
        this.weekHours += parseInt(this.selectHour65);
        this.day5WorkHours += parseInt(this.selectHour65);
      }
      if(this.selectHour66!=null)
      {
        this.weekHours += parseInt(this.selectHour66);
        this.day6WorkHours += parseInt(this.selectHour66);
      }
      if(this.selectHour67!=null)
      {
        this.weekHours += parseInt(this.selectHour67);
        this.day7WorkHours += parseInt(this.selectHour67);
      }
      if((this.weekHours)<40) 
      {
        this.submitMessage="Number of hours spent are less than 40.";
        this.messageStatus=true;
      }
      else if ((this.day1WorkHours>18))
      {
        this.submitMessage="Number of hours spent on Monday are more than 18.";
        this.messageStatus=true;
      }
      else if ((this.day2WorkHours>18))
      {
        this.submitMessage="Number of hours spent on Tuesday are more than 18.";
        this.messageStatus=true;
      }
      else if ((this.day3WorkHours>18))
      {
        this.submitMessage="Number of hours spent on Wednesday are more than 18.";
        this.messageStatus=true;
      }
      else if ((this.day4WorkHours>18))
      {
        this.submitMessage="Number of hours spent on Thursday are more than 18.";
        this.messageStatus=true;
      }
      else if ((this.day5WorkHours>18))
      {
        this.submitMessage="Number of hours spent on Friday are more than 18.";
        this.messageStatus=true;
      }
      else if ((this.day6WorkHours>18))
      {
        this.submitMessage="Number of hours spent on Saturday are more than 18.";
        this.messageStatus=true;
      }
      else if ((this.day7WorkHours>18))
      {
        this.submitMessage="Number of hours spent on Sunday are more than 18.";
        this.messageStatus=true;
      }
      else
      {
    var timesheetWeekly : weeklyTimesheetParameter = {timesheet1Date: this.date1,timesheet2Date: this.date2 , timesheet3Date: this.date3,timesheet4Date: this.date4,timesheet5Date: this.dateSupplied, timesheet6Date: this.date6, timesheet7Date: this.date7};
      console.log(timesheetWeekly.timesheet1Date, timesheetWeekly.timesheet2Date, timesheetWeekly.timesheet3Date, timesheetWeekly.timesheet4Date
      ,timesheetWeekly.timesheet5Date, timesheetWeekly.timesheet6Date, timesheetWeekly.timesheet7Date);
    this.http.post('http://localhost:59974/api/submitTimesheetWeekly/AddTimesheetWeekly', timesheetWeekly).subscribe( (data) => { console.log(data); });
        
    
    if(this.selectedValue1 != null)
    {
    var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue1,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Submitted' }; 
    console.log(timesheet1.timesheet1Date);
   this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue2 != null)
    {
      var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue2,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue3 != null)
    {
    var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue3,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue4 != null)
    {
      var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet4).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue5 != null)
    {
    var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Submitted' }; 
    this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet5).subscribe( (data) => { console.log(data); });
    }
    if(this.selectedValue6 != null)
    {
      var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Submitted' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet6).subscribe( (data) => { console.log(data); });
    }
    var timesheet7 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: '',timesheet1Date:this.dateSupplied, timesheet1DateEffort: 0, timesheet2DateEffort: 0,timesheet3DateEffort: 0,timesheet4DateEffort: 0,timesheet5DateEffort: 0,timesheet6DateEffort: 0,timesheet7DateEffort: 0, taskDescription: "",timesheetStatus:'' }; 
      console.log(timesheet7.empId,timesheet7.timesheet1Date);
    this.http.post('http://localhost:59974/api/EmailTrigger/EditTimesheet', timesheet7).subscribe( (data) => { console.log(data); });

      setTimeout(()=> {
        this.router.navigate(['/EmployeeHome']);
      }, 900);
    }
    }   

    employeeDetails;
    displayEmployeesDetails(data) {
      this.employeeDetails = data;
    }

    save()
  {
    if(this.selectHour11!=null)
    {
      this.weekHours += parseInt(this.selectHour11);
      this.day1WorkHours += parseInt(this.selectHour11);
    }
    if(this.selectHour12!=null)
    {
      this.weekHours += parseInt(this.selectHour12);
      this.day2WorkHours += parseInt(this.selectHour12);
    }
    if(this.selectHour13!=null)
    {
      this.weekHours += parseInt(this.selectHour13);
      this.day3WorkHours += parseInt(this.selectHour13);
    }
    if(this.selectHour14!=null)
    {
      this.weekHours += parseInt(this.selectHour14);
      this.day4WorkHours += parseInt(this.selectHour14);
    }
    if(this.selectHour15!=null)
    {
      this.weekHours += parseInt(this.selectHour15);
      this.day5WorkHours += parseInt(this.selectHour15);
    }
    if(this.selectHour16!=null)
    {
      this.weekHours += parseInt(this.selectHour16);
      this.day6WorkHours += parseInt(this.selectHour16);
    }
    if(this.selectHour17!=null)
    {
      this.weekHours += parseInt(this.selectHour17);
      this.day7WorkHours += parseInt(this.selectHour17);
    }
  if(this.selectHour21!=null)
    {
      this.weekHours += parseInt(this.selectHour21);
      this.day1WorkHours += parseInt(this.selectHour21);
    }
    if(this.selectHour22!=null)
    {
      this.weekHours += parseInt(this.selectHour22);
      this.day2WorkHours += parseInt(this.selectHour22);
    }
    if(this.selectHour23!=null)
    {
      this.weekHours += parseInt(this.selectHour23);
      this.day3WorkHours += parseInt(this.selectHour23);
    }
    if(this.selectHour24!=null)
    {
      this.weekHours += parseInt(this.selectHour24);
      this.day4WorkHours += parseInt(this.selectHour24);
    }
    if(this.selectHour25!=null)
    {
      this.weekHours += parseInt(this.selectHour25);
      this.day5WorkHours += parseInt(this.selectHour25);
    }
    if(this.selectHour26!=null)
    {
      this.weekHours += parseInt(this.selectHour26);
      this.day6WorkHours += parseInt(this.selectHour26);
    }
    if(this.selectHour27!=null)
    {
      this.weekHours += parseInt(this.selectHour27);
      this.day7WorkHours += parseInt(this.selectHour27);
    }if(this.selectHour31!=null)
    {
      this.weekHours += parseInt(this.selectHour31);
      this.day1WorkHours += parseInt(this.selectHour31);       
    }
    if(this.selectHour32!=null)
    {
      this.weekHours += parseInt(this.selectHour32);
      this.day2WorkHours += parseInt(this.selectHour32);
    }
    if(this.selectHour33!=null)
    {
      this.weekHours += parseInt(this.selectHour33);
      this.day3WorkHours += parseInt(this.selectHour33);
    }
    if(this.selectHour34!=null)
    {
      this.weekHours += parseInt(this.selectHour34);
      this.day4WorkHours += parseInt(this.selectHour34);
    }
    if(this.selectHour35!=null)
    {
      this.weekHours += parseInt(this.selectHour35);
      this.day5WorkHours += parseInt(this.selectHour35);
    }
    if(this.selectHour36!=null)
    {
      this.weekHours += parseInt(this.selectHour36);
      this.day6WorkHours += parseInt(this.selectHour36);
    }
    if(this.selectHour37!=null)
    {
      this.weekHours += parseInt(this.selectHour37);
      this.day7WorkHours += parseInt(this.selectHour37);
    }
  if(this.selectHour41!=null)
    {
      this.weekHours += parseInt(this.selectHour41);
      this.day1WorkHours += parseInt(this.selectHour41);
    }
    if(this.selectHour42!=null)
    {
      this.weekHours += parseInt(this.selectHour42);
      this.day2WorkHours += parseInt(this.selectHour42);
    }
    if(this.selectHour43!=null)
    {
      this.weekHours += parseInt(this.selectHour43);
      this.day3WorkHours += parseInt(this.selectHour43);
    }
    if(this.selectHour44!=null)
    {
      this.weekHours += parseInt(this.selectHour44);
      this.day4WorkHours += parseInt(this.selectHour44);
    }
    if(this.selectHour45!=null)
    {
      this.weekHours += parseInt(this.selectHour45);
      this.day5WorkHours += parseInt(this.selectHour45);
    }
    if(this.selectHour46!=null)
    {
      this.weekHours += parseInt(this.selectHour46);
      this.day6WorkHours += parseInt(this.selectHour46);
    }
    if(this.selectHour47!=null)
    {
      this.weekHours += parseInt(this.selectHour47);
      this.day7WorkHours += parseInt(this.selectHour47);
    }
    if(this.selectHour51!=null)
    {
      this.weekHours += parseInt(this.selectHour51);
      this.day1WorkHours += parseInt(this.selectHour51);
    }
    if(this.selectHour52!=null)
    {
      this.weekHours += parseInt(this.selectHour52);
      this.day2WorkHours += parseInt(this.selectHour52);
    }
    if(this.selectHour53!=null)
    {
      this.weekHours += parseInt(this.selectHour53);
      this.day3WorkHours += parseInt(this.selectHour53);
    }
    if(this.selectHour54!=null)
    {
      this.weekHours += parseInt(this.selectHour54);
      this.day4WorkHours += parseInt(this.selectHour54);
    }
    if(this.selectHour55!=null)
    {
      this.weekHours += parseInt(this.selectHour55);
      this.day5WorkHours += parseInt(this.selectHour55);
    }
    if(this.selectHour56!=null)
    {
      this.weekHours += parseInt(this.selectHour56);
      this.day6WorkHours += parseInt(this.selectHour56);
    }
    if(this.selectHour57!=null)
    {
      this.weekHours += parseInt(this.selectHour57);
      this.day7WorkHours += parseInt(this.selectHour57);
    }
  if(this.selectHour61!=null)
    {
      this.weekHours += parseInt(this.selectHour61);
      this.day1WorkHours += parseInt(this.selectHour61);
    }
    if(this.selectHour62!=null)
    {
      this.weekHours += parseInt(this.selectHour62);
      this.day2WorkHours += parseInt(this.selectHour62);
    }
    if(this.selectHour63!=null)
    {
      this.weekHours += parseInt(this.selectHour63);
      this.day3WorkHours += parseInt(this.selectHour63);
    }
    if(this.selectHour64!=null)
    {
      this.weekHours += parseInt(this.selectHour64);
      this.day4WorkHours += parseInt(this.selectHour64);
    }
    if(this.selectHour65!=null)
    {
      this.weekHours += parseInt(this.selectHour65);
      this.day5WorkHours += parseInt(this.selectHour65);
    }
    if(this.selectHour66!=null)
    {
      this.weekHours += parseInt(this.selectHour66);
      this.day6WorkHours += parseInt(this.selectHour66);
    }
    if(this.selectHour67!=null)
    {
      this.weekHours += parseInt(this.selectHour67);
      this.day7WorkHours += parseInt(this.selectHour67);
    }
    if((this.weekHours)<40) 
    {
      this.submitMessage="Number of hours spent are less than 40.";
      this.messageStatus=true;
    }
    else if ((this.day1WorkHours>18))
    {
      this.submitMessage="Number of hours spent on Monday are more than 18.";
      this.messageStatus=true;
    }
    else if ((this.day2WorkHours>18))
    {
      this.submitMessage="Number of hours spent on Tuesday are more than 18.";
      this.messageStatus=true;
    }
    else if ((this.day3WorkHours>18))
    {
      this.submitMessage="Number of hours spent on Wednesday are more than 18.";
      this.messageStatus=true;
    }
    else if ((this.day4WorkHours>18))
    {
      this.submitMessage="Number of hours spent on Thursday are more than 18.";
      this.messageStatus=true;
    }
    else if ((this.day5WorkHours>18))
    {
      this.submitMessage="Number of hours spent on Friday are more than 18.";
      this.messageStatus=true;
    }
    else if ((this.day6WorkHours>18))
    {
      this.submitMessage="Number of hours spent on Saturday are more than 18.";
      this.messageStatus=true;
    }
    else if ((this.day7WorkHours>18))
    {
      this.submitMessage="Number of hours spent on Sunday are more than 18.";
      this.messageStatus=true;
    }
    else
    {

      var timesheetWeekly : weeklyTimesheetParameter = {timesheet1Date: this.date1,timesheet2Date: this.date2 , timesheet3Date: this.date3,timesheet4Date: this.date4,timesheet5Date: this.dateSupplied, timesheet6Date: this.date6, timesheet7Date: this.date7};
      this.http.post('http://localhost:59974/api/submitTimesheetWeekly/AddTimesheetWeekly', timesheetWeekly).subscribe( (data) => { console.log(data); });
    
      if(this.selectedValue1 != null)
      {
      var timesheet1 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue1,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour11, timesheet2DateEffort: this.selectHour12,timesheet3DateEffort: this.selectHour13,timesheet4DateEffort: this.selectHour14,timesheet5DateEffort: this.selectHour15,timesheet6DateEffort: this.selectHour16,timesheet7DateEffort: this.selectHour17,  taskDescription: this.workDescription1 ,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue2 != null)
      {
        var timesheet2 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue2,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour21, timesheet2DateEffort: this.selectHour22,timesheet3DateEffort: this.selectHour23,timesheet4DateEffort: this.selectHour24,timesheet5DateEffort: this.selectHour25,timesheet6DateEffort: this.selectHour26,timesheet7DateEffort: this.selectHour27, taskDescription: this.workDescription2,timesheetStatus:'Saved' }; 
        this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue3 != null)
      {
      var timesheet3 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue3,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour31, timesheet2DateEffort: this.selectHour32,timesheet3DateEffort: this.selectHour33,timesheet4DateEffort: this.selectHour34,timesheet5DateEffort: this.selectHour35,timesheet6DateEffort: this.selectHour36,timesheet7DateEffort: this.selectHour37,  taskDescription: this.workDescription3,timesheetStatus:'Saved'}; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet3).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue4 != null)
      {
        var timesheet4 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue4,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour41, timesheet2DateEffort: this.selectHour42,timesheet3DateEffort: this.selectHour43,timesheet4DateEffort: this.selectHour44,timesheet5DateEffort: this.selectHour45,timesheet6DateEffort: this.selectHour46,timesheet7DateEffort: this.selectHour47, taskDescription: this.workDescription4,timesheetStatus:'Saved' }; 
        this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue5 != null)
      {
      var timesheet5 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue5,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour51, timesheet2DateEffort: this.selectHour52,timesheet3DateEffort: this.selectHour53,timesheet4DateEffort: this.selectHour54,timesheet5DateEffort: this.selectHour55,timesheet6DateEffort: this.selectHour56,timesheet7DateEffort: this.selectHour57,  taskDescription: this.workDescription5,timesheetStatus:'Saved' }; 
      this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet1).subscribe( (data) => { console.log(data); });
      }
      if(this.selectedValue6 != null)
      {
        var timesheet6 : Timesheet = {RMId:0,empId: this.EmpIdNum, projectId: this.selectedValue6,timesheet1Date:this.dateSupplied, timesheet1DateEffort: this.selectHour61, timesheet2DateEffort: this.selectHour62,timesheet3DateEffort: this.selectHour63,timesheet4DateEffort: this.selectHour64,timesheet5DateEffort: this.selectHour65,timesheet6DateEffort: this.selectHour66,timesheet7DateEffort: this.selectHour67, taskDescription: this.workDescription6,timesheetStatus:'Saved' }; 
        this.http.post('http://localhost:59974/api/AddTimesheet/AddProjectTimesheet', timesheet2).subscribe( (data) => { console.log(data); });
      }


   
    setTimeout(()=> {
      this.router.navigate(['/EmployeeHome']);
    }, 900);

    }
    }   
}
