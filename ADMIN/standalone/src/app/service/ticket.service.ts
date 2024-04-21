import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ticket } from '../model/ticket.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  constructor(private http:HttpClient){}

  getAllTickets()
  {
     return this.http.get<ticket[]>("http://localhost:9090/chat/getchat");
  }

  closeTicket(ticketId: number): Observable<string> {
    return this.http.put<string>(`http://localhost:9090/chat/close/${ticketId}`, null);
  }
}
