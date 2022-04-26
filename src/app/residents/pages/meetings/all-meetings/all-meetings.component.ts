import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
  NgbDateStruct,
  NgbModal,
  NgbTimepickerConfig,
  NgbTimeStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbTime } from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";
import { Meeting } from "src/app/api/models/meeting";
import { MeetingService } from "src/app/api/services/meeting.service";
import { NotificationService } from "src/app/api/services/notification.service";
import { UserService } from "src/app/api/services/user.service";
import { Utils } from "src/app/shared/utils";

@Component({
  selector: "app-all-meetings",
  templateUrl: "./all-meetings.component.html"
})


export class AllMeetingsComponent implements OnInit {
  // public title: string;
  // public input: string;
  // public publish: boolean;
//   public model: NgbDateStruct;
//   time: NgbTimeStruct = {hour: 8, minute: 30, second: 0};
  public meetings: Meeting[];


  meetingsFiltered: Meeting[];
  totalPages: number;
  currentPage: number = 1;
  lastPage: number;
  recordsPerPage: number = 10;
  showMeetings: boolean = true;



  public nextMeeting: Meeting;
  public localUser = JSON.parse(localStorage.getItem('user'));
  public userAttended: boolean = false;

  registerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required)
  })
  constructor(
    private meetingService: MeetingService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private utils: Utils,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.meetingService.getMeetings().subscribe(meetings => {
        //console.log(tasks);
        this.meetings = meetings;

        this.meetingsFiltered =  this.utils.paginate(this.meetings, this.recordsPerPage, this.currentPage); 
        
        
        
        this.totalPages = this.utils.calculatePagesCount(this.recordsPerPage, this.meetings.length);
        this.showMeetings = meetings.length > 0;

  
      });

  }

  
  next() {
    this.currentPage++;

    this.meetingsFiltered = this.utils.paginate(this.meetings, this.recordsPerPage, this.currentPage);

  }

  selectPage(pageNumber: number) {

    this.currentPage = pageNumber;
  
    this.meetingsFiltered = this.utils.paginate(this.meetings, this.recordsPerPage, pageNumber);
    
  }
  previous() {

    this.currentPage--;
    this.meetingsFiltered = this.utils.paginate(this.meetings, this.recordsPerPage, this.currentPage);

  }

  counter(i: number) {
    return new Array(i);
  }


      
  }

