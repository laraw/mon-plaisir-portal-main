import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Faq } from '../models/faq';


@Injectable({
  providedIn: 'root'
})
export class FaqService {

  faqsCollection: AngularFirestoreCollection<Faq>;
  publishedFaqsCollection: AngularFirestoreCollection<Faq>;
  faqs: Observable<Faq[]>;
  publishedFaqs: Observable<Faq[]>
  faqDoc: AngularFirestoreDocument<Faq>;

  constructor(public afs:AngularFirestore) {
    this.faqsCollection = this.afs.collection('faqs', ref => ref.orderBy('title','asc'));
    // this.faqs = this.afs.collection('faqs').valueChanges();
    this.faqs = this.faqsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Faq;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    this.publishedFaqsCollection = this.afs.collection("faqs",ref => ref.where('publish','==', true).orderBy('title','asc')  );
    // this.faqs = this.afs.collection('faqs').valueChanges();
    this.publishedFaqs = this.publishedFaqsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Faq;
        data.id = a.payload.doc.id;
        return data;
      });
    }));
  }

  getFaqDoc(id) {
    return this.afs
    .collection('faqs')
    .doc(id)
    .valueChanges()
    
  }


  getFaqs() {
    return this.faqs; 
  }

  getPublishedFaqs() {
    return this.publishedFaqs;
  }

  addFaq(faq: any) {
    let faqId = this.afs.createId();
    let newfaq:  Faq = {
      id: faqId,
      title: faq.title,
      content: faq.content,
      publish: faq.publish
    }
    
    return this.faqsCollection.add(newfaq);
  }

  deleteFaq(id: string) {
    this.faqDoc = this.afs.doc(`faqs/${id}`);
    return  this.faqDoc.delete();
  }

  updateFaq(faq: Faq) {
    this.faqDoc = this.afs.doc(`faqs/${faq.id}`);
    return  this.faqDoc.update(faq);
  }



}
