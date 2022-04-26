import { User } from "./user";

export class MaintenanceRequest {
    id: string;
    date: Date;
    classification: string;
    description: string;


    userLoggedFirstName: string;
    userLoggedLastName: string;
    userLoggedUid: string;
    currentStatus: string;
    comments?: Comment[]
    priority: boolean;
    photo?: string;

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

