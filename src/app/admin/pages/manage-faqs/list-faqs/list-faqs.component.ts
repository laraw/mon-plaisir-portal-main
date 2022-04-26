import { Component, OnInit } from '@angular/core';
import { NgbCollapse, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Faq } from 'src/app/api/models/faq';
import { FaqService } from 'src/app/api/services/faq.service';
import { NotificationService } from 'src/app/api/services/notification.service';



@Component({
  selector: 'app-list-faqs',
  templateUrl: './list-faqs.component.html',
  styleUrls: ['./list-faqs.component.css']
})
export class ListFaqsComponent implements OnInit {

  public isCollapsed = false;
  public faqs: Faq[];


  constructor(private faqService: FaqService, private modalService: NgbModal, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.faqService.getFaqs().subscribe(faqs => {
      //console.log(tasks);
      this.faqs = faqs;
    });

  }

  removeFaq(faq: Faq) {
    this.faqService.deleteFaq(faq.id).then( response => {

      this.notificationService.successNotification("Faq has been removed successfully");
    }
    )
  }
 
}


