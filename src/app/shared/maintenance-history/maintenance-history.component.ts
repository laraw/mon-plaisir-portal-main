import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MaintenanceRequest, Comment } from 'src/app/api/models/maintenance-request';

@Component({
  selector: 'app-maintenance-history',
  templateUrl: './maintenance-history.component.html',
  styleUrls: ['./maintenance-history.component.css']
})
export class MaintenanceHistoryComponent implements OnInit {

  @Input() maintenancerequest: MaintenanceRequest;
  comments: Comment[];
  
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
    this.comments = this.maintenancerequest.comments;
  }

  openLg(content) {
    this.modalService.open(content, { size: "lg" });
  }
}
