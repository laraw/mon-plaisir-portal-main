import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from "../../api/services/auth.service";
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { first, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  user: any;

  constructor(
    public authService: AuthService,
    public router: Router,
    public userService: UserService
  ){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    
    

    this.authService.checkAuthState().pipe(
        tap(user => {
          if (!user) {
            this.router.navigate(['login']);
            return false;
          } 
        })
      )
      .subscribe()
    if(this.authService.isLoggedIn !== true) {     
      console.log("not logged in")
      this.router.navigate(['login']);
      return false;
    }
    if(next.data.active) {
      let user = JSON.parse(localStorage.getItem('user'));

    }


    if(next.data.roles) {
     
      let user = JSON.parse(localStorage.getItem('user'));
      this.userService.getUserDoc(user.uid).subscribe(result => {
        this.user = result; 
       
        if (next.data.roles && next.data.roles.indexOf(this.user.role) === -1) {
          
          // role not authorised so redirect to home page
          this.router.navigate(['/']);
          return false;
         }
      })
    }
    return true;
  }
  
}
