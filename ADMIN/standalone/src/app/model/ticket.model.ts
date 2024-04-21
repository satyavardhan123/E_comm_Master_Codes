export interface ticket{
    ticketID:number;
    email:string;
    name:string;
    description:string;
    state:string;
    createdAt:Date;
    closedAt:Date;
}