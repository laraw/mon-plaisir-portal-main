import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './api/services/auth.service';
import { UserService } from './api/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mon-plaisir-portal';
  user: any;
  
  showAdmin$: Observable<boolean>;    
  constructor(private userService: UserService, private authService: AuthService) {}
  ngOnInit() {
  
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.showAdmin = this.user.role === "admin" ? true : false;
    // this.showAdmin$ = this.authService.isUserAdmin;



   }
   prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  

   ngAfterViewInit()	{
   
   }
}
