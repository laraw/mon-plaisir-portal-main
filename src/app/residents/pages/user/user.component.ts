import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/api/services/user.service';


@Component({
    selector: 'app-user',
    templateUrl: 'user.component.html'
})

export class UserComponent implements OnInit {
    user: any; 
    localUser = JSON.parse(localStorage.getItem('user'));
    photoPath: string;
    contactInitials: string = "";
    userEditForm = new FormGroup({
        firstName: new FormControl('', Validators.required)  ,
        lastName: new FormControl('', Validators.required),
        UnitNo: new FormControl('', [ Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(100)]),
        about: new FormControl(''),
        phone: new FormControl('', Validators.pattern("^04[0-9]{8}"))
      });

    constructor(public userService: UserService, private fb: FormBuilder, private toastrService: ToastrService ){}
    ngOnInit() {    
        // console.log(localStorage.get("user"));

       
        this.userService.getUserDoc(this.localUser.uid).subscribe(res => {
          this.user = res;
          this.contactInitials =  this.user.firstName[0] + this.user.lastName[0];
          this.photoPath = this.user.photoURL;
          this.userEditForm.patchValue({
            firstName: this.user.firstName ,
            lastName: this.user.lastName,
            UnitNo: this.user.UnitNo,            
            about: this.user.about,
            phone: this.user.phone
          })
          
        })

    }

    onSubmit() {
        
        this.userService.updateUser(this.userEditForm.value, this.localUser.uid).then(() => this.toastrService.success("Update profile was successful!"));

    }

    setUserProfileImage($event: any) {
      this.photoPath = $event;
      this.userService.updateUserPhoto(this.user.uid, $event);
    }

    
}