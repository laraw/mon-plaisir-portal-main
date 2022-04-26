import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { UserBooking } from 'src/app/api/models/booking';
import { BookingService } from 'src/app/api/services/booking.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-all-bookings',
  templateUrl: './all-bookings.component.html',
  styleUrls: ['./all-bookings.component.css']
})
export class AllBookingsComponent implements OnInit {

  constructor(private utils: Utils, private bookingService: BookingService) { }

  bookingsFiltered: UserBooking[];
  totalPages: number;
  currentPage: number = 1;
  lastPage: number;
  recordsPerPage: number = 10;
  bookings: UserBooking[];
  showBookings: boolean = true;
  user = JSON.parse(localStorage.getItem('user'));
  ngOnInit(): void {

    this.bookingService.getAllUserBookings(this.utils.setDateToMidnight(new Date)).subscribe(res => {
        
        this.bookings = res;
        this.bookingsFiltered =  this.utils.paginate(this.bookings, this.recordsPerPage, this.currentPage); 
        
        
        
        this.totalPages = this.utils.calculatePagesCount(this.recordsPerPage, this.bookings.length);
        this.showBookings = res.length > 0;
    
        

    })


  }

  next() {
    this.currentPage++;

    this.bookingsFiltered = this.utils.paginate(this.bookings, this.recordsPerPage, this.currentPage);

  }

  selectPage(pageNumber: number) {
  
    this.bookingsFiltered = this.utils.paginate(this.bookings, this.recordsPerPage, pageNumber);
    
  }
  previous() {

    this.currentPage--;
    this.bookingsFiltered = this.utils.paginate(this.bookings, this.recordsPerPage, this.currentPage);

  }

  counter(i: number) {
    return new Array(i);
  }

  cancel(booking: UserBooking) {
    this.bookingService.cancelUserBooking(booking);
  }

  isOwnBooking(booking: UserBooking) {
    if(booking.uid === this.user.uid) {
      return true;
    }
    return false;

  }

}
