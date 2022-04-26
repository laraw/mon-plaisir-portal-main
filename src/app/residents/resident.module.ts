import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { NgbAccordion, NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { ToastrModule } from "ngx-toastr";
import { AdminModule } from "../admin/admin.module";
import { SharedModule } from "../shared/shared.module";
import { ResidentComponent } from "./layout/resident/resident.component";
import { AllBookingsComponent } from "./pages/bookings/all-bookings/all-bookings.component";
import { BookingComponent } from "./pages/bookings/booking/booking.component";
import { ViewBookingsComponent } from "./pages/bookings/view-bookings/view-bookings.component";
import { BulletinBoardCardComponent } from "./pages/bulletin-board/bulletin-board-card/bulletin-board-card.component";
import { BulletinBoardComponent } from "./pages/bulletin-board/bulletin-board.component";
import { CreatePostComponent } from "./pages/bulletin-board/create-post/create-post.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { FaqsComponent } from "./pages/faqs/faqs.component";
import { CreateFeedbackComponent } from "./pages/feedback/create-feedback/create-feedback.component";
import { AllMaintenanceComponent } from "./pages/maintenance/all-maintenance/all-maintenance.component";
import { CreateMaintenanceComponent } from "./pages/maintenance/create-maintenance/create-maintenance.component";
import { AllMeetingsComponent } from "./pages/meetings/all-meetings/all-meetings.component";
import { RegisterMeetingComponent } from "./pages/meetings/register-meeting/register-meeting.component";
import { UserComponent } from "./pages/user/user.component";
import { ResidentRoutingModule, routes } from "./resident-routing.module";





@NgModule({
  declarations: [
    FaqsComponent,
    AllMeetingsComponent,
    AllMaintenanceComponent,

    DashboardComponent,
    UserComponent,
    BookingComponent,
    RegisterMeetingComponent,
    CreateMaintenanceComponent,
    CreateFeedbackComponent,
    ViewBookingsComponent,
    AllBookingsComponent,
    
    ResidentComponent,
    BulletinBoardComponent,
    CreatePostComponent,
    BulletinBoardCardComponent
  
  ],
  imports: [

    CommonModule,
    // relativeLinkResolution: 'legacy',
    ResidentRoutingModule,
    RouterModule.forChild(routes),
    ToastrModule.forRoot(),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    NgbModule,
    SharedModule



   
  ],

})
export class ResidentModule { }
