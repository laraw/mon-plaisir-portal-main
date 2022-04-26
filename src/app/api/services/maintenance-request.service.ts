import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MaintenanceRequest } from '../models/maintenance-request';


@Injectable({
  providedIn: 'root'
})
export class MaintenanceRequestService {

  maintenancerequestsCollection: AngularFirestoreCollection<MaintenanceRequest>;
  maintenancerequests: Observable<MaintenanceRequest[]>;
  publishedMaintenanceRequests: Observable<MaintenanceRequest[]>
  maintenancerequestDoc: AngularFirestoreDocument<MaintenanceRequest>;

  constructor(public afs:AngularFirestore) {
    this.maintenancerequestsCollection = this.afs.collection('maintenancerequests', ref => ref.orderBy('date','desc'));
    // this.maintenancerequests = this.afs.collection('maintenancerequests').valueChanges();
    this.maintenancerequests = this.maintenancerequestsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as MaintenanceRequest;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }

  getMaintenanceRequestDoc(id) {
    return this.afs
    .collection('maintenancerequests')
    .doc(id)
    .valueChanges()
    
  }

  getOpenMaintenanceRequests(): Observable<MaintenanceRequest[]> {

    let today = new Date();
    let openMaintenanceRequests = this.afs.collection('maintenancerequests', ref => ref.where('currentStatus','==','open'));

    return openMaintenanceRequests.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as MaintenanceRequest;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }


  getMaintenanceRequests() {
    return this.maintenancerequests; 
  }



  addMaintenanceRequest(maintenancerequest: any) {
    let maintenancerequestId = this.afs.createId();
    let newmaintenancerequest:  MaintenanceRequest = {
      id: maintenancerequestId,
      date: maintenancerequest.date,
      classification: maintenancerequest.classification,
      description: maintenancerequest.description,
      userLoggedFirstName: maintenancerequest.userLoggedFirstName,
      userLoggedLastName: maintenancerequest.userLoggedLastName,
      userLoggedUid: maintenancerequest.userLoggedUid,
      currentStatus: maintenancerequest.currentStatus,
      priority: maintenancerequest.priority,
      photo: maintenancerequest.photo
      
    }


    
    return this.maintenancerequestsCollection.add(newmaintenancerequest);
  }

  deleteMaintenanceRequest(id: string) {
    this.maintenancerequestDoc = this.afs.doc(`maintenancerequests/${id}`);
    return  this.maintenancerequestDoc.delete();
  }

  updateMaintenanceRequest(maintenancerequest: MaintenanceRequest) {
    this.maintenancerequestDoc = this.afs.doc(`maintenancerequests/${maintenancerequest.id}`);
    return  this.maintenancerequestDoc.update(maintenancerequest);
  }



}
