import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModal, NgbTimepickerConfig, NgbTimeStruct } from '@ng-bootstrap/ng-bootstrap';
import { Meeting } from 'src/app/api/models/meeting';
import { MeetingService } from 'src/app/api/services/meeting.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-edit-meeting',
  templateUrl: './edit-meeting.component.html',
  styleUrls: ['./edit-meeting.component.css'],
  providers: [NgbTimepickerConfig]
})
export class EditMeetingComponent implements OnInit {

  @Input() meeting: Meeting;
  existingDate: NgbDateStruct;
  time: NgbTimeStruct = {hour: 8, minute: 30, second: 0};
  minutesName: string;
  model: NgbDateStruct;

  constructor(
    private meetingService: MeetingService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    private utils: Utils,
    config: NgbTimepickerConfig
  ) {
    config.seconds = false;
    config.spinners = false;
    config.size = "small";

  }
  

  ngOnInit(): void { 
   


  }


  openLg(content) {

   
    let currentMeetingDate = this.utils.converTimestampToDate(this.meeting.meetingDate);
    let meetingTimeArray = this.meeting.meetingTime.split(':');
    this.time.hour = parseInt(meetingTimeArray[0]);
    this.time.minute = parseInt(meetingTimeArray[1]);
    this.minutesName = "/minutes/Minutes_"  + this.meeting.description + "_" + currentMeetingDate.getDate().toString() + "_" + (currentMeetingDate.getMonth() - 1).toString() + "_" + currentMeetingDate.getFullYear().toString();
   
    this.existingDate = { day: currentMeetingDate.getDate(), month: currentMeetingDate.getMonth() + 1, year: currentMeetingDate.getFullYear()};
    this.model = this.existingDate;
    this.modalService.open(content, { size: "lg" });
  }

  editMeeting() {

    let newMeeting: Meeting = {
      id: this.meeting.id,
      meetingDate: new Date(
        this.model.year,
        this.model.month - 1,
        this.model.day
      ),
      meetingTime: this.getTimeString(this.time),
      description: this.meeting.description,
      location: this.meeting.location,
      status: this.meeting.status,
      minutesUrl: this.meeting.minutesUrl != undefined ? this.meeting.minutesUrl : ""
    };

    this.meetingService.updateMeeting(newMeeting).then(response => {
      this.notificationService.successNotification("Meeting has been updated successfully.");
        this.modalService.dismissAll();
    });
  }

  dateSelected(date: any) {
    this.model = date;
  }

  setMeetingMinutes(minutes: string) {

    this.meeting.minutesUrl = minutes;
  }

  getTimeString(time: any) {
    let hour =
      time.hour < 12 ? "0" + time.hour.toString() : time.hour.toString();
    let minute =
      time.minute < 10 ? "0" + time.minute.toString() : time.minute.toString();
    let period = time.hour < 12 ? "AM" : "PM";

    return hour + ":" + minute + " " + period;
  }
}
