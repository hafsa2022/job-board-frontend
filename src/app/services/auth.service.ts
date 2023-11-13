import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = '';
  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:8000/api/';
  }

  signup(data: any) {
    return this.http.post(this.baseUrl + 'signup', data);
  }

  login(data: any) {
    return this.http.post(this.baseUrl + 'login', data);
  }
}
