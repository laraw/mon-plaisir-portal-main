import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SharedModule } from './shared/shared.module';
import { Utils } from './shared/utils';
import { DatePipe, AsyncPipe } from '@angular/common';
import { AuthService } from './api/services/auth.service';
import { NotificationService } from './api/services/notification.service';
import { UserService } from './api/services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { LoginComponent } from './pages/login/login.component';
import { SignoutComponent } from './pages/signout/signout.component';
import { VerifyEmailComponent } from './pages/verify-email/verify-email.component';
import { RouterModule } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const config = environment.firebaseConfig;


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    SignoutComponent,
    RegisterComponent,
  ],
  imports: [
 
    FormsModule,
    ReactiveFormsModule,
   
    BrowserModule,
    RouterModule.forRoot(AppRoutes, {
      useHash: true,
      relativeLinkResolution: 'legacy'
    }),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(config),
    NgbModule,


    SharedModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: true,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [AuthService, UserService, NotificationService, DatePipe, Utils, AsyncPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
