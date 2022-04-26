import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild,
} from '@angular/animations';
import { AuthService } from 'src/app/api/services/auth.service';
import { UserService } from 'src/app/api/services/user.service';


export const fader =
  trigger('routeAnimations', [
    transition('* <=> *', [
      // Set a default  style for enter and leave
      query(':enter, :leave', [
        style({
          position: 'absolute',
          left: 0,
          width: '100%',
          opacity: 0,
          transform: 'scale(0) translateY(100%)',
        }), ,
      ], { optional: true }),
      // Animate the new page in
      query(':enter', [
        animate('2s ease', style({ opacity: 5, transform: 'scale(1) translateY(0)' }), ),
      ],{ optional: true })
    ]),
]);


@Component({
  selector: 'app-resident',
  templateUrl: './resident.component.html',

  animations: [fader]
})

export class ResidentComponent {
  user: any;
  
  showAdmin: Observable<boolean>;    
  constructor(private userService: UserService, private authService: AuthService) {
    this.showAdmin = this.authService.isUserAdmin();

  }
  ngOnInit() {
  
    this.user = JSON.parse(localStorage.getItem('user'));
    // this.showAdmin = this.user.role === "admin" ? true : false;
    
  



   }
   prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  

   ngAfterViewInit()	{
   
   }
}


