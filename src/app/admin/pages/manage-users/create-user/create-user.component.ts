import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/api/services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreateUserComponent implements OnInit {

  email: string;
  firstName: string;
  lastName: string;
  unitNo: string;
  
  constructor(private modalService: NgbModal, private authService: AuthService) { }

  ngOnInit(): void {

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  inviteUser() {  
    
    this.authService.CreateUserWithPasswordLink(this.email, this.firstName, this.lastName, this.unitNo)
      .then(response => { 
         if(response != undefined) {
          this.modalService.dismissAll();
         }
        
         
       })
      

  }

}
