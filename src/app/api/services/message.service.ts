
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/utils';
import { Message } from '../models/message';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  messagesCollection: AngularFirestoreCollection<Message>;
  messages: Observable<Message[]>;
  messageDoc: AngularFirestoreDocument<Message>;


  constructor(public afs:AngularFirestore, private utils: Utils) {
    var todayDate = this.utils.setDateToMidnight(new Date())
    this.messagesCollection = this.afs.collection('messages', ref => ref.where('expiryDate','>=', todayDate));

    // this.meetings = this.afs.collection('meetings').valueChanges();
    this.messages = this.messagesCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Message;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }

  listMessages() {
    return this.messages;

  }
  addMessage(message: any) {
    let messageId = this.afs.createId();
    let newMessage:  Message = {
      id: messageId,
      messageDate: message.messageDate,
      message: message.message,
      expiryDate: message.expiryDate
      
    }
    
    return this.messagesCollection.add(newMessage);
  }

  markAsUserRead(message: Message) {
    this.messageDoc = this.afs.doc(`messages/${message.id}`);
    
    return  this.messageDoc.update(message);
  }

  addPushSubscriber(sub: any, user: any) {
    sub.uid = user.uid;
    return this.afs.collection("subscribers").add(sub);
  }




}
