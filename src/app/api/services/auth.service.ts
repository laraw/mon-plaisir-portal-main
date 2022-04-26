import { Injectable, NgZone } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from "@angular/fire/firestore";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import firebase from "firebase/app";
import "@firebase/auth";
import { AnimationFrameScheduler } from "rxjs/internal/scheduler/AnimationFrameScheduler";
import { UserService } from "./user.service";
import { DeviceDetectorService } from 'ngx-device-detector';
import { NotificationService } from "./notification.service";
import { first, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  userData: User; // Save logged in user data
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}
  private  isAdmin = new BehaviorSubject<boolean>(this.hasAdminToken());


  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private toastrService: ToastrService,
    private userService: UserService,
    private deviceService: DeviceDetectorService,
    private notificationService: NotificationService

  ) {
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     console.log("--- LOG SIGN IN GET USER FROM AUTH STATE ---")
    //     console.log(user);
    //     this.userData = user;
    //     localStorage.setItem("user", JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem("user"));
    //   } else {
    //     localStorage.setItem("user", null);
    //     JSON.parse(localStorage.getItem("user"));
    //   }
    // });
  }

  // Sign in with email/password
  SignIn(email, password) {
    console.log("Signing in attempt " + email)
    console.log("Signing in attempt " + password)
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log("Logged in successfully")
   
        this.ngZone.run(() => {
          // console.log(result.user);
        let fullUser: any;
        this.loggedIn.next(true);
        this.userService.getUserDoc(result.user.uid).subscribe(res => {
          console.log("User found successfully")
          fullUser = res;
          if(fullUser.role == "admin") {
            console.log("Setting up admin role")
            localStorage.setItem('role', 'admin');
            this.isAdmin.next(true);
            
          }
          this.SetUserData(fullUser);

        }
          
        )
        });
        
        
        

        //  this.SetUserData(result.user).then(() => this.router.navigate(['dashboard']));
      })
      .catch((error) => {
        this.toastrService.error(error.message);
      });
  }

  SetUserData(user) {
    
    
    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.uid}`
    // );
    
    // console.log(role);
    
    this.checkAuthState().subscribe(res => {
      
      if(res) {
        console.log("Auth state checked response found")
        const userData: User = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified,
          role: user.role
          
        };
       
        
        localStorage.setItem("user", JSON.stringify(userData));
        
        location.href = "/residents";
        // return userRef.set(userData, {
        //   merge: true,
        // });
      }
    })

  }

  ForgotPassword(passwordResetEmail) {
    return this.afAuth
      .sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        this.toastrService.success(
          "Password reset has been sent - check your inbox"
        );
      })
      .catch((error) => {
        this.toastrService.error(error.message);
      });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
   
    var test = this.getCurrentUser();


    const user = JSON.parse(localStorage.getItem("user"));


    
    return user !== null ? true : false;
  }

  isUserAdmin() : Observable<boolean> {

    return this.isAdmin.asObservable();
   }


  


  SignOut() {
    console.log("Signing out")
    this.loggedIn.next(false);
    return this.afAuth.signOut().then(() => {
      this.clearUserCache().then(() => { 

        this.router.navigate(['loggedout']);
      })
      

    });
  }

  async clearUserCache() {
    localStorage.removeItem('role');
    this.isAdmin.next(false);
    return localStorage.removeItem("user");
  }

  checkAuthState() {
    return this.afAuth.authState.pipe(first())
 }


 emailSignup(email: string, password: string) {
  this.afAuth.createUserWithEmailAndPassword(email, password)
  .then(value => {
   console.log('Success', value);
   this.router.navigateByUrl('/dashboard');
  })
  .catch(error => {
    console.log('Something went wrong: ', error);
  });
}



  


  createNewUserData(user, firstname, lastname, unitno) {
  const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName == null ? firstname + " " + lastname : "",
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      firstName: firstname,
      lastName: lastname,
      role: "resident",
      active: true,
      admin: false,
      UnitNo: unitno
    };

    return this.userService
      .createUser(userData)
      .then(() =>
        this.toastrService.success("User has been created successfully")
      )
      .catch((error) => this.toastrService.error(error));
  }

  DeactivateUser(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      active: false,
    };

    return userRef
      .set(userData, {
        merge: true,
      })
      .then(() => this.toastrService.success("User has been deactivated"))
      .catch(() => this.toastrService.error("Something has gone wrong"));
  }

  CreateUserWithPasswordLink(email, firstname = "", lastname = "", unitNo="") {
    var randPassword = Array(10)
      .fill("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz")
      .map(function (x) {
        return x[Math.floor(Math.random() * x.length)];
      })
      .join("");
    return this.afAuth
      .createUserWithEmailAndPassword(email, randPassword)
      .then((result) => {
        this.afAuth.sendPasswordResetEmail(email);
        this.createNewUserData(result.user, firstname, lastname, unitNo);
        this.toastrService.success(email + " " + "invited successfully");
      })
      .catch((error) => {
        this.toastrService.error(error.message);
      });
  }

  // ONLY WORKS WHEN FIRST LOGGED IN

  hasAdminToken() {
    return !!localStorage.getItem('role');
  }
  getCurrentUser() {
    

    return this.afAuth.user;
    
  }

  public async updatePushToken(token: string, uid: string) {

    try {
      const devices = await this.afs.firestore.collection('Devices').where('token', '==', token).get();

      if (devices.empty) {
        const deviceInfo = this.deviceService.getDeviceInfo();
        const data = {
          token: token,
          userId: uid,
          deviceType: 'web',
          deviceInfo: {
            browser: deviceInfo.browser,
            userAgent: deviceInfo.userAgent
          },
          createdAt: new Date()
        };

        await this.afs.firestore.collection('Devices').add(data);
        this.notificationService.successNotification("You have been subscribed to receive messages.")
      } else {
       
      }
    } catch (error) {
      
    }
  }
}
