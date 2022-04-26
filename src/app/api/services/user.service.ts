import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private angularFirestore: AngularFirestore) {}

  getUserDoc(id) {
    
    
    return this.angularFirestore
    .collection('users')
    .doc(id)
    .valueChanges()
    
  }

 


  getUserList() { 
    return    this.angularFirestore.collection("users", ref => ref.where('active','==', true)).snapshotChanges();
    // return this.angularFirestore
    // .collection("users")
    // .snapshotChanges();
  }

  createUser(user: User) {

    return new Promise<any>((resolve, reject) =>{
      this.angularFirestore
        .collection("users")
        .doc(user.uid)
        .set(user)
        .then(response => {  }, error => reject(error));
    });
  }

  deleteUser(user) {
    return this.angularFirestore
      .collection("users")
      .doc(user.id)
      .delete();
  }
  
  updateUserPhoto(id, photoUrl) {
    return this.angularFirestore
      .collection("users")
      .doc(id)
      .set({
        photoURL: photoUrl
        
      }, {merge: true});
  }

  setUserPushToken(uid: string, token: any) {
    return this.angularFirestore
    .collection("users")
    .doc(uid)
    .set({
      pushToken: token
      
    }, {merge: true});
  }

  updateUser(user: User, id) {
    return this.angularFirestore
      .collection("users")
      .doc(id)
      .update({
            firstName: user.firstName ,
            lastName: user.lastName,        
            about: user.about.toString(),
            UnitNo: user.UnitNo,
            displayName: user.firstName + " " + user.lastName,
            phone: user.phone
        
      });
  }

}