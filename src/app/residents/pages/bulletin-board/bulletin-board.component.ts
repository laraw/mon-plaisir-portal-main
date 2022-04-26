import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Post } from 'src/app/api/models/post';
import { NotificationService } from 'src/app/api/services/notification.service';
import { PostService } from 'src/app/api/services/post.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-bulletin-board',
  templateUrl: './bulletin-board.component.html',
  styleUrls: ['./bulletin-board.component.css']
})
export class BulletinBoardComponent implements OnInit {
  posts: Post[];
  categories: string[] = [];
  categoryResult: any[] = [];
  user = JSON.parse(localStorage.getItem('user'));

  constructor(private postService: PostService, private utils: Utils, private storage: AngularFireStorage, private notificationService: NotificationService) { }

  ngOnInit(): void {

    this.postService.listPosts().subscribe(res => {
      this.posts = res;
      this.categories = this.posts.map(obj => obj.category);
      this.categories.forEach(result => {

        if (!this.categoryResult.find(x => x.category == result)) {
          
            let count = this.categories.filter(function (value) {
              return value === result;
            }).length;
            this.categoryResult.push({
              category: result,
              count: count
            })
          
          }
        

        
      }, this)

    })
  }

  getDisplayDate(date: any) {

    return this.utils.converTimestampToDate(date);


  }



  filterCategory(category: string) {
     this.postService.listPostByCategory(category).subscribe(res => {
      this.posts = res; 
     });
  }

  refreshCategories() {

    this.categoryResult = []
    this.categories = this.posts.map(obj => obj.category);
    this.categories.forEach(result => {

      if (!this.categoryResult.find(x => x.category == result)) {
        
          let count = this.categories.filter(function (value) {
            return value === result;
          }).length;
          this.categoryResult.push({
            category: result,
            count: count
          })
        
        }

      
      

      
    }, this)
  }

  isOwnPost(post: Post) {

    return post.uid === this.user.uid;


  }

  removePost(post: Post) {
    if(post.uid === this.user.uid) {
        post.expiryDate = new Date(1,1,1900,0,0,0,0);
        this.postService.updatePost(post).then(() => {
          this.notificationService.successNotification("Your post was removed successfully.")
        });


    }
    
  }

}
