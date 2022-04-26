import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreCollectionGroup, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Booking, UserBooking } from '../models/booking';

import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  bookingsCollection: AngularFirestoreCollection<Booking>;
  userBookingsCollection: AngularFirestoreCollection<UserBooking>;
  bookingUserBookingsCollection: AngularFirestoreCollectionGroup<UserBooking>;
  userBookings: Observable<UserBooking[]>;
  bookings: Observable<Booking[]>;
  publishedBookings: Observable<Booking[]>
  bookingDoc: AngularFirestoreDocument<Booking>;
  

  constructor(public afs:AngularFirestore, private notificationService: NotificationService) {

    this.bookingsCollection = this.afs
    .collection('bookings')
    //.orderBy("startTime","asc"));
    // this.bookings = this.afs.collection('bookings').valueChanges();
    this.bookings = this.bookingsCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
        const data = a.payload.doc.data() as Booking;
        data.id = a.payload.doc.id;
        return data;
    })}))


    //.orderBy("startTime","asc"));
    // this.bookings = this.afs.collection('bookings').valueChanges();

  }

 
  getBookingDoc(id) {
    return this.afs
    .collection('bookings')
    .doc(id)
    .valueChanges()
    
  }



  getBookingsForDate(requestedDate: Date) {
    // let tomorrowDate = new Date();
    
    // tomorrowDate.setDate(requestedDate.getDate() + 1);
    // tomorrowDate.setHours(0,0);



    this.bookingsCollection = this.afs
    .collection('bookings', ref => ref
    .where('bookingDate','==', requestedDate)
    // .where("bookingDate","<",tomorrowDate)
    );
    //.orderBy("startTime","asc"));
    // this.bookings = this.afs.collection('bookings').valueChanges();
    this.bookings = this.bookingsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Booking;
        data.id = a.payload.doc.id;
        return data;
      })
    }));

    return this.bookings;

  }


getUserBookings(uid: string) {


  this.userBookingsCollection = this.afs
  .collection('usersbookings', ref => ref
  .where("uid","==",uid)
  .where("checkedOut","==",false)
  .orderBy("bookingDate","asc")
  );
  //.orderBy("startTime","asc"));
  // this.bookings = this.afs.collection('bookings').valueChanges();
  this.userBookings = this.userBookingsCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as UserBooking;
      data.id = a.payload.doc.id;
      return data;
    })
  }));

  return this.userBookings;
  
}

getBookingUserBookings(uid: string, requestedDate: Date) {

 
  this.bookingUserBookingsCollection = this.afs
  .collectionGroup('usersbookings', ref => ref
  .where("uid","==",uid)
  .where('bookingDate','>=', requestedDate)
  .orderBy("bookingDate","asc")
  .orderBy("startTime","asc")

  );
  //.orderBy("startTime","asc"));
  // this.bookings = this.afs.collection('bookings').valueChanges();

  this.userBookings = this.bookingUserBookingsCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as UserBooking;
      data.id = a.payload.doc.id;
      return data;
    })
  }));

  return this.userBookings;
  
}

getAllUserBookings(requestedDate: Date) {

 
  this.bookingUserBookingsCollection = this.afs
  .collectionGroup('usersbookings', ref => ref
  .where('bookingDate','>=', requestedDate)
  .orderBy("bookingDate","asc")
  .orderBy("startTime","asc")

  );
  //.orderBy("startTime","asc"));
  // this.bookings = this.afs.collection('bookings').valueChanges();

  this.userBookings = this.bookingUserBookingsCollection.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as UserBooking;
      data.id = a.payload.doc.id;
      return data;
    })
  }));

  return this.userBookings;
  
}


cancelUserBooking(booking: UserBooking) {


  this.afs.doc(`bookings/${booking.bookingId}/usersbookings/${booking.id}`).delete()
  .then(
  () => this.notificationService.successNotification("Your booking was cancelled successfully."))
  .catch(
    res => {
      this.notificationService.errorNotification(res);
    }
  );
}
 
  getBookings() {
    return this.bookings; 
  }


  updateBooking(booking: Booking) {
    
    this.bookingDoc = this.afs.doc(`bookings/${booking.id}`);
    return  this.bookingDoc.set(booking, { merge: true });
  }

  checkIn(booking: UserBooking) {
    return  this.afs.doc(`bookings/${booking.bookingId}/usersbookings/${booking.id}`).set(
      {
        checkedIn: true
      }
    , {merge: true}).then(() => this.notificationService.successNotification("Checked in successfully.")).catch(err => this.notificationService.errorNotification(err));
    
  }

  checkOut(booking: UserBooking) {
    return  this.afs.doc(`bookings/${booking.bookingId}/usersbookings/${booking.id}`).set(
      {
        checkedOut: true
      }
    , {merge: true}).then(() => this.notificationService.successNotification("Checked in successfully.")).catch(err => this.notificationService.errorNotification(err));
    
  }


  createUserBookings(bookings: Booking[], user: any) {

    var batch = this.afs.firestore.batch();
    bookings.forEach(booking => {
        let id = this.afs.createId();
  
        const userBookingsRef = this.afs.collection(`bookings/${booking.id}/usersbookings`).doc(id).ref;
        batch.set(userBookingsRef , {
            uid: user.uid,
            firstName: user.firstName,
            lastName: user.lastName,
            bookingDate: booking.bookingDate,
            unitNo: user.UnitNo,

            bookingId: booking.id,
            startTime: booking.startTime,
            checkedIn: false,
            checkedOut: false
          
        });
        // const bookingsRef = this.afs.collection('bookings').doc(booking.id).ref;
        // batch.set(bookingsRef , {
        //     availableSlots: booking.availableSlots - 1
          
        // }, {merge: true});

    })

    return batch.commit();
   


  }


}
