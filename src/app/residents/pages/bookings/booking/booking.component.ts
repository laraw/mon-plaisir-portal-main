import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import {
  NgbCalendar,
  NgbDate,
  NgbDateStruct,
  NgbModal,
} from "@ng-bootstrap/ng-bootstrap";

import * as moment from "moment";
import { Booking, UserBooking } from "src/app/api/models/booking";
import { AuthService } from "src/app/api/services/auth.service";
import { BookingService } from "src/app/api/services/booking.service";
import { NotificationService } from "src/app/api/services/notification.service";
import { UserService } from "src/app/api/services/user.service";
import { Utils } from "src/app/shared/utils";

@Component({
  selector: "app-booking",
  templateUrl: "./booking.component.html",
  styleUrls: ["./booking.component.css"],
  encapsulation: ViewEncapsulation.None,
})
export class BookingComponent implements OnInit {

  closeResult: string;
  model: NgbDateStruct;
  date: { year: number; month: number };
  dayBookings: Booking[] = [];
  selectedTimes: Booking[] = [];

  currentWeekSelectedIndex: number = 0;
  showNext: boolean = true;
  showPrevious: boolean = false;

  nextAvailable: string;
  remainingForDay: number;

  currentMonthYr: string;
  selectedDateMonthYr: string;

  
  public localUser = JSON.parse(localStorage.getItem("user"));
  firstName: string;
  lastName: string;

  selectedDate: string = moment(new Date()).format("MMMM Do YYYY");
  
  daysofCurrentWeek: any[] = [];
  selectedDay: Date;

  usersBookings: UserBooking[] = [];
  selectedBookings: Booking[] = [];
  todayDate: Date = moment().startOf('day').toDate(); 
  currentWeekNum: number = 1;
  isDataAvailable: boolean = false;
  user: any = JSON.parse(localStorage.getItem("user"));
  screenwidth: number = screen.width;




  constructor(
    private notificationService: NotificationService,
    private userService: UserService,
    private modalService: NgbModal,
    private bookingService: BookingService,
    private utils: Utils,
    private calendar: NgbCalendar,
    private authService: AuthService
  ) {}

   ngOnInit(): void {

    this.model = this.calendar.getToday();
    
    // let todayDate = new Date(this.model.year, this.model.month-1, this.model.day, 0,0,0,0 );
    this.getBookingsForDate(this.todayDate);
    
    this.setDaysOfWeek(this.todayDate);
    this.selectedDay =   this.todayDate;
    this.currentMonthYr = moment(this.selectedDay).format("MMMM yyyy");
    
    let date = this.utils.setDateToMidnight(new Date());
      this.bookingService.getBookingUserBookings(this.user.uid, date).subscribe(response => {
        this.usersBookings = response;
        
      })
    

    // console.log(this.daysofCurrentWeek)


     

     
    
  }


  getBookingsForDate(date: Date) {



    this.isDataAvailable = false;
    
    let current_hour = parseInt(moment().format("HH"))



    this.bookingService.getBookingsForDate(this.utils.setDateToMidnight(date)).subscribe(response => {
      this.selectedDay = date;
      this.dayBookings = response;
      
      // let todayDate = new Date();
      // todayDate.setHours(0,0,0,0);

      // if todays date 
      if(this.todayDate.getTime() == date.getTime()) {
        this.dayBookings = this.dayBookings.filter(function(el) { return el.startTimeHr >= current_hour && el.availableSlots > 0 }); 
        this.remainingForDay = this.dayBookings.length;
        
      }
      
      
      this.dayBookings = this.dayBookings.sort((a, b) => {
       if (parseInt((a.startTimeHr.toString() +a.startTimeMin.toString())) < parseInt((b.startTimeHr.toString() + b.startTimeMin.toString())))
         return -1;
       if (parseInt((a.startTimeHr.toString() +a.startTimeMin.toString())) > parseInt((b.startTimeHr.toString() + b.startTimeMin.toString())))
         return 1;
       return 0;
     });

     this.setDaysOfWeek(date).then(()=>this.isDataAvailable=true);

 
    })



    


  }

  getChunks() {
    console.log(this.screenwidth)
    if(this.screenwidth > 530 && this.screenwidth < 600) {
      return 3;
    }
    if (this.screenwidth < 530) 
      return 2;
    else
      return 4;
  }

  selectDay(day: Date) {
  



    
    this.getBookingsForDate(day);

    this.selectedDay = day;
    
    this.selectedDate = moment(day).format("MMMM Do YYYY");
    this.currentMonthYr = moment(day).format("MMMM yyyy");

    // console.log(this.selectedBookings);
    

  }
  selectedBooking(booking: Booking) {

    if(booking.availableSlots <= 0) {
      this.notificationService.errorNotification("This slot is currently at maximum capacity");
    }
    else if(this.usersBookings.find(ub => ub.bookingId == booking.id)) {
     
      this.notificationService.errorNotification("Booking has previously been booked by you.");


    }
    
  
    else if(!this.selectedBookings.find(b => booking.id == b.id)) {
      this.selectedBookings.push(booking);

      
    }
    else {

      
      this.selectedBookings = this.selectedBookings.filter(function(el) { return el.id != booking.id }); 
      
    }
    
  }


  bookingSelected(booking: Booking) {
    if (this.selectedBookings.filter(e => e.id === booking.id).length > 0) {
      return true;
    }
    else {
      return false;
    }
  }
  showPreviousWeek() {

    if(this.currentWeekNum > 1) {
    
      this.currentWeekNum--;
      let nextWeekDate = new Date(moment(this.selectedDay).subtract(7,'d').format('YYYY-MM-DD'));
      this.selectDay(nextWeekDate);


      
    }

    

  }

  showNextWeek() {

    if(this.currentWeekNum < 4) {
      this.currentWeekNum++;
      let nextWeekDate = new Date(moment(this.selectedDay).add(7,'d').format('YYYY-MM-DD'));
      this.selectDay(nextWeekDate);

      


    }


  }

  saveBooking() {
   
    


    if(this.selectedBookings.length <= 0) {
      this.notificationService.errorNotification("You have not selected any new bookings.");
    }
    else {
      
      this.userService.getUserDoc(this.user.uid).subscribe(res => {
  
        this.user = res;
        this.bookingService.createUserBookings(this.selectedBookings, this.user).then(res => {
          this.notificationService.successNotification("Bookings saved successfully.");
          this.modalService.dismissAll();
          this.clearAll();
          this.bookingService.getBookingUserBookings(this.user.uid, this.utils.setDateToMidnight(new Date())).subscribe(response => {
            this.usersBookings = response;
            
          })
          
        }).catch(res => {
          this.notificationService.errorNotification(res);
        })
       
      }) 
      
    }




    // replace with actual user

    //  = {
    //   uid: "LgkaxG8sBbePlQkzi3DrJWPmJNf2",
    //   firstName: "Larissa",
    //   lastName: "Wilson",
    // }

  }

  clearAll() {

    this.model = this.calendar.getToday();
    
    // let todayDate = new Date(this.model.year, this.model.month-1, this.model.day, 0,0,0,0 );
    this.getBookingsForDate(this.todayDate);
    

    this.selectedDay =   this.todayDate;
    this.currentMonthYr = moment(this.selectedDay).format("MMMM yyyy");
    this.selectedBookings = [];
    
    this.bookingService.getUserBookings(this.user.uid).subscribe(response => {
      this.usersBookings = response;
    })
  
  }


 async setDaysOfWeek(startDate: Date) {

    
    
    this.daysofCurrentWeek = [];
    let daysRequired = 7

    var startingDay = this.getMonday(startDate);
    var dd = startingDay.getDate();
    var mm = startingDay.getMonth();
    var yyyy = startingDay.getFullYear();
    // let startweek = new Date(begin.weekYear, begin.weekday, begin.month);
    
    let today = this.utils.setDateToMidnight(new Date());
    


    for(var i=0; i<daysRequired; i++) {
  
      let thisDay = new Date(yyyy, mm, dd, 0, 0, 0, 0);
      let available = thisDay.getTime() < today.getTime() ? false : true;

      this.daysofCurrentWeek.push( {
        day: thisDay,
        isAvailable: available
      });

          
        dd++; 
        if(dd == 1) {
            mm++;
        }
        
        if(mm == 1) {
                yyyy++;
        }

    }

    
    
  }



  
  modelChange() {
   
    var selectedDate = new Date(
      this.model.year,
      this.model.month - 1,
      this.model.day,
      0,
      0,
      0
    );
  }

  openLg(content) {
 
    this.modalService.open(content, { size: "lg" });


  }


   getMonday(d) {
    d = new Date(d);
    var day = d.getDay(),
        diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
    return new Date(d.setDate(diff));
  }
  


  // currentWeekdays: BookingDay[];
  // selectedDay: BookingDay;
  // currentDayTimeSlots: BookingTimeSlot[];
  // selectedTimeSlots: BookingTimeSlot[] = [];
  // existingBookings: BookingTimeSlot[] = [];



 



  // constructor(
  //   private notificationService: NotificationService,
  //   private userService: UserService,
  //   private modalService: NgbModal,
  //   private calendar: NgbCalendar,
  //   private bookingService: BookingService,
  //   private utils: Utils
  // ) {}

  // XX(): void {
    

  //   let current_hour = parseInt(moment().format("HH"));

  //   this.userService
  //     .getUserDoc(this.localUser.uid.toString())
  //     .subscribe((res) => {
  //       this.localUser = res;
  //       this.firstName = this.localUser.firstName.toString();
  //       this.lastName = this.localUser.lastName.toString();
  //     });

  //   this.bookingService.getBookings().subscribe((res) => {
  //     var date = new Date(
  //       this.model.year,
  //       this.model.month - 1,
  //       this.model.day
  //     );
  //     this.weekBooking = res;
  //     this.selectedDateMonthYr = moment(date.toISOString()).format(
  //       "MMMM Do YYYY"
  //     );
  //     this.currentMonthYr = moment(date.toISOString()).format("MMMM YYYY");
  //     this.currentWeek = this.weekBooking.find((booking) => {
  //       return booking.bookingdays.some((day) => {
  //         // console.log(this.utils.converTimestampToDate(day.date).getTime() == date.getTime());
  //         return (
  //           this.utils.converTimestampToDate(day.date).getTime() ==
  //           date.getTime()
  //         );
  //       });
  //     });

  //     this.selectedDay = this.currentWeek.bookingdays.find((day) => {
  //       // console.log(this.utils.converTimestampToDate(day.date).getTime() == date.getTime());
  //       return (
  //         this.utils.converTimestampToDate(day.date).getTime() == date.getTime()
  //       );
  //     });

  //     this.selectedDay.slots = this.selectedDay.slots.filter(
  //       (item) => item.startTimeHr >= current_hour
  //     );
  //     // this.selectedTimeSlots = this.selectedDay.slots.filter(item => item.users.find(this.localUser.uid))
  //     (this.existingBookings = this.selectedDay.slots.filter((slot) => {
  //       if (slot.users) {
  //         return slot.users.some((user) => {
  //           // console.log(this.utils.converTimestampToDate(day.date).getTime() == date.getTime());
  //           return (user.uid = this.localUser.uid.toString());
  //         });
  //       }
  //     })),
  //       this;

  //     this.remainingForDay = this.selectedDay.slots.length;
  //     this.nextAvailable =
  //       this.selectedDay.slots[0].startTime +
  //       (this.selectedDay.slots[0].startTimeHr > 12 ? "PM" : "AM");

  //     //console.log(this.currentWeek);
  //     this.currentWeekdays = this.currentWeek.bookingdays;
  //     this.currentDayTimeSlots = this.selectedDay.slots;
  //   });
  // }

  // selectToday() {}

  // setCurrentWeek() {
  //   this.currentWeek = this.weekBooking[this.currentWeekSelectedIndex];

  //   this.selectedDay = this.currentWeek.bookingdays[0];

  //   //console.log(this.currentWeek);
  //   this.currentWeekdays = this.currentWeek.bookingdays;
  //   this.currentDayTimeSlots = this.selectedDay.slots;

  //   this.currentMonthYr = moment(
  //     this.utils.converTimestampToDate(this.selectedDay.date).toISOString()
  //   ).format("MMMM YYYY");
  //   this.selectedDateMonthYr = moment(
  //     this.utils.converTimestampToDate(this.selectedDay.date).toISOString()
  //   ).format("MMMM Do YYYY");
  // }

  // showNextWeek() {
  //   if (this.currentWeekSelectedIndex < this.weekBooking.length - 1) {
  //     this.currentWeekSelectedIndex++;

  //     this.setCurrentWeek();
  //     this.showPrevious = true;
  //   }
  //   if (this.currentWeekSelectedIndex == this.weekBooking.length - 1) {
  //     this.showNext = false;
  //   }
  // }

  // showPreviousWeek() {
  //   if (this.currentWeekSelectedIndex > 0) {
  //     this.currentWeekSelectedIndex--;
  //     this.setCurrentWeek();
  //   }

  //   if (this.currentWeekSelectedIndex == 0) {
  //     this.showPrevious = false;
  //   }
  // }

  // setSelectedTimeSlot(timeslot) {



  //     // timeslot.status = timeslot.users.length >= 2 ? "booked" : "available";
  //     // console.log(this.selectedTimeSlots);

  //     if (!this.selectedTimeSlots.includes(timeslot)) {
  //       let users = timeslot.users != undefined ? timeslot.users : [];

  //       if (
  //         timeslot.users != undefined &&
  //         !timeslot.users.find((user) => {
  //           return (user.uid = this.localUser.uid.toString());
  //         })
  //       ) {
  //         timeslot.users.push({
  //           uid: this.localUser.uid,
  //           firstName: this.firstName,
  //           lastName: this.lastName,
  //         });
  //         this.selectedTimeSlots.push(timeslot);
  //       }

  //       if (timeslot.users == undefined) {
  //         timeslot.users = [];
  //         timeslot.users.push({
  //           uid: this.localUser.uid,
  //           firstName: this.firstName,
  //           lastName: this.lastName,
  //         });
  //         this.selectedTimeSlots.push(timeslot);
  //       }
  //     }
    
  //   else {
  //     this.selectedTimeSlots.splice(timeslot);
  //   }

    
  // }

  // selectDay(day: BookingDay) {
  //   this.selectedDay = day;
  //   this.currentDayTimeSlots = day.slots;
  //   this.selectedTimeSlots = [];
  //   this.currentMonthYr = moment(
  //     this.utils.converTimestampToDate(day.date).toISOString()
  //   ).format("MMMM YYYY");
  //   this.selectedDateMonthYr = moment(
  //     this.utils.converTimestampToDate(day.date).toISOString()
  //   ).format("MMMM Do YYYY");
  // }


  // saveBooking() {
  //   this.bookingService
  //     .updateBooking(this.weekBooking[this.currentWeekSelectedIndex])
  //     .then(() => {
  //       this.selectedTimeSlots = [];
  //       this.notificationService.successNotification(
  //         "Booking was saved successfully."
  //       );
  //       this.modalService.dismissAll();
  //     })
  //     .catch(() => {
  //       this.notificationService.errorNotification("Something went wrong.");
  //     });
  // }
}
