import { Component, Input, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Faq } from "src/app/api/models/faq";
import { FaqService } from "src/app/api/services/faq.service";
import { NotificationService } from "src/app/api/services/notification.service";

@Component({
  selector: "app-edit-faq",
  templateUrl: "./edit-faq.component.html",
  styleUrls: ["./edit-faq.component.css"],
})
export class EditFaqComponent implements OnInit {

  @Input() faq: Faq;



  constructor(
    private faqService: FaqService,
    private modalService: NgbModal,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void { 
    

  }


  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  editFaq() {
    this.faqService.updateFaq(this.faq).then(response => {
      this.notificationService.successNotification("Faq has been updated successfully.");
        this.modalService.dismissAll();
    });
  }

  // addFaq() {
  //   let newFaq: any = {
  //     title: this.title,
  //     content: this.input,
  //     publish: this.publish,
  //   };
  //   this.faqService.addFaq(newFaq).then((response) => {
  //     if (response != undefined) {
  //       this.notificationService.successNotification(
  //         "Faq has been added successfully"
  //       );
  //       this.modalService.dismissAll();
  //     }
  //   });
  // }
}
