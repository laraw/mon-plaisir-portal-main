import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';

import { ImageUploadComponent } from './image-upload/image-upload.component';
import { GetFileComponent } from './get-file/get-file.component';
import { ChunksPipe } from './chunks.pipe';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { TableComponent } from './table/table.component';
import { NgbdDatepickerPopup } from './datepicker-popup/datepicker-popup';
import { FixedPluginComponent } from './fixedplugin/fixedplugin.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MaintenanceHistoryComponent } from './maintenance-history/maintenance-history.component';




@NgModule({
  declarations: [
    UploadFileComponent,
    ImageUploadComponent,
    GetFileComponent,
    ChunksPipe,
    TableComponent,
    NgbdDatepickerPopup,
    FixedPluginComponent,
    FooterComponent,
    GetFileComponent,
    ImageUploadComponent,
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    UploadFileComponent,
    MaintenanceHistoryComponent
    

    

  ],
  imports: [
    RouterModule, CommonModule, NgbModule, FormsModule, ReactiveFormsModule
    
  ],
  exports: [
    UploadFileComponent,
    ImageUploadComponent,
    GetFileComponent,
    ChunksPipe,
    TableComponent,
    NgbdDatepickerPopup,
    FixedPluginComponent,
    FooterComponent,
    GetFileComponent,
    ImageUploadComponent,
    NavbarComponent,
    SidebarComponent,
    TableComponent,
    UploadFileComponent,
    MaintenanceHistoryComponent

  ]
})
export class SharedModule {}
