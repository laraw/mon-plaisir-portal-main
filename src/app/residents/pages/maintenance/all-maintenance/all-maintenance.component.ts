import { Component, OnInit } from '@angular/core';
import { MaintenanceRequest } from 'src/app/api/models/maintenance-request';
import { MaintenanceRequestService } from 'src/app/api/services/maintenance-request.service';
import { Utils } from 'src/app/shared/utils';


@Component({
  selector: 'app-all-maintenance',
  templateUrl: './all-maintenance.component.html',
  styleUrls: ['./all-maintenance.component.css']
})
export class AllMaintenanceComponent implements OnInit {

  maintenanceRequests: MaintenanceRequest[];

  maintenanceRequestsFiltered: MaintenanceRequest[];
  totalPages: number;
  currentPage: number = 1;
  lastPage: number;
  recordsPerPage: number = 10;
  showMaintenance: boolean = true;

  constructor(private utils: Utils, private maintenanceRequestService: MaintenanceRequestService) { }

  ngOnInit(): void {
    this.maintenanceRequestService.getMaintenanceRequests().subscribe(requests => {
      //console.log(tasks);
      this.maintenanceRequests = requests;
      this.maintenanceRequestsFiltered =  this.utils.paginate(this.maintenanceRequests, this.recordsPerPage, this.currentPage); 
      this.totalPages = this.utils.calculatePagesCount(this.recordsPerPage, this.maintenanceRequests.length);
      this.showMaintenance = requests.length > 0;

    });

  }

  next() {
    this.currentPage++;

    this.maintenanceRequestsFiltered = this.utils.paginate(this.maintenanceRequests, this.recordsPerPage, this.currentPage);

  }

  selectPage(pageNumber: number) {
  
    this.maintenanceRequestsFiltered = this.utils.paginate(this.maintenanceRequests, this.recordsPerPage, pageNumber);
    
  }
  previous() {

    this.currentPage--;
    this.maintenanceRequestsFiltered = this.utils.paginate(this.maintenanceRequests, this.recordsPerPage, this.currentPage);

  }

  counter(i: number) {
    return new Array(i);
  }


}
