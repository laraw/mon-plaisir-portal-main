import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  NgbDateStruct,
  NgbModal,
  NgbTimepickerConfig,
  NgbTimeStruct,
} from "@ng-bootstrap/ng-bootstrap";
import { NgbTime } from "@ng-bootstrap/ng-bootstrap/timepicker/ngb-time";
import { MeetingService } from "src/app/api/services/meeting.service";
import { NotificationService } from "src/app/api/services/notification.service";


@Component({
  selector: "app-create-meeting",
  templateUrl: "./create-meeting.component.html",
  styleUrls: ["./create-meeting.component.css"],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbTimepickerConfig],
})
export class CreateMeetingComponent implements OnInit {
  // public title: string;
  // public input: string;
  // public publish: boolean;
  public model: NgbDateStruct;
  time: NgbTimeStruct = {hour: 8, minute: 30, second: 0};
  public meetingDate: Date;
  public meetingTime: string;
  public description: string;
  public location: string;
  public status: string;

  constructor(
    private meetingService: MeetingService,
    private modalService: NgbModal,
    private notificationService: NotificationService,
    config: NgbTimepickerConfig
  ) {
    config.seconds = false;
    config.spinners = false;
    config.size = "small";

  }

  ngOnInit(): void {}
  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }



  addMeeting() {
    let newMeeting: any = {
      meetingDate: new Date(
        this.model.year,
        this.model.month - 1,
        this.model.day
      ),
      meetingTime: this.getTimeString(this.time),
      description:
        this.description == undefined
          ? "Body Corporate meeting"
          : this.description,
      location: this.location == undefined ? "Gym" : this.location,
      status: this.status
    };

    this.meetingService.addMeeting(newMeeting).then((response) => {
      if (response != undefined) {
        this.notificationService.successNotification(
          "Meeting has been added successfully"
        );
        this.modalService.dismissAll();
      }
    });
  }

  getTimeString(time: any) {
    let hour =
      time.hour < 12 ? "0" + time.hour.toString() : time.hour.toString();
    let minute =
      time.minute < 10 ? "0" + time.minute.toString() : time.minute.toString();
    let period = time.hour < 12 ? "AM" : "PM";

    return hour + ":" + minute + " " + period;
  }

  dateSelected(date: any) {
    this.model = date;
  }

}
