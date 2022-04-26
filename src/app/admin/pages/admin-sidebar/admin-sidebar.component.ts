import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/services/auth.service';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}



export const ADMINROUTES: RouteInfo[] = [
    { path: '/admin/manage-users',     title: 'Manage Users', icon:'fa fa-user',       class: '' },
    { path: '/admin/manage-maintenance',     title: 'Manage Maintenance', icon:'fa fa-wrench',       class: '' },
    { path: '/admin/manage-meetings', title: 'Manage Meetings', icon: 'fa fa-building-o', class: ''},
    { path: '/admin/manage-faqs', title: 'Manage Faqs', icon: 'fa fa-question-circle', class: ''},
    { path: '/admin/manage-feedback', title: 'Manage Feedback', icon: 'fa fa-comments', class: ''},
 

];


@Component({
    
    selector: 'admin-sidebar-cmp',
    templateUrl: 'admin-sidebar.component.html',
    styleUrls: ['admin-sidebar.component.css']
})

export class AdminSidebarComponent implements OnInit {
                // {1}

    showAdmin: boolean = false;

    public adminItems: any[];
    public localUser = JSON.parse(localStorage.getItem("user"));

    constructor(private authService: AuthService) {}
    ngOnInit() {

        this.adminItems = ADMINROUTES.filter(menuItem => menuItem);
        
       
    }
}
