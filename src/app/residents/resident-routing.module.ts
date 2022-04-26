import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../api/guard/auth.guard';
import { AllBookingsComponent } from './pages/bookings/all-bookings/all-bookings.component';
import { BookingComponent } from './pages/bookings/booking/booking.component';
import { BulletinBoardComponent } from './pages/bulletin-board/bulletin-board.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FaqsComponent } from './pages/faqs/faqs.component';
import { AllMaintenanceComponent } from './pages/maintenance/all-maintenance/all-maintenance.component';
import { AllMeetingsComponent } from './pages/meetings/all-meetings/all-meetings.component';
import { UserComponent } from './pages/user/user.component';


export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Residents Portal'
        },
        children: [
            {
                path: '',
                redirectTo: 'dashboard'
              },
            {
                path: "dashboard",
                component: DashboardComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "user",
                component: UserComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "faqs",
                component: FaqsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: "all-meetings",
                component: AllMeetingsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "all-maintenance",
                component: AllMaintenanceComponent,
                canActivate: [AuthGuard],
            },
            {
                path: "booking", 
                component: BookingComponent,
                canActivate: [AuthGuard] 
            },
            {
                path: "all-bookings",
                component: AllBookingsComponent,
                canActivate: [AuthGuard],
            },
            {
                path: 'bulletin-board',
                component: BulletinBoardComponent,
                canActivate: [AuthGuard]
            }
          
        ]
    }
   

    // {
    //   path: '**',
    //   redirectTo: 'dashboard',
    // }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class ResidentRoutingModule { }