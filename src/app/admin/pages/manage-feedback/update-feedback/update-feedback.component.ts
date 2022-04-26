import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Feedback, Comment } from 'src/app/api/models/feedback';
import { FeedbackService } from 'src/app/api/services/feedback.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { UserService } from 'src/app/api/services/user.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-update-feedback',
  templateUrl: './update-feedback.component.html',
  styleUrls: ['./update-feedback.component.css']
})
export class UpdateFeedbackComponent implements OnInit {

  public localUser = JSON.parse(localStorage.getItem('user'));

  @Input() feedback: Feedback;

  comments: Comment[] = []

  feedbackForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    comment: new FormControl('', Validators.required),
    newStatus: new FormControl(''),
   
  })


  constructor(
    private modalService:NgbModal,
    private notificationService: NotificationService,
    private utils: Utils,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private feedbackService: FeedbackService


  ) { }

  ngOnInit(): void {



    this.userService.getUserDoc(this.localUser.uid.toString()).subscribe(res => {
      this.localUser = res;
      this.feedbackForm.patchValue({
        firstName: this.localUser.firstName.toString(),
        lastName: this.localUser.lastName.toString(),

      })

    })

    
  }

  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  onSubmit() {
  
    this.comments = this.feedback.comments ? this.feedback.comments : [];

    this.comments.push({
      uid: this.localUser.uid.toString(),
      firstName: this.feedbackForm.value.firstName,
      lastName: this.feedbackForm.value.lastName,
      comment: this.feedbackForm.value.comment,
      commentDate: new Date(),
      oldStatus: this.feedback.status,
      newStatus: this.feedbackForm.value.newStatus != "" ? this.feedbackForm.value.newStatus : this.feedback.status
    })
    this.feedback.comments = this.comments;
    
    this.feedback.status = this.feedbackForm.value.newStatus != "" ? this.feedbackForm.value.newStatus : this.feedback.status;
    
    this.feedbackService.updateFeedback(this.feedback)
      .then(() => {  
          this.notificationService.successNotification("Maintenance request updated successfully."); 
        this.modalService.dismissAll() 
        } )
        .catch(error =>
          this.notificationService.errorNotification(error)
          );

  }

}
