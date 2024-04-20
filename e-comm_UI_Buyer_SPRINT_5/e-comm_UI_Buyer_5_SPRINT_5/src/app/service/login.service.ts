import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/app/login-dto';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = "http://localhost:8082/buyer/login";
  constructor(private httpClient: HttpClient) { }
  loginUser(loginDto: LoginDto) {
    return this.httpClient.post(`${this.baseUrl}`, loginDto);
  }
}
