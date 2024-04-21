import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
  
    AsyncPipe,
    NgIf
  ]
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
