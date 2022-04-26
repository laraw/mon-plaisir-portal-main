import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { NgbDateParserFormatter,NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

function padNumber(value: number | null) {
  if (!isNaN(value) && value !== null) {
    return `0${value}`.slice(-2);
  } 
  return '';
}

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {
  parse(value: string): NgbDateStruct | null {
    if (value) {
      const dateParts = value.trim().split('/');

      let dateObj: NgbDateStruct = { day: <any>null, month: <any>null, year: <any>null }
      const dateLabels = Object.keys(dateObj);

      dateParts.forEach((datePart, idx) => {
        dateObj[dateLabels[idx]] = parseInt(datePart, 10) || <any>null;
      });
      return dateObj;
    }
    return null;
  }
 
  static formatDate(date: NgbDateStruct | NgbDate | null): string {
    return date ?
        `${padNumber(date.day)}/${padNumber(date.month)}/${date.year || ''}` :
        '';
  }
 
  format(date: NgbDateStruct | null): string {
    return NgbDateCustomParserFormatter.formatDate(date);
  }
}

@Component({
  selector: 'ngbd-datepicker-popup',
  templateUrl: './datepicker-popup.html'
})
export class NgbdDatepickerPopup implements OnInit {
  model: NgbDateStruct;
  @Output() dateChangeEvent : EventEmitter<any> = new EventEmitter();
  @Input() existingDate: NgbDateStruct;

  ngOnInit() {
      this.model = this.existingDate;
  }
  
  onDateSelection(date: NgbDate) {
    
    let parsedDate = NgbDateCustomParserFormatter.formatDate(date);
    
    

  }

  dateChanged($event) {
      this.dateChangeEvent.emit(this.model);
  }
  
}
