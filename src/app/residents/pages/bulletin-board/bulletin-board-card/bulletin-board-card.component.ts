import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { Post } from 'src/app/api/models/post';
import { NotificationService } from 'src/app/api/services/notification.service';
import { PostService } from 'src/app/api/services/post.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-bulletin-board-card',
  templateUrl: './bulletin-board-card.component.html'
})
export class BulletinBoardCardComponent implements OnInit {

  public localUser = JSON.parse(localStorage.getItem("user"));
  posts: Post[];
  newPostCount: number;



  constructor(private notificationService: NotificationService ,private postService: PostService, private utils: Utils ) { }

  ngOnInit(): void {

    this.postService.listPosts().subscribe(res => {
        var today = this.utils.setDateToMidnight(new Date());
        this.posts = res.filter(post => this.utils.converTimestampToDate(post.datePosted == today));
        
        this.newPostCount = this.posts.length;
    })
   
   

  }



  
}



