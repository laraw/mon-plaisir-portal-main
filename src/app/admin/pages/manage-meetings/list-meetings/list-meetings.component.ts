import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { DatePipe } from '@angular/common';
import {formatDate} from '@angular/common';
import {Inject, LOCALE_ID, Pipe, PipeTransform} from '@angular/core';
import { Meeting } from 'src/app/api/models/meeting';
import { MeetingService } from 'src/app/api/services/meeting.service';
import { NotificationService } from 'src/app/api/services/notification.service';



@Component({
  selector: 'app-list-meetings',
  templateUrl: './list-meetings.component.html',
  styleUrls: ['./list-meetings.component.css']
})
export class ListMeetingsComponent implements OnInit {

  public isCollapsed = false;
  public meetings: Meeting[];
  public todayDate = new Date().toJSON().slice(0,10).replace(/-/g,'/');
  public selectedDate: string;

  constructor(private meetingService: MeetingService, private modalService: NgbModal, private notificationService: NotificationService, @Inject(LOCALE_ID) private datePipe: DatePipe) { }

  ngOnInit(): void {
    // console.log(this.todayDate);
    this.meetingService.getMeetings().subscribe(meetings => {
      //console.log(tasks);
      this.meetings = meetings;
   

    });

  }

 



}


