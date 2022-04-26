import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    constructor(private toastrService: ToastrService) {

    }

    successNotification(message) {

        this.toastrService.success(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">'  + message + '</span>',
            "",
            {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-" + 'top' + "-" + 'right'
            }
          );

    }

    errorNotification(message) {

        this.toastrService.error(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
              "",
              {
                timeOut: 4000,
                enableHtml: true,
                closeButton: true,
                toastClass: "alert alert-danger alert-with-icon",
                positionClass: "toast-" + 'top' + "-" + 'right'
              }
            );

    }

    infoNotification(message) {
        this.toastrService.info(
            '<span data-notify="icon" class="nc-icon nc-bell-55"></span><span data-notify="message">' + message + '</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-info alert-with-icon",
                positionClass: "toast-" + 'top' + "-" + 'right'
              }
            );
    }

}