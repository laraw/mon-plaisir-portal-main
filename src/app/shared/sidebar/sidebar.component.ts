import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/services/auth.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Home',         icon:'nc-bank',       class: '' },
    { path: '/user',     title: 'Your profile',         icon:'nc-single-02',       class: '' },
    { path: '/faqs', title: 'Faqs', icon: 'nc-support-17', class: ''},
    { path: '/all-meetings', title: 'Meetings', icon: 'nc-briefcase-24', class: ''},
    { path: '/all-maintenance', title: 'Maintenance', icon: 'nc-scissors', class: ''},
    { path: '/all-bookings', title: 'Bookings', icon: 'nc-user-run', class: '' },
    { path: '/bulletin-board', title: 'Bulletin Board', icon: 'nc-chat-33', class: '' }


];

export const ADMINROUTES: RouteInfo[] = [
    { path: '/manage-users',     title: 'Manage Users', icon:'fa fa-user',       class: '' },
    { path: '/manage-maintenance',     title: 'Manage Maintenance', icon:'fa fa-wrench',       class: '' },
    { path: '/manage-meetings', title: 'Manage Meetings', icon: 'fa fa-building-o', class: ''},
    { path: '/manage-faqs', title: 'Manage Faqs', icon: 'fa fa-question-circle', class: ''},
    { path: '/manage-feedback', title: 'Manage Feedback', icon: 'fa fa-comments', class: ''},
 

];


@Component({
  
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
    styleUrls: ['sidebar.component.css']
})

export class SidebarComponent implements OnInit {
                // {1}

    showAdmin: boolean = false;

    public menuItems: any[];
    public adminItems: any[];
    public localUser = JSON.parse(localStorage.getItem("user"));

    constructor(private authService: AuthService) {}
    ngOnInit() {
        // this.showAdmin = this.localUser.role == "admin";
        this.menuItems = ROUTES.filter(menuItem => menuItem);
        this.adminItems = ADMINROUTES.filter(menuItem => menuItem);
        
       
    }
}
