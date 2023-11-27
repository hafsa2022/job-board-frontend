import { ProfileService } from 'src/app/services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css'],
})
export class ProfilesComponent implements OnInit {
  profilesResu!: any;
  url!: any;
  constructor(
    private router: Router,
    private profileService: ProfileService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.profileService.getAllProfiles().subscribe((data) => {
      this.profilesResu = data;
    });
  }

  getImageUrl(filename: string): SafeResourceUrl {
    if (filename === null) {
      this.url =
        'https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/45.png';
    } else {
      this.url = `http://localhost:8000/storage/images/profiles/${filename}`;
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

  selectProfile(profile: any) {
    this.router.navigate(['profile'], { state: { profile: profile } });
  }
}
