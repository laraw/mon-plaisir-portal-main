export class Message {
    id: string;
    messageDate: Date;
    message: string;
    expiryDate: Date;
    sendPush?: boolean;
    usersRead?: MessageUsers[];
}

export class MessageUsers {
    uid: string;
    displayName?: string;
    dateRead: Date;
    
}