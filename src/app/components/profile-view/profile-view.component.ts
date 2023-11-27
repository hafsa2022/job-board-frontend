import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent {
  data!: any;
  url: any;
  urlImage: any;
  constructor(private router: Router, private sanitizer: DomSanitizer) {
    this.data = this.router.getCurrentNavigation()?.extras.state?.['profile'];
  }

  getResume(resumeName: string): any {
    if (resumeName != null) {
      this.url = `http://localhost:8000/storage/resumes/${resumeName}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
      //  window.open(this.url, '_blank');
    }
  }

  getImageUrl(filename: string): SafeResourceUrl {
    this.urlImage = `http://localhost:8000/storage/images/profiles/${filename}`;
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.urlImage);
  }

  toProfilesList() {
    this.router.navigateByUrl('profiles');
  }
}
