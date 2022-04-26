import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import {
  NgbDateStruct,
  NgbModal,
  NgbTimepickerConfig,
  NgbTimeStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbTime } from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";
import { Meeting, Attendees } from "src/app/api/models/meeting";
import { MeetingService } from "src/app/api/services/meeting.service";
import { NotificationService } from "src/app/api/services/notification.service";
import { UserService } from "src/app/api/services/user.service";
import { Utils } from "src/app/shared/utils";


@Component({
  selector: "app-register-meeting",
  templateUrl: "./register-meeting.component.html",
  encapsulation: ViewEncapsulation.None,
  styles: [ ' .form-check input[type=checkbox], .form-check-radio input[type=radio] {     opacity: 1 !important; position: absolute !important; visibility: visible !important; }']
})


export class RegisterMeetingComponent implements OnInit {
  // public title: string;
  // public input: string;
  // public publish: boolean;
//   public model: NgbDateStruct;
//   time: NgbTimeStruct = {hour: 8, minute: 30, second: 0};
  public meetings: Meeting[];
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
    this.meetingService.getFutureMeetings().subscribe(meetings => {
        //console.log(tasks);
        this.meetings = meetings;
        // console.log(this.meetings.sort((a, b) => this.utils.converTimestampToDate(b.meetingDate).getTime() - this.utils.converTimestampToDate(a.meetingDate).getTime()));
        this.nextMeeting = this.meetings[0];
        if(this.nextMeeting != undefined) {
          if(this.nextMeeting.attendees != undefined) {
            if(this.nextMeeting.attendees.find(x => x.uid == this.localUser.uid)) {
              this.userAttended = true;
            }
          }
         
        }
   
  
      });

      this.userService.getUserDoc(this.localUser.uid.toString()).subscribe(res => {
        this.localUser = res;
        this.registerForm.patchValue({
          firstName: this.localUser.firstName.toString(),
          lastName: this.localUser.lastName.toString()

        })

      })

      


  }

  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  onSubmit() {
    const attendees: Attendees[] = this.nextMeeting.attendees != undefined ? this.nextMeeting.attendees : [];
    attendees.push({
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      emailAddress: this.localUser.email,
      uid: this.localUser.uid

    })
    this.nextMeeting.attendees = attendees;
    this.meetingService.updateMeeting(this.nextMeeting).then(() => {  this.modalService.dismissAll(); this.notificationService.successNotification("You have been registered successfully")}).catch(() => this.notificationService.successNotification("You were not successfully registered."));


  }


  unregister() {
    
    let attendees: Attendees[] = this.nextMeeting.attendees != undefined ? this.nextMeeting.attendees : [];

    attendees = attendees.filter(function( obj ) {
      return obj.uid !== this.localUser.uid;
    }, this);

    this.nextMeeting.attendees = attendees;
    this.meetingService.updateMeeting(this.nextMeeting).then(() => { this.userAttended = false; this.notificationService.successNotification("You were unregistered successfully") }).catch(() => this.notificationService.errorNotification("You were not unregistered successfully."));
    

  }
    



      
  }

//   addMeeting() {
//     let newMeeting: any = {
//       meetingDate: new Date(
//         this.model.year,
//         this.model.month - 1,
//         this.model.day
//       ),
//       meetingTime: this.getTimeString(this.time),
//       description:
//         this.description == undefined
//           ? "Body Corporate meeting"
//           : this.description,
//       location: this.location == undefined ? "Gym" : this.location,
//       status: this.status
//     };

//     this.meetingService.addMeeting(newMeeting).then((response) => {
//       if (response != undefined) {
//         this.notificationService.successNotification(
//           "Meeting has been added successfully"
//         );
//         this.modalService.dismissAll();
//       }
//     });
//   }

//   getTimeString(time: any) {
//     let hour =
//       time.hour < 12 ? "0" + time.hour.toString() : time.hour.toString();
//     let minute =
//       time.minute < 10 ? "0" + time.minute.toString() : time.minute.toString();
//     let period = time.hour < 12 ? "AM" : "PM";

//     return hour + ":" + minute + " " + period;
//   }

//   dateSelected(date: any) {
//     this.model = date;
//   }

