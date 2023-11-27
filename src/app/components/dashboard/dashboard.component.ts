import { Router } from '@angular/router';
import { CompanyService } from './../../services/company.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { Component, OnInit } from '@angular/core';
import { ApplyService } from 'src/app/services/apply.service';
import { JobService } from 'src/app/services/job.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Chart, ChartOptions, TitleOptions } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  applicationsData: any;
  jobsData: any;
  userData: any;
  applicatonsResu: any;
  j: number = 0;
  userApplications: any;
  userJobs: any;
  applicants: any;
  companies: any;
  url: any;
  chart: any;

  constructor(
    private applyService: ApplyService,
    private userDataService: UserDataService,
    private jobService: JobService,
    private companyService: CompanyService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userData = this.userDataService.get();
    this.applyService.getAllApplications().subscribe((data) => {
      this.applicationsData = data;
      this.jobService.getAllJobs().subscribe((data) => {
        this.jobsData = data;
        this.jobsData.jobs.forEach((job: any) => {
          if (job.user_id === this.userData.id) {
            this.j++;
          }
        });
        this.companyService.getAllComapnies().subscribe((data) => {
          this.companies = data;
          this.jobsData.jobs.forEach((job: any) => {
            this.companies.companies.forEach((company: any) => {
              if (job.company_id === company.id) {
                job.company = company;
              }
            });
          });
        });
        this.jobsData.jobs.forEach((job: any) => {
          this.applicationsData.applications.forEach((application: any) => {
            if (job.id === application.job_id) {
              application.job = job;
            }
          });
        });
        // this.applicatonsResu = this.applicationsData.applications.sort(
        //   (a: any, b: any) => b.id - a.id
        // );
        this.userJobs = this.jobsData.jobs
          .filter((job: any) => job.user_id === this.userData.id)
          .sort((a: any, b: any) => b.id - a.id);

        const jobsIds: number[] = this.userJobs.map((job: any) => job.id);
        this.applicants = this.applicationsData.applications
          .filter((application: any) => jobsIds.includes(application.job_id))
          .sort((a: any, b: any) => b.id - a.id);
        console.log('applicants', this.applicants);

        this.userApplications = this.applicationsData.applications
          .filter(
            (application: any) => application.user_id === this.userData.id
          )
          .sort((a: any, b: any) => b.id - a.id);
      });
    });
    this.createLineChart();
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

  createLineChart() {
    // const ctx = document.getElementById('lineChart') as HTMLCanvasElement;
    // const lineChart = new Chart(ctx, {
    //   type: 'line',
    //   data: {
    //     labels: [
    //       'January',
    //       'February',
    //       'March',
    //       'April',
    //       'May',
    //       'June',
    //       'July',
    //     ],
    //     datasets: [
    //       {
    //         label: 'Monthly Sales',
    //         data: [65, 59, 80, 81, 56, 55, 40],
    //         borderColor: 'rgba(75,192,192,1)',
    //         borderWidth: 1,
    //         fill: false,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       x: {
    //         type: 'linear',
    //         position: 'bottom',
    //       },
    //       y: {
    //         min: 0,
    //       },
    //     },
    //   },
    // });
    const ctx = document.getElementById('lineChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [
          {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  viewApplicant(app: any) {
    this.router.navigate(['application-details'], { state: { application: app } });
  }
}
