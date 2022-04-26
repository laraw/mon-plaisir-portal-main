import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MessageService } from 'src/app/api/services/message.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-sendmessages',
  templateUrl: './sendmessages.component.html',
  styleUrls: ['./sendmessages.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class SendmessagesComponent implements OnInit {

  expireAfterDays: number = 7;
  msg: string;
  push: boolean = false;
  
  
  constructor(private utils: Utils, private messagesService: MessageService, private modalService: NgbModal, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  sendMessage() {
    let messageDate = this.utils.setDateToMidnight(new Date());
    let expiryDate = new Date();
    expiryDate.setDate(messageDate.getDate() + this.expireAfterDays);

    
    let message = {
      messageDate: messageDate,
      message: this.msg,
      expiryDate: expiryDate,
      sendPush: this.push != undefined ? this.push : false
    }
    this.messagesService.addMessage(message)
      .then(() => {
      this.notificationService.successNotification("Message has been sent successfully.");
      this.modalService.dismissAll();
    })
    .catch(err => {
      this.notificationService.errorNotification(err);

    });

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

}
