import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class JobService {
  baseUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}
  addJob(data: any) {
    return this.http.post(this.baseUrl + 'addjob', data);
  }

  updateJob(data: any) {
    return this.http.post(this.baseUrl + 'updatejob', data);
  }

  getAllJobs() {
    return this.http.get(this.baseUrl + 'getalljobs');
  }
}
