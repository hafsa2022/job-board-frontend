import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { JobService } from 'src/app/services/job.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
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
  jobsResu!: any;
  jobs!: any;
  companies!: any;
  userData!: any;
  searchCategory!: any;
  searchType!: any;
  searchCity!: any;
  searchCountry!: any;
  url!: any;
  selectedJob: any;

  constructor(
    private router: Router,
    private jobService: JobService,
    private companyService: CompanyService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe((data) => {
      this.jobs = data;
      this.companyService.getAllComapnies().subscribe((data) => {
        this.companies = data;
        this.jobs.jobs.forEach((job: any) => {
          this.companies.companies.forEach((company: any) => {
            if (job.company_id === company.id) {
              job.company = company;
            }
          });
        });
      });
      this.jobsResu = this.jobs.jobs.sort((a: any, b: any) => b.id - a.id);
      console.log(this.jobsResu.length);
    });
  }
  getImageUrl(filename: string): any {
    if (filename === null) {
      this.url = './../../../assets/company_img.png';
      return this.url;
    } else {
      this.url = `http://localhost:8000/storage/images/companiesLogos/${filename}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }

  toBrowseJobs() {
    this.router.navigateByUrl('jobs');
  }

  search(): void {
    // this.jobService.getAllJobs().subscribe((data) => {
    //   this.jobs = data;
    //   this.companyService.getAllComapnies().subscribe((data) => {
    //     this.companies = data;
    //     this.jobs.jobs.forEach((job: any) => {
    //       this.companies.companies.forEach((company: any) => {
    //         if (job.company_id === company.id) {
    //           job.company = company;
    //         }
    //       });
    //     });
    //     if (
    //       this.searchCountry != '' &&
    //       this.searchCity != '' &&
    //       this.searchCategory != '' &&
    //       this.searchType != ''
    //     ) {
    //       this.jobsResu = this.jobs.jobs
    //         .filter((job: any) => {
    //           const lowerCaseCategory = job.title.toLowerCase();
    //           const lowerCaseCity = job.city.toLowerCase();
    //           const lowerCaseCountry = job.country.toLowerCase();
    //           const lowerCaseType = job.type.toLowerCase();

    //           const condition1 = lowerCaseCategory.includes(
    //             this.searchCategory.toLowerCase()
    //           );
    //           const condition2 = lowerCaseCity.includes(
    //             this.searchCity.toLowerCase()
    //           );
    //           const condition3 = lowerCaseCountry.includes(
    //             this.searchCountry.toLowerCase()
    //           );
    //           const condition4 = lowerCaseType.includes(
    //             this.searchType.toLowerCase()
    //           );
    //           return condition1 && condition2 && condition3 && condition4;
    //         })
    //         .slice(0, 5)
    //         .sort((a: any, b: any) => b.id - a.id);
    //     } else if (this.searchCity != '') {
    //       this.jobsResu = this.jobs.jobs
    //         .filter((job: any) =>
    //           job.title
    //             .toLowerCase()
    //             .includes(this.searchCategory.toLowerCase())
    //         )
    //         .slice(0, 5)

    //         .sort((a: any, b: any) => b.id - a.id);
    //     } else {
    //       this.jobsResu = this.jobs.jobs
    //         .filter((job: any) =>
    //           job.city.toLowerCase().includes(this.searchCity.toLowerCase())
    //         )
    //         .slice(0, 5)
    //         .sort((a: any, b: any) => b.id - a.id);
    //     }
    //   });
    // });
    const formData = new FormData();
    formData.append('type', this.searchType);
    formData.append('category', this.searchCategory);
    formData.append('city', this.searchCity);
    formData.append('country', this.searchCountry);
    this.jobService.searchJobs(formData).subscribe((data) => {
      this.jobs = data;
      this.companyService.getAllComapnies().subscribe((data) => {
        this.companies = data;
        this.jobs.jobs.forEach((job: any) => {
          this.companies.companies.forEach((company: any) => {
            if (job.company_id === company.id) {
              job.company = company;
            }
          });
        });
        this.jobsResu = this.jobs.jobs.sort((a: any, b: any) => b.id - a.id);
      });
    });
  }

  selectJob(job: any) {
    this.router.navigate(['job-view'], { state: { job: job } });
  }
}
