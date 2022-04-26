import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getuid } from 'process';
import { MaintenanceRequestService } from 'src/app/api/services/maintenance-request.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { UserService } from 'src/app/api/services/user.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-create-maintenance',
  templateUrl: './create-maintenance.component.html',
  styleUrls: ['./create-maintenance.component.css']
})
export class CreateMaintenanceComponent implements OnInit {
  public localUser = JSON.parse(localStorage.getItem('user'));
  maintenancePhotoName: string;
  maintenancePhotoUrl: string;

  maintenanceForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    classification: new FormControl('', Validators.required),
    priority: new FormControl(''),
    description: new FormControl('', Validators.required)
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
   this.maintenancePhotoName = "/maintenance/" + this.utils.guid();
   
    this.userService.getUserDoc(this.localUser.uid.toString()).subscribe(res => {
      this.localUser = res;
      this.maintenanceForm.patchValue({
        firstName: this.localUser.firstName.toString(),
        lastName: this.localUser.lastName.toString()

      })

    })
  }

  
  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }

  setMaintenancePhoto(photoUrl: string) {

    this.maintenancePhotoUrl = photoUrl;
  }


  onSubmit() {
  
    let date = new Date(); 
    let maintenancerequest = {
      date: date,
      classification: this.maintenanceForm.value.classification,
      description: this.maintenanceForm.value.description,
      userLoggedFirstName: this.maintenanceForm.value.firstName,
      userLoggedLastName: this.maintenanceForm.value.lastName,
      userLoggedUid: this.localUser.uid.toString(),
      currentStatus: 'open',
      priority: this.maintenanceForm.value === 'isUrgent' ? true : false,
      photo: this.maintenancePhotoUrl

    }
    this.maintenanceService.addMaintenanceRequest(maintenancerequest)
      .then(() => {  
          this.notificationService.successNotification("Maintenance request logged successfully."); 
        this.modalService.dismissAll() 
        } )
        .catch(error =>
          this.notificationService.errorNotification(error)
          );

  }




}
