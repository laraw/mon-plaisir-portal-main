import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { FaqService } from 'src/app/api/services/faq.service';
import { NotificationService } from 'src/app/api/services/notification.service';

@Component({
  selector: 'app-create-faq',
  templateUrl: './create-faq.component.html',
  styleUrls: ['./create-faq.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateFaqComponent implements OnInit {
  public title: string;
  public input: string;
  public publish: boolean;


  constructor(private faqService: FaqService, private modalService: NgbModal, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }
 openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  addFaq() {
    let newFaq: any = {
      title: this.title,
      content: this.input,
      publish: this.publish

    }
    this.faqService.addFaq(newFaq)
      .then(response => { 
         if(response != undefined) {
          this.title = "";
          this.input = "";
          this.publish = false;
          this.notificationService.successNotification("Faq has been added successfully");
          this.modalService.dismissAll();
         }
        
         
       })
  }


}
