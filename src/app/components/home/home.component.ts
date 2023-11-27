import { Router } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  categories = [
    {
      categoryName: 'Humain Resource',
      numberOfJobs: 0,
    },
    {
      categoryName: 'Project Manager',
      numberOfJobs: 0,
    },
    {
      categoryName: 'Delivery Driver',
    },
    {
      categoryName: 'Data Science',
      numberOfJobs: 0,
    },
    {
      categoryName: 'It & Networking',
      numberOfJobs: 0,
    },
    { categoryName: 'Marketing & Communication', numberOfJobs: 0 },
  ];
  jobsResu!: any;
  jobs!: any;
  companies!: any;
  users!: any;
  searchTitle: string = '';
  searchCity: string = '';
  url: any;
  constructor(
    private jobService: JobService,
    private companyService: CompanyService,
    private sanitizer: DomSanitizer,
    private userService: UserService,
    private router: Router
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
        this.jobsResu = this.jobs.jobs
          .sort((a: any, b: any) => b.id - a.id)
          .slice(0, 5);
        this.calculateNumberOfJobs(this.jobs.jobs);
      });
    });
    this.userService.getAllusers().subscribe((data) => {
      this.users = data;
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

  calculateNumberOfJobs(data: any) {
    var i = 0;
    this.categories.forEach((category) => {
      data.forEach((job: any) => {
        if (job.category === category.categoryName) {
          i++;
        }
      });
      category.numberOfJobs = i;
      i = 0;
    });
  }

  search(): void {
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
        if (this.searchTitle != '' && this.searchCity != '') {
          this.jobsResu = this.jobs.jobs
            .filter((job: any) => {
              const lowerCaseTitle = job.title.toLowerCase();
              const lowerCaseCity = job.city.toLowerCase();

              const condition1 = lowerCaseTitle.includes(
                this.searchTitle.toLowerCase()
              );
              const condition2 = lowerCaseCity.includes(
                this.searchCity.toLowerCase()
              );

              return condition1 && condition2;
            })
            .slice(0, 5)
            .sort((a: any, b: any) => b.id - a.id);
        } else if (this.searchTitle != '') {
          this.jobsResu = this.jobs.jobs
            .filter((job: any) =>
              job.title.toLowerCase().includes(this.searchTitle.toLowerCase())
            )
            .slice(0, 5)
            .sort((a: any, b: any) => b.id - a.id);
        } else {
          this.jobsResu = this.jobs.jobs
            .filter((job: any) =>
              job.city.toLowerCase().includes(this.searchCity.toLowerCase())
            )
            .slice(0, 5)
            .sort((a: any, b: any) => b.id - a.id);
        }
      });
    });
  }
}
