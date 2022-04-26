import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/api/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string;
  userPassword: string;
  
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    console.log("hello")
    

  }

  signin() {
    this.authService.SignIn(this.userName, this.userPassword)
  }

}
