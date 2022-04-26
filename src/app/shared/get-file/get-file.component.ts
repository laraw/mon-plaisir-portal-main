import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
    selector: 'app-get-file',
    template: `<a target="_blank" href="{{ downloadLink | async }}"> Download </a> `
  })
  export class GetFileComponent {
    meta: Observable<any>;
    display: string;
    downloadLink: Observable<string>;
    @Input() fileUrl: string;

    constructor(private storage: AngularFireStorage) {
       

    }

    ngOnInit() {
        const ref = this.storage.ref(this.fileUrl);
        this.downloadLink = ref.getDownloadURL();
        ref.getMetadata().subscribe(response => this.display = response.name );
    }
  }