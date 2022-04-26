import { Component, Input, OnInit } from '@angular/core';
import { UserBooking } from 'src/app/api/models/booking';
import { AuthService } from 'src/app/api/services/auth.service';
import { BookingService } from 'src/app/api/services/booking.service';
import { NotificationService } from 'src/app/api/services/notification.service';
import { Utils } from 'src/app/shared/utils';

@Component({
  selector: 'app-view-bookings',
  templateUrl: './view-bookings.component.html',
  styleUrls: ['./view-bookings.component.css']
})
export class ViewBookingsComponent implements OnInit {

  userBookings: UserBooking[] = []
  @Input() showOwn: boolean;
  user: any = JSON.parse(localStorage.getItem("user"));

  constructor(private authService: AuthService, 
    private bookingService: BookingService,
     private notificationService: NotificationService,
     private utils: Utils) { }

  ngOnInit(): void {
    let date =      this.utils.setDateToMidnight(new Date());

    if(!this.showOwn) {
      this.bookingService.getAllUserBookings(date).subscribe(bookings => {
        this.userBookings = this.utils.paginate(bookings, 5, 1); 
      
      })
    }
    else {


      this.bookingService.getBookingUserBookings(this.user.uid, date).subscribe(bookings => {
  
        
        this.userBookings = this.utils.paginate(bookings, 5, 1); 
      
      })   

    }
    
  }

  cancel(booking: UserBooking) {
    this.bookingService.cancelUserBooking(booking);
  }

  checkIn(booking: UserBooking) {
    this.bookingService.checkIn(booking);
  }

  checkOut(booking: UserBooking) {
    this.bookingService.checkOut(booking);
  }

}
