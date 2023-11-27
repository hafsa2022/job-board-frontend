import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}

  getAllusers() {
    return this.http.get(this.baseUrl + 'getallusers');
  }
}
