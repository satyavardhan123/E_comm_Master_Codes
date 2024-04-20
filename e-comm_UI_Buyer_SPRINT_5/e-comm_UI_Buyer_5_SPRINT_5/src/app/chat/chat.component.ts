import { Component, OnInit } from '@angular/core';
import { ChatDto } from '../chat-dto';
import { ChatService } from '../services/chat.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  ticketId!: number;
  buyerDto: any; // Assuming it's an object containing email and name
  description!: string;

  constructor(private chatService: ChatService,private router:Router) { }

  ngOnInit(): void {
    this.buyerDto = JSON.parse(localStorage.getItem('buyerDto') || '{}');
    this.loadTicketId();
  }

  loadTicketId(): void {
    // Simulate ticket ID generation (you may replace this with actual logic)
    this.ticketId = Math.floor(Math.random() * 1000) + 1;
  }

  createChat(): void {
    const chatDto: ChatDto = {
      ticketID: this.ticketId,
      email: this.buyerDto.email,
      name: this.buyerDto.name,
      description: this.description
    };

    this.chatService.createChat(chatDto).subscribe(response => {
      console.log('Chat created successfully:', response);
      Swal.fire({
        title: "Ticket Raised!",
        text: "Our Team will get in touch with you ASAP!!",
        icon: "success"
      });
  this.router.navigate(['/shop']);
      this.resetForm();
    }, error => {
      console.error('Error creating chat:', error);
   
    });
  }

  resetForm(): void {
    this.description = '';
  }
}
