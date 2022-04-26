export class Meeting {
    id: string;
    meetingDate: Date;
    meetingTime: string;
    description: string;
    location: string;
    attendees?: Attendees[];
    status: string;
    minutesUrl?: string;

}

export class Attendees {
    uid: string;
    firstName: string;
    lastName: string;
    emailAddress: string;

}