import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'upload-file-component',
  templateUrl: 'upload-file.component.html',
  styles: ['input { color: white }']
})
export class UploadFileComponent {

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  fileName: Observable<string>;
  uploading: boolean = false;
  meta: any;
  @Input() incomingFileName: string;
  @Output() fileCompleteUpload : EventEmitter<any> = new EventEmitter();

  constructor(private storage: AngularFireStorage) {}

  uploadFile(event) {
    this.uploading = true;

    const filePath = this.incomingFileName;
    const file = event.target.files[0];
    // const filePath = event.target.files[0].name;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // observe percentage changes
    this.uploadPercent = task.percentageChanges();
    // get notified when the download URL is available
    task.snapshotChanges().pipe(
        finalize(() => {  
          this.downloadURL = fileRef.getDownloadURL();
          fileRef.getMetadata().subscribe(response =>  
            { 
                this.fileName = response.name;
                this.fileCompleteUpload.emit(response.fullPath);
            }
            )
          this.uploading = false; 
         
         
        } )
     )
    .subscribe()
  }




}