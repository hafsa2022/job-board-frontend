import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
})
export class JobViewComponent implements OnInit {
  applyDetails!: FormGroup;
  skills = [
    {
      skillName: 'JS',
    },
    {
      skillName: 'VueJS',
    },
    {
      skillName: 'Laravel',
    },
  ];

  constructor(private router: Router, private fb: FormBuilder) {}
  ngOnInit(): void {
    this.applyDetails = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: null,
      resume: [null, Validators.required],
      coverLetter: '',
    });
  }
  get candidate() {
    return this.applyDetails.controls;
  }
  submit() {}
  toJobsList() {
    this.router.navigateByUrl('jobs');
  }
}
