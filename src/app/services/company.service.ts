import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}
  addCompany(data: any) {
    return this.http.post(this.baseUrl + 'addcompany', data);
  }

  updateCompany(data: any) {
    return this.http.post(this.baseUrl + 'updatecompany', data);
  }
}

