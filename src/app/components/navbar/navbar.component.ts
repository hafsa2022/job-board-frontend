import { JobService } from './../../services/job.service';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserDataService } from 'src/app/services/user-data.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  companyData!: any;
  postData!: FormGroup;
  companyInformation!: FormGroup;
  jobDetails!: FormGroup;
  // educationalDetails!: FormGroup;
  company_step = false;
  job_step = false;
  // education_step = false;
  step = 1;
  loggedIn: boolean = false;
  navbarOpen = false;
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
  constructor(
    private authStatusService: AuthstatusService,
    private router: Router,
    private tokenService: TokenService,
    private userDataService: UserDataService,
    private formBuilder: FormBuilder,
    private companyService: CompanyService,
    private jobService: JobService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.authStatusService.authStatus.subscribe(
      (value) => (this.loggedIn = value)
    );
    // this.postData = this.formBuilder.group({
    //   companyName: '',
    //   websiteUrl: '',
    //   logo: null,
    //   companyDescription: '',
    //   jobCategory: '',
    //   jobTitle: '',
    //   jobType: '',
    //   salary: '',
    //   startDate: null,
    //   contactEmail: '',
    //   city: '',
    // });
    this.companyInformation = this.formBuilder.group({
      companyName: ['', Validators.required],
      websiteUrl: '',
      logo: '',
      companyDescription: ['', Validators.required],
    });
    this.jobDetails = this.formBuilder.group({
      jobCategory: ['', Validators.required],
      jobTitle: ['', Validators.required],
      jobDescription: ['', Validators.required],
      jobType: ['', Validators.required],
      salary: '',
      startDate: null,
      city: ['', Validators.required],
      country: ['', Validators.required],
    });
    // this.educationalDetails = this.formBuilder.group({
    //   highest_qualification: ['', Validators.required],
    //   university: ['', Validators.required],
    //   total_marks: ['', Validators.required],
    // });
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.authStatusService.changeStatus(false);
    this.tokenService.remove();
    this.router.navigateByUrl('/');
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  get company() {
    return this.companyInformation.controls;
  }

  // get education() {
  //   return this.educationalDetails.controls;
  // }

  get job() {
    return this.jobDetails.controls;
  }

  next() {
    if (this.step == 1) {
      this.company_step = true;
      if (this.companyInformation.invalid) {
        return;
      }
      this.step++;
    }
    // if (this.step == 2) {
    //   this.job_step = true;
    //   if (this.jobDetails.invalid) {
    //     return;
    //   }
    //   this.step++;
    // }
  }
  uploadFile(event: any) {
    if (event.target.files[0].type.startsWith('image/')) {
      this.companyInformation.patchValue({
        logo: event.target.files[0],
      });
    } else {
      return;
    }
  }

  previous() {
    this.step--;
    if (this.step == 1) {
      this.company_step = false;
    }
    // if (this.step == 2) {
    //   this.education_step = false;
    // }
  }

  submit() {
    if (this.step == 2) {
      this.job_step = true;
      if (this.jobDetails.invalid) {
        return;
      }
      // this.postData.patchValue({
      //   companyName: this.companyInformation.get('companyName')?.value,
      //   websiteUrl: this.companyInformation.get('websiteUrl')?.value,
      //   logo: this.companyInformation.get('logo')?.value,
      //   companyDescription:
      //     this.companyInformation.get('companyDescription')?.value,
      //   jobCategory: this.jobDetails.get('jobCategory')?.value,
      //   jobTitle: this.jobDetails.get('jobTitle')?.value,
      //   jobType: this.jobDetails.get('jobType')?.value,
      //   salary: this.jobDetails.get('salary')?.value,
      //   startDate: this.jobDetails.get('startDate')?.value,
      //   contactEmail: this.jobDetails.get('contactEmail')?.value,
      //   city: this.jobDetails.get('city')?.value,
      // });
      if (this.userDataService.get().role === 'Employer') {
        const formData = new FormData();
        formData.append(
          'websiteUrl',
          this.companyInformation.get('websiteUrl')?.value
        );
        formData.append(
          'name',
          this.companyInformation.get('companyName')?.value
        );
        formData.append(
          'description',
          this.companyInformation.get('companyDescription')?.value
        );
        formData.append('logo', this.companyInformation.get('logo')?.value);
        formData.append('userId', this.userDataService.get().id);
        this.companyService.addCompany(formData).subscribe((data) => {
          this.companyData = data;
          const formData = new FormData();
          formData.append(
            'category',
            this.jobDetails.get('jobCategory')?.value
          );
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
          formData.append('companyId', this.companyData.company.id);
          formData.append('userId', this.userDataService.get().id);
          this.jobService.addJob(formData).subscribe((data) => {
            this.toastr.success('This job was created successfully', '', {
              timeOut: 2000,
              progressBar: true,
            });
            this.companyInformation.patchValue({
              companyName: '',
              websiteUrl: '',
              logo: null,
              companyDescription: '',
            });
            this.jobDetails.patchValue({
              jobCategory: '',
              jobTitle: '',
              jobDescription: '',
              jobType: '',
              salary: '',
              startDate: null,
              contactEmail: '',
              phoneNumber: '',
              city: '',
            });
          });
        });
      } else {
        this.router.navigateByUrl('signup');
      }
    }
  }

  toSignIn() {
    this.router.navigateByUrl('login');
  }
}
