import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private http: HttpClient) {}

  handel(token: any) {
    this.set(token);
  }

  set(token: any) {
    return localStorage.setItem('token', token);
  }

  get() {
    return localStorage.getItem('token');
  }

  remove() {
    return localStorage.removeItem('token');
  }

  isValid() {
    const token = this.get();
    if (token) {
      const payload = this.payload(token);
      if (payload) {
        return payload.iss === 'http://localhost:8000/api/login' ? true : false;
      }
    }
    return false;
  }

  payload(token: any) {
    return JSON.parse(atob(token.split('.')[1]));
  }

  loggedIn() {
    return this.isValid();
  }
}
