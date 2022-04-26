import { Component, OnInit } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/api/models/user';
import { AuthService } from 'src/app/api/services/auth.service';
import { UserService } from 'src/app/api/services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  users: User[];
  gridData: any[];

  colData= [
    { field: 'displayName', header: 'Name' },
    { field: 'email', header: 'Email' },
    { field: 'UnitNo', header: 'Unit #' }
  ]

  constructor(    
    private userService: UserService, private toastrService: ToastrService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadGrid();
    
  }

  loadGrid() {
    this.userService.getUserList().subscribe(res => {
      this.gridData = res.map( e => {

        return {
        
          displayName: e.payload.doc.get("displayName"),
          email: e.payload.doc.get("email"),
          UnitNo: e.payload.doc.get("UnitNo")
         
          //  ...e.payload.doc.data() 
        } as User;
      })
     });  
     
  }

  updateUserAdmin(user) {

    
  }

  removeUser(user) {
    // this.userService.deleteUser(user.uid).then(() => this.toastrService.success("User removed successfully"));
    // this.authService.removeUser(user);
    this.authService.DeactivateUser(user);
  }

  makeInactive() {

  }

  clickme() {
    console.log('it worked')
  }

}
