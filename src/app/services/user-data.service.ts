import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  userData: any;
  constructor(private http: HttpClient) {}
  handel(userData: any) {
    return this.set(userData);
  }
  set(userData: any) {
    return localStorage.setItem('user', JSON.stringify(userData));
  }
  get() {
    this.userData = localStorage.getItem('user');
    return JSON.parse(this.userData);
  }
}
