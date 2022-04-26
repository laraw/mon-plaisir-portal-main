import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Meeting } from '../models/meeting';


@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  meetingsCollection: AngularFirestoreCollection<Meeting>;
  meetings: Observable<Meeting[]>;
  publishedMeetings: Observable<Meeting[]>
  meetingDoc: AngularFirestoreDocument<Meeting>;

  constructor(public afs:AngularFirestore) {
    this.meetingsCollection = this.afs.collection('meetings', ref => ref.orderBy('meetingDate','desc'));
    // this.meetings = this.afs.collection('meetings').valueChanges();
    this.meetings = this.meetingsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Meeting;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }

  getMeetingDoc(id) {
    return this.afs
    .collection('meetings')
    .doc(id)
    .valueChanges()
    
  }

  getFutureMeetings(): Observable<Meeting[]> {

    let today = new Date();
    let futureMeetings = this.afs.collection('meetings', ref => ref.where('meetingDate','>=',today).orderBy("meetingDate", "asc"));

    return futureMeetings.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Meeting;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }


  getMeetings() {
    return this.meetings; 
  }



  addMeeting(meeting: any) {
    let meetingId = this.afs.createId();
    let newmeeting:  Meeting = {
      id: meetingId,
      meetingDate: meeting.meetingDate,
      meetingTime: meeting.meetingTime,
      description: meeting.description,
      location: meeting.location,
      status: meeting.status
      
    }
    
    return this.meetingsCollection.add(newmeeting);
  }

  deleteMeeting(id: string) {
    this.meetingDoc = this.afs.doc(`meetings/${id}`);
    return  this.meetingDoc.delete();
  }

  updateMeeting(meeting: Meeting) {
    this.meetingDoc = this.afs.doc(`meetings/${meeting.id}`);
    return  this.meetingDoc.update(meeting);
  }



}
