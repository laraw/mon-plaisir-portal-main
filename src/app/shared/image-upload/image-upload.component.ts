import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { getuid } from 'process';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NotificationService } from 'src/app/api/services/notification.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileName: Observable<string>;
  uploading: boolean = false;
  meta: any;
  downloadLink: any;
  showImage: boolean;
  

  @Output() fileCompleteUpload : EventEmitter<any> = new EventEmitter();
  @Input() path: string;
  @Input() contactInitials: string;


  constructor(
    private storage: AngularFireStorage, 
    private modalService: NgbModal, 
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    
    if(this.path != "" && this.path != undefined) {
      
      const ref = this.storage.ref(this.path);

      this.downloadLink = ref.getDownloadURL();

      this.showImage = true;
      
    }
    else {

      
      this.showImage = false;
    }



  }


  ngAfterViewInit(): void {
    

  }

  uploadFile(event) {
    this.uploading = true;
    const file = event.target.files[0];
    if(this.checkFileType(file.type))
    {
      const filePath = "/images/" + GuidGenerator.newGuid().toString();
    
      // const filePath = event.target.files[0].name;
      const fileRef = this.storage.ref(filePath);
      const task = this.storage.upload(filePath, file);
  
      // observe percentage changes
      this.uploadPercent = task.percentageChanges();
      // get notified when the download URL is available
      task.snapshotChanges().pipe(
          finalize(() => {  
            this.downloadURL = fileRef.getDownloadURL();
            this.downloadLink = this.downloadURL;
            fileRef.getMetadata().subscribe(response =>  
              { 
                  this.fileName = response.name;
                  this.fileCompleteUpload.emit(response.fullPath);
                  this.showImage = true;
              }
              )
            this.uploading = false; 
           
           
          } )
       )
      .subscribe()
      
        
    }
    else {

      this.notificationService.errorNotification("Not a valid file type for the image upload.")
    }

  }

  open(content) {
 
    this.modalService.open(content, { size: "sm" });
  
  
  }

  checkFileType(filetype: any) {
    
    var acceptedFileTypes = ["png","jpg","jpeg","gif","PNG","JPG","JPEG","GIF"];
    var filetype = filetype.toString().split("/");

    if(acceptedFileTypes.includes(filetype[1])){
     
      return true;
    }
    else {
      return false;
    }

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