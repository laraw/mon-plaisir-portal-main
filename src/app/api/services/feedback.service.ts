import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Feedback } from '../models/feedback';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  feedbacksCollection: AngularFirestoreCollection<Feedback>;
  feedbacks: Observable<Feedback[]>;
  publishedFeedback: Observable<Feedback[]>
  feedbackDoc: AngularFirestoreDocument<Feedback>;

  constructor(public afs:AngularFirestore) {
    this.feedbacksCollection = this.afs.collection('feedback', ref => ref.orderBy('dateLogged','asc'));
    // this.feedbacks = this.afs.collection('feedbacks').valueChanges();
    this.feedbacks = this.feedbacksCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Feedback;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }

  getFeedbackDoc(id) {
    return this.afs
    .collection('feedback')
    .doc(id)
    .valueChanges()
    
  }

  getOpenFeedback(): Observable<Feedback[]> {

    let today = new Date();
    let openFeedback = this.afs.collection('feedback', ref => ref.where('status','==','open'));

    return openFeedback.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Feedback;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }


  getFeedback() {
    return this.feedbacks; 
  }



  addFeedback(feedback: any) {
    let feedbackId = this.afs.createId();
    let newfeedback:  Feedback = {
      id: feedbackId,
      dateLogged: feedback.dateLogged,

      feedback: feedback.feedback,
      userLoggedFirstName: feedback.userLoggedFirstName,
      userLoggedLastName: feedback.userLoggedLastName,
      userLoggedUid: feedback.userLoggedUid,
      status: feedback.currentStatus
      
    }


    
    return this.feedbacksCollection.add(newfeedback);
  }

  deleteFeedback(id: string) {
    this.feedbackDoc = this.afs.doc(`feedback/${id}`);
    return  this.feedbackDoc.delete();
  }

  updateFeedback(feedback: Feedback) {
    this.feedbackDoc = this.afs.doc(`feedback/${feedback.id}`);
    return  this.feedbackDoc.update(feedback);
  }



}
