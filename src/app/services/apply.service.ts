import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApplyService {
  baseUrl = 'http://localhost:8000/api/';
  constructor(private http: HttpClient) {}

  applyJob(data: any) {
    return this.http.post(this.baseUrl + 'applyjob', data);
  }

  getAllApplications() {
    return this.http.get(this.baseUrl + 'getallapplications');
  }
}
