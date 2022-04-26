import { OnChanges } from '@angular/core';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'table-shared',
  templateUrl: 'table.component.html'
})
export class TableComponent implements OnChanges {

  @Input() GridData: any;
  @Input() ColData: any;
  @Input() recordsPerPage;

 totalPages: number;
  currentPage: number = 1;
  GridDataFiltered: [];


  constructor(private utils: Utils) {

    
    
  }

  ngOnInit() {
    this.totalPages = this.utils.calculatePagesCount(this.recordsPerPage, this.GridData.length);
    this.GridDataFiltered =  this.utils.paginate(this.GridData, this.recordsPerPage, 1);
    

  }

  next() {
    this.currentPage++;

    this.GridDataFiltered = this.utils.paginate(this.GridData, this.recordsPerPage, this.currentPage);

  }

  selectPage(pageNumber: number) {
  
    this.currentPage = pageNumber;
    this.GridDataFiltered = this.utils.paginate(this.GridData, this.recordsPerPage, pageNumber);
    
  }
  previous() {

    this.currentPage--;
    this.GridDataFiltered = this.utils.paginate(this.GridData, this.recordsPerPage, this.currentPage);

  }

  counter(i: number) {
    return new Array(i);
  }

  ngOnChanges() {
    console.log(this.GridData);
    console.log(this.ColData);
  }


}