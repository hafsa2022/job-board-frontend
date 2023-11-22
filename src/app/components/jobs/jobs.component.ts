import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent {
  jobs = [
    {
      jobImage: '',
      jobTitle: 'job1',
      jobDescription:
        '   This is a wider card with supporting text below as a naturallead-in to additional content. This content is a little bit longer.',
    },
    {
      jobImage: '',
      jobTitle: 'job2',
      jobDescription:
        '   This is a wider card with supporting text below as a naturallead-in to additional content. This content is a little bit longer.',
    },
    {
      jobImage: '',
      jobTitle: 'job3',
      jobDescription:
        '   This is a wider card with supporting text below as a naturallead-in to additional content. This content is a little bit longer.',
    },
    {
      jobImage: '',
      jobTitle: 'job4',
      jobDescription:
        '   This is a wider card with supporting text below as a naturallead-in to additional content. This content is a little bit longer.',
    },
  ];
  categories = [
    { id: 1, categoryName: 'Humain Resource' },
    { id: 2, categoryName: 'Project Manager' },
    { id: 3, categoryName: 'Delivery Driver' },
    { id: 4, categoryName: 'Data Science' },
    { id: 5, categoryName: 'It & Networking' },
    { id: 6, categoryName: 'Humain Resource' },
  ];
  jobsList = [
    { id: 1, typeName: 'Full-time' },
    { id: 2, typeName: 'Part-time' },
    { id: 3, typeName: 'Temporary' },
    { id: 4, typeName: 'Contract' },
    { id: 5, typeName: 'Intership' },
    { id: 5, typeName: 'Permanent' },
  ];
  constructor(private router: Router) {}

  jobView() {
    this.router.navigateByUrl('job-view');
  }
}
