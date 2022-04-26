import { Output } from '@angular/core';
import { Component, EventEmitter, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/api/services/notification.service';
import { PostService } from 'src/app/api/services/post.service';
import { UserService } from 'src/app/api/services/user.service';


@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class CreatePostComponent implements OnInit {

  public localUser = JSON.parse(localStorage.getItem("user"));
  @Output() postAddedEvent : EventEmitter<any> = new EventEmitter();
  fileUrl: any;
  fileName: any;
  

  postForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required),
    content: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    expiryDays: new FormControl('',[ Validators.required, Validators.pattern("^[0-9]*$"), Validators.min(1), Validators.max(30)])

  })



  constructor(private notificationService: NotificationService ,private postService: PostService, private userService: UserService, private modalService: NgbModal, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUserDoc(this.localUser.uid.toString()).subscribe(res => {
      this.localUser = res;
      this.postForm.patchValue({
        firstName: this.localUser.firstName.toString(),
        lastName: this.localUser.lastName.toString()

      })

    })

    this.fileName = "/posts/Post_"  + GuidGenerator.newGuid().toString();;
   

  }

  openLg(content) {
    this.modalService.open(content, { size: 'lg' });
  }

  setPostUpload(fileUrl: string) {

    this.fileUrl = fileUrl;
  }

  savePost() {
    let date = new Date(); 
    let expiryDate = new Date();
    expiryDate.setDate(date.getDate() + parseInt(this.postForm.value.expiryDays));
    

    let post = {
    

      uid: this.localUser.uid.toString(),
      firstName: this.postForm.value.firstName,
      lastName: this.postForm.value.lastName,
      photoURL: this.localUser.photoURL != undefined ? this.localUser.photoURL : "",
      category: this.postForm.value.category,
      contactPhone: this.postForm.value.phone,
      title: this.postForm.value.title,
      content: this.postForm.value.content,
      datePosted: date,
      expiryDate: expiryDate,
      fileURL: this.fileUrl != undefined ? this.fileUrl : ""

    };

    this.postService.addPost(post)
      .then(() => {  
          this.notificationService.successNotification("Posted successfully."); 
          this.postAddedEvent.emit(post);
        this.modalService.dismissAll() 
        } )
        .catch(error =>
          this.notificationService.errorNotification(error)
          );

  
  }

  
}



class GuidGenerator {
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}