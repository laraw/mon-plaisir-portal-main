import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaintenanceRequest, Comment } from 'src/app/api/models/maintenance-request';
import { MaintenanceRequestService } from 'src/app/api/services/maintenance-request.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { UserService } from 'src/app/api/services/user.service';
import { Utils } from 'src/app/shared/utils';



@Component({
  selector: 'app-update-maintenance',
  templateUrl: './update-maintenance.component.html',
  styleUrls: ['./update-maintenance.component.css']
})
export class UpdateMaintenanceComponent implements OnInit {
  public localUser = JSON.parse(localStorage.getItem('user'));

  @Input() maintenancerequest: MaintenanceRequest;

  comments: Comment[] = []

  maintenanceForm = new FormGroup({
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
    private maintenanceService: MaintenanceRequestService


  ) { }

  ngOnInit(): void {



    this.userService.getUserDoc(this.localUser.uid.toString()).subscribe(res => {
      this.localUser = res;
      this.maintenanceForm.patchValue({
        firstName: this.localUser.firstName.toString(),
        lastName: this.localUser.lastName.toString(),

      })

    })

    
  }

  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  onSubmit() {
  
    this.comments = this.maintenancerequest.comments ? this.maintenancerequest.comments : [];

    this.comments.push({
      uid: this.localUser.uid.toString(),
      firstName: this.maintenanceForm.value.firstName,
      lastName: this.maintenanceForm.value.lastName,
      comment: this.maintenanceForm.value.comment,
      commentDate: new Date(),
      oldStatus: this.maintenancerequest.currentStatus,
      newStatus: this.maintenanceForm.value.newStatus != "" ? this.maintenanceForm.value.newStatus : this.maintenancerequest.currentStatus
    })
    this.maintenancerequest.comments = this.comments;
    
    this.maintenancerequest.currentStatus = this.maintenanceForm.value.newStatus != "" ? this.maintenanceForm.value.newStatus : this.maintenancerequest.currentStatus;
    
    this.maintenanceService.updateMaintenanceRequest(this.maintenancerequest)
      .then(() => {  
          this.notificationService.successNotification("Maintenance request updated successfully."); 
        this.modalService.dismissAll() 
        } )
        .catch(error =>
          this.notificationService.errorNotification(error)
          );

  }



}
