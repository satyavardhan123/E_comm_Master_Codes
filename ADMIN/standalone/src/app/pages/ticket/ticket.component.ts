import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { TicketService } from 'src/app/service/ticket.service';
import { ticket } from 'src/app/model/ticket.model';
import Swal from 'sweetalert2';

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
    Swal.fire({
      title: 'Are you sure?',
      text: 'Is the Issue Resolved? Do you want to close this ticket?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, close it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.ticketservice.closeTicket(ticketId).subscribe(
          response => {
            Swal.fire(
              'Closed!',
              'Ticket closed successfully.',
              'success'
            );
            // Refresh the list of tickets after a successful operation
            this.getTickets();
          },
          error => {
            console.error('Failed to close ticket:', error);
            Swal.fire(
              'Error!',
              'An error occurred while closing the ticket.',
              'error'
            );
            // You could also add additional error handling or logging here
          }
        );
      }
    });
  }

}
