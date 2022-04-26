import { User } from "./user";

export class Booking {
    id: string;
    type: string;
    weekStartDate: Date;
    bookingDate: Date;
    day: number;
    month: number;
    year: number;    
    startTime: string;
    startTimeHr: number;
    startTimeMin: number;
    bookedSlots: number;
    availableSlots: number;
    users?: UserBooking[];
   
   
    
 }




 export class UserBooking {
    id: string;

    uid: string;
    bookingId: string;
    bookingDate: Date;
    startTime: string;
    
    firstName?: string;
    lastName?: string;
    unitNo?: string;
    
    checkedIn?: boolean;
    checkedOut?: boolean;
 }