import { Component, OnInit } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { SwPush } from '@angular/service-worker';

import { mergeMapTo, tap } from 'rxjs/operators';
import { Message } from 'src/app/api/models/message';
import { AuthService } from 'src/app/api/services/auth.service';
import { MessageService } from 'src/app/api/services/message.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { UserService } from 'src/app/api/services/user.service';
import { Utils } from 'src/app/shared/utils';
import { AngularFireMessagingModule } from '@angular/fire/messaging';

@Component({
    selector: 'dashboard-cmp',
  
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.css']
})


export class DashboardComponent implements OnInit{
user: any = JSON.parse(localStorage.getItem("user"));
uid: string;
message;
messages: Message[];
showMessages: boolean = false;
token = null;
  
// readonly VAPID_PUBLIC_KEY = "BBevjuaNQP_z_CRa0_LXtZ9kQPdVah2uOgJzJ68cgnx9R9zphoHcJsHR0C-wDqt5wBrdhF5DbtFN3uFAbSzaU9Y";

// // ngOnInit() {}
//   public canvas : any;
//   public ctx;
//   public chartColor;
//   public chartEmail;
//   public chartHours;
   constructor(private authService: AuthService,

     private notificationService: NotificationService, 
     private userService: UserService,
     private messagesService: MessageService,
     private utils: Utils,
     private swPush: SwPush,
     private afMessaging: AngularFireMessaging
     ) {

   }
    ngOnInit(){

        // this.requestPermission();
      
        
        // this.afMessaging.onMessage(function(payload) {
        //     this.notificationService.infoNotification(payload);
        //     console.log(payload);   
        // })

   

        
        // this.messagesService.listMessages().subscribe(res => {
        //     this.messages = res;
        //     if(this.messages.length > 0)  {
        //         this.messages.forEach(message => {
        //             if(!this.userReadMessage(message)) {
        //                 this.showMessages = true;
        //             }
        //         })
        //     }

            
            
            
        // })

        // this.swPush.requestSubscription({
        //     serverPublicKey: this.VAPID_PUBLIC_KEY
        // })
        // .then(sub =>
        //     {   
        //         // console.log(JSON.stringify(sub));
        //         let subStringify = JSON.stringify(sub);
        //         let subscription = JSON.parse(subStringify);

        //         // console.log(subscription);
        //         this.messagesService.addPushSubscriber(subscription, this.user).then(() => {
        //             console.log("done")

                    
        //         });
        //     } 
        
        
        // )
        // .catch(err => console.error("Could not subscribe to notifications", err));
   
            
    }

    requestPermission() {
      return this.afMessaging.requestToken.pipe(
        tap(token => {
          console.log('Store token to server: ', token);
          this.authService.updatePushToken(token, this.user.uid);
        })
      );
    }
   
    getMessages() {
      return this.afMessaging.messages;
    }
   
    deleteToken() {
      if (this.token) {
        this.afMessaging.deleteToken(this.token);
        this.token = null;
      }
    }

    convertTimestampDate(timestamp: any) {
        return this.utils.converTimestampToDate(timestamp);

    }

    markAsRead(message: Message) {
        let usersRead =  message.usersRead != undefined ? message.usersRead : [];
        
        usersRead.push({ uid: this.user.uid, displayName:  this.user.displayName, dateRead: new Date() });
        message.usersRead = usersRead;
        this.messagesService.markAsUserRead(message).then(()=> this.notificationService.successNotification("Marked as read")).catch(err =>this.notificationService.errorNotification(err));
        

    }

    userReadMessage(message: Message) {
        if(message.usersRead != undefined) {
            if(message.usersRead.find(m => m.uid == this.user.uid)) {
                return true;
            }
        }
        return false;
    }

    // subscribeToNotifications() {

    //     this.swPush.requestSubscription({
    //         serverPublicKey: this.VAPID_PUBLIC_KEY
    //     })
    //     .then(sub =>
    //         {   
    //             // console.log(JSON.stringify(sub));
    //             let subStringify = JSON.stringify(sub);
    //             let subscription = JSON.parse(subStringify);

    //             // console.log(subscription);
    //             this.messagesService.addPushSubscriber(subscription).then(() => {
    //                 console.log("done")

                    
    //             });
    //         } 
        
        
    //     )
    //     .catch(err => console.error("Could not subscribe to notifications", err));
    // }

    // requestPermission() {
    //     this.messagingService.requestPermission
    //       .pipe(mergeMapTo(this.messagingService.tokenChanges))
    //       .subscribe(
    //         (token) => {
               
                
                

            
    //         },
    //         (error) => { console.error(error); },  
    //       );
    //   }


}


