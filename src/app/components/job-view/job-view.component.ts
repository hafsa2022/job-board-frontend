import { JobService } from './../../services/job.service';
import { ApplyService } from './../../services/apply.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-job-view',
  templateUrl: './job-view.component.html',
  styleUrls: ['./job-view.component.css'],
})
export class JobViewComponent implements OnInit {
  applyDetails!: FormGroup;
  data!: any;
  series = ['1', '2', '3', '4', '5+'];
  userData: any;
  categories = [
    { id: 1, categoryName: 'Humain Resource' },
    { id: 2, categoryName: 'Project Manager' },
    { id: 3, categoryName: 'Delivery Driver' },
    { id: 4, categoryName: 'Data Science' },
    { id: 5, categoryName: 'It & Networking' },
    { id: 6, categoryName: 'Marketing & Communication' },
  ];
  jobsList = [
    { id: 1, typeName: 'Full-time' },
    { id: 2, typeName: 'Part-time' },
    { id: 3, typeName: 'Temporary' },
    { id: 4, typeName: 'Contract' },
    { id: 5, typeName: 'Intership' },
    { id: 5, typeName: 'Permanent' },
  ];
  jobDetails!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private applyService: ApplyService,
    private toastr: ToastrService,
    private user: UserDataService,
    private formBuilder: FormBuilder,
    private jobService: JobService
  ) {
    this.data = this.router.getCurrentNavigation()?.extras.state?.['job'];
    this.userData = this.user.get();
  }

  ngOnInit(): void {
    this.jobDetails = this.formBuilder.group({
      jobCategory: [this.data.category, Validators.required],
      jobTitle: [this.data.title, Validators.required],
      jobDescription: [this.data.description, Validators.required],
      jobType: [this.data.type, Validators.required],
      salary: this.data.salary,
      startDate: this.data.start_date,
      city: [this.data.city, Validators.required],
      country: [this.data.country, Validators.required],
    });
    this.applyDetails = this.fb.group({
      fullName: [this.user.get().username, Validators.required],
      email: [this.user.get().email, Validators.required],
      phoneNumber: null,
      numberOfExper: ['', Validators.required],
      resume: ['', Validators.required],
      coverLetter: '',
    });
    this.applyDetails.get('fullName')?.disable();
    this.applyDetails.get('email')?.disable();
  }

  get job() {
    return this.jobDetails.controls;
  }

  get candidate() {
    return this.applyDetails.controls;
  }

  apply() {
    const formData = new FormData();
    formData.append('username', this.applyDetails.get('fullName')?.value);
    formData.append('email', this.applyDetails.get('email')?.value);
    formData.append('phoneNumber', this.applyDetails.get('phoneNumber')?.value);
    formData.append(
      'number_of_exper',
      this.applyDetails.get('numberOfExper')?.value
    );
    formData.append('resume', this.applyDetails.get('resume')?.value);
    formData.append('coverLetter', this.applyDetails.get('coverLetter')?.value);
    formData.append('userId', this.user.get().id);
    formData.append('jobId', this.data.id);
    this.applyService.applyJob(formData).subscribe((data) => {
      this.toastr.success('Your application done!', '', {
        timeOut: 3000,
        progressBar: true,
      });
      this.applyDetails.patchValue({
        fullName: this.user.get().username,
        email: this.user.get().email,
        phoneNumber: null,
        numberOfExper: '',
        resume: '',
        coverLetter: '',
      });
    });
  }

  toJobsList() {
    this.router.navigateByUrl('jobs');
  }

  uploadFile(event: any) {
    if (event.target.files[0].type === 'application/pdf') {
      this.applyDetails.patchValue({
        resume: event.target.files[0],
      });
    }
  }

  updateJob() {
    const formData = new FormData();
    formData.append('id', this.data.id);
    formData.append('category', this.jobDetails.get('jobCategory')?.value);
    formData.append('title', this.jobDetails.get('jobTitle')?.value);
    formData.append('type', this.jobDetails.get('jobType')?.value);
    formData.append(
      'description',
      this.jobDetails.get('jobDescription')?.value
    );
    formData.append('salary', this.jobDetails.get('salary')?.value);
    formData.append('city', this.jobDetails.get('city')?.value);
    formData.append('country', this.jobDetails.get('country')?.value);
    formData.append('startDate', this.jobDetails.get('startDate')?.value);

    this.jobService.updateJob(formData).subscribe((data) => {
      this.toastr.success('This job was updated successfully', '', {
        timeOut: 3000,
        progressBar: true,
      });
      this.jobDetails.patchValue({
        jobCategory: [this.data.category, Validators.required],
        jobTitle: [this.data.title, Validators.required],
        jobDescription: [this.data.description, Validators.required],
        jobType: [this.data.type, Validators.required],
        salary: this.data.salary,
        startDate: this.data.start_date,
        city: [this.data.city, Validators.required],
        country: [this.data.country, Validators.required],
      });
      this.router.navigateByUrl('jobs');
    });
  }
}
