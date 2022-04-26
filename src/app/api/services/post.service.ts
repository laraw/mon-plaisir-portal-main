
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Utils } from 'src/app/shared/utils';
import { Post } from '../models/post';


@Injectable({
  providedIn: 'root'
})
export class PostService {

  postsCollection: AngularFirestoreCollection<Post>;
  posts: Observable<Post[]>;
  postDoc: AngularFirestoreDocument<Post>;
  categoryPostsCollection: AngularFirestoreCollection<Post>;
  categoryPosts: Observable<Post[]>;

  constructor(public afs:AngularFirestore, private utils: Utils) {
    var todayDate = this.utils.setDateToMidnight(new Date());
    this.postsCollection = this.afs.collection('posts', ref => ref.where('expiryDate','>=', todayDate));

    // this.meetings = this.afs.collection('meetings').valueChanges();
    this.posts = this.postsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

  }

  listPosts() {
    return this.posts;

  }


  listPostByCategory(category: string) {
    var todayDate = this.utils.setDateToMidnight(new Date());
   
    this.categoryPostsCollection = this.afs.collection('posts', ref => ref.where('expiryDate','>=', todayDate).where('category','==',category));

    // this.meetings = this.afs.collection('meetings').valueChanges();
    this.categoryPosts = this.categoryPostsCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Post;
        data.id = a.payload.doc.id;
        return data;
      });
    }));

    return this.categoryPosts;
  }
  addPost(post: any) {
    let postId = this.afs.createId();
    let newPost:  Post = {
      id: postId,
      
      uid: post.uid,
      firstName: post.firstName,
      lastName: post.lastName,
      photoURL: post.photoURL != undefined ? post.photoURL : "",
      category: post.category,
      contactPhone: post.contactPhone,
      title: post.title,
      content: post.content,
      datePosted: post.datePosted,
      expiryDate: post.expiryDate,
      fileURL: post.fileURL
      
      
    }
    
    return this.postsCollection.add(newPost);
  }

  updatePost(post: Post) {
    this.postDoc = this.afs.doc(`posts/${post.id}`);
    
    return  this.postDoc.update(post);
  }




}
