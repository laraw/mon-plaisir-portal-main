export class Post {
    id: string;
    uid: string;
    firstName: string;
    lastName: string;
    photoURL?: string;
    category: string;
    contactPhone: string;
    title: string;
    content: string;
    datePosted: Date;
    expiryDate: Date;
    replies?: PostReply[];
    fileURL?: string;

}

export class PostReply {
    id: string;
    uid: string;
    firstName: string;
    lastName: string;
    photoURL: string;
    datePosted: Date;
    comment: string;
}