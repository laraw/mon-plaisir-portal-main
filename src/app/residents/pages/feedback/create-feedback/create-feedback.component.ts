import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FeedbackService } from 'src/app/api/services/feedback.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { UserService } from 'src/app/api/services/user.service';


@Component({
  selector: 'app-create-feedback',
  templateUrl: './create-feedback.component.html',
  styleUrls: ['./create-feedback.component.css']
})
export class CreateFeedbackComponent implements OnInit {

  public localUser = JSON.parse(localStorage.getItem('user'));

  feedbackForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    feedback: new FormControl('', Validators.required),
 
  })

  constructor(
    private modalService:NgbModal,
    private notificationService: NotificationService,
    private userService: UserService,
    private feedbackService: FeedbackService

  ) { }

  ngOnInit(): void {

    this.userService.getUserDoc(this.localUser.uid.toString()).subscribe(res => {
      this.localUser = res;
      this.feedbackForm.patchValue({
        firstName: this.localUser.firstName.toString(),
        lastName: this.localUser.lastName.toString()

      })

    })
  }

  
  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  onSubmit() {

    let date = new Date(); 
    let feedback = {
      dateLogged: date,
      userLoggedFirstName: this.feedbackForm.value.firstName,
      userLoggedLastName: this.feedbackForm.value.lastName,
      userLoggedUid: this.localUser.uid.toString(),
      currentStatus: 'open',
      feedback: this.feedbackForm.value.feedback

    }
    this.feedbackService.addFeedback(feedback)
      .then(() => {  
          this.notificationService.successNotification("Feedback  logged successfully."); 
        this.modalService.dismissAll() 
        } )
        .catch(error =>
          this.notificationService.errorNotification(error)
          );

  }


}
