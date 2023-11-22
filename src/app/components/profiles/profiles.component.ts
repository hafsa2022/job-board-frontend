import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent {
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
  constructor(private router: Router) {}
  profileView() {
    this.router.navigateByUrl('profile');
  }
}
