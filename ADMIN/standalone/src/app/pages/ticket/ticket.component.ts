import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TicketService } from 'src/app/service/ticket.service';
import { ticket } from 'src/app/model/ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  constructor(private http:HttpClient , private ticketservice:TicketService){}

  ticketDto:ticket[];
  status:string;
  ngOnInit():void{
    this.getTickets();
  }

  getTickets()
  {
    this.ticketservice.getAllTickets().subscribe(
      (Items:ticket[]) => {
        this.ticketDto =Items;
        console.log(Items);
      },
      error => {
        console.error('Error fetching cart items:', error);
      }
    );
  }

  closeTicket(ticketId: number): void {
    this.ticketservice.closeTicket(ticketId).subscribe(
      response => {
        console.log('Ticket closed successfully:', response);
        // Handle success response
        this.getTickets();
      },
      error => {
        console.error('Failed to close ticket:', error);
        // Handle error response
      }
    );
  }

}
