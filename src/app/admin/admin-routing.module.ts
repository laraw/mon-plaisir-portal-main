import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../api/guard/auth.guard";
import { ListFaqsComponent } from "./pages/manage-faqs/list-faqs/list-faqs.component";
import { ListFeedbackComponent } from "./pages/manage-feedback/list-feedback/list-feedback.component";
import { ListMaintenanceComponent } from "./pages/manage-maintenance/list-maintenance/list-maintenance.component";
import { ListMeetingsComponent } from "./pages/manage-meetings/list-meetings/list-meetings.component";
import { ListUsersComponent } from "./pages/manage-users/list-users/list-users.component";

export const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Admin Portal'
        }
,
        children: [
            {
                path: '',
                redirectTo: 'manage-users'
            },
            {
                path: "manage-users",
                component: ListUsersComponent,
                canActivate: [AuthGuard],
                data: { roles: ["admin"] },
            },
        
            {
                path: "manage-faqs",
                component: ListFaqsComponent,
                canActivate: [AuthGuard],
                data: { roles: ["admin"] },
            },
            {
                path: "manage-meetings",
                component: ListMeetingsComponent,
                canActivate: [AuthGuard],
                data: { roles: ["admin"] },
            },
            {
                path: "manage-maintenance",
                component: ListMaintenanceComponent,
                canActivate: [AuthGuard],
                data: { roles: ["admin"] },
            },
            {
                path: "manage-feedback",
                component: ListFeedbackComponent,
                canActivate: [AuthGuard],
                data: { roles: ["admin"] },
            },
        
          
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
export class AdminRoutingModule { }