import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule, routes } from './admin-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { SharedModule } from '../shared/shared.module';
import { AdminComponent } from './layout/admin/admin.component';
import { CreateFaqComponent } from './pages/manage-faqs/create-faq/create-faq.component';
import { EditFaqComponent } from './pages/manage-faqs/edit-faq/edit-faq.component';
import { ListFaqsComponent } from './pages/manage-faqs/list-faqs/list-faqs.component';
import { ListFeedbackHistoryComponent } from './pages/manage-feedback/list-feedback-history/list-feedback-history.component';
import { ListFeedbackComponent } from './pages/manage-feedback/list-feedback/list-feedback.component';
import { UpdateFeedbackComponent } from './pages/manage-feedback/update-feedback/update-feedback.component';
import { ListMaintenanceComponent } from './pages/manage-maintenance/list-maintenance/list-maintenance.component';
import { UpdateMaintenanceComponent } from './pages/manage-maintenance/update-maintenance/update-maintenance.component';
import { CreateMeetingComponent } from './pages/manage-meetings/create-meeting/create-meeting.component';
import { EditMeetingComponent } from './pages/manage-meetings/edit-meeting/edit-meeting.component';
import { ListMeetingsComponent } from './pages/manage-meetings/list-meetings/list-meetings.component';
import { CreateUserComponent } from './pages/manage-users/create-user/create-user.component';
import { ListUsersComponent } from './pages/manage-users/list-users/list-users.component';
import { SendmessagesComponent } from './pages/sendmessages/sendmessages.component';
import { AdminSidebarComponent } from './pages/admin-sidebar/admin-sidebar.component';



@NgModule({
  declarations: [
    ListUsersComponent,
    CreateUserComponent,
    SendmessagesComponent,
    // ManageMaintenanceComponent,
    CreateFaqComponent,
    EditFaqComponent,
    UpdateMaintenanceComponent,
    CreateMeetingComponent,
    EditMeetingComponent,
    ListMaintenanceComponent,
    ListFaqsComponent,
    ListMeetingsComponent,
    ListFeedbackComponent,
    UpdateFeedbackComponent,
    ListFeedbackHistoryComponent,
    AdminComponent,
    AdminSidebarComponent
    
    

  ],
  imports: [
    CommonModule,
    // relativeLinkResolution: 'legacy',
    AdminRoutingModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),

    FormsModule,
    ReactiveFormsModule,
    NgbModule,

    SharedModule
    
    
    
   
  ]
})
export class AdminModule {}
