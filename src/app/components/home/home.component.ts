import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  categories = [
    {
      categoryName: 'Humain Resource',
    },
    {
      categoryName: 'Project Manager',
    },
    {
      categoryName: 'Delivery Driver',
    },
    {
      categoryName: 'Data Science',
    },
    {
      categoryName: 'It & Networkiing',
    },
    {
      categoryName: 'Humain Resource',
    },
  ];
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
}
