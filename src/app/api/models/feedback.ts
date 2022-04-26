import { User } from "./user";

export class Feedback {

     id: string;
     userLoggedFirstName: string;
     userLoggedLastName: string;
     userLoggedUid: string;
     feedback: string;
     dateLogged: Date;
     status?: string;
     comments?: Comment[]

 
}

export class Comment {
    uid: string;
    firstName: string;
    lastName: string;
    comment: string;
    commentDate: Date;
    oldStatus?: string;
   newStatus?: string;
}
