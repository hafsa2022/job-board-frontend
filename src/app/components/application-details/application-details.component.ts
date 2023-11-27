import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-application-details',
  templateUrl: './application-details.component.html',
  styleUrls: ['./application-details.component.css'],
})
export class ApplicationDetailsComponent implements OnInit {
  data!: any;
  url!: any;
  profilesData: any;
  applicantProfile: any;
  urlImage: any;

  constructor(
    private router: Router,
    private sanitizer: DomSanitizer,
    private profileService: ProfileService
  ) {
    this.data =
      this.router.getCurrentNavigation()?.extras.state?.['application'];
    console.log(this.data.cover_lettre);

  }

  ngOnInit(): void {
    this.profileService.getAllProfiles().subscribe((res) => {
      this.profilesData = res;
      this.profilesData.profiles.forEach((profile: any) => {
        if (profile.email === this.data.email) {
          this.applicantProfile = profile;
        }
      });
    });
  }

  getImageUrl(filename: string): SafeResourceUrl {
    this.urlImage = `http://localhost:8000/storage/images/profiles/${filename}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlImage);
  }

  getResume(resumeName: string): any {
    if (resumeName != null) {
      this.url = `http://localhost:8000/storage/resumes/${resumeName}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
    }
  }
}
