import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  baseUrl = 'http://127.0.0.1:8000/api/';
  constructor(private http: HttpClient) {}

  addProfile(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl + 'addprofile', data, {
      headers: headers,
    });
  }

  updateProfile(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl + 'updateprofile', data, {
      headers: headers,
    });
  }

  getAllProfiles() {
    const headers = new HttpHeaders();
    return this.http.get(this.baseUrl + 'getallprofiles', {
      headers: headers,
    });
  }

  getProfile(data: any) {
    const headers = new HttpHeaders();
    return this.http.post(this.baseUrl + 'getprofile', data, {
      headers: headers,
    });
  }
}
