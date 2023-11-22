import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDataService } from 'src/app/services/user-data.service';
import { ProfileService } from 'src/app/services/profile.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent implements OnInit {
  profileDetails = {
    fullName: '',
    email: '',
    phoneNumber: '',
    position: '',
    resume: '',
    image: '',
    skills: '',
    aboutYou: '',
    city: '',
    country: '',
  };
  userData: any;
  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private profileService: ProfileService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.userData = this.userDataService.get();
    this.profileDetails = {
      fullName: this.userData.username,
      email: this.userData.email,
      phoneNumber: '',
      position: '',
      resume: '',
      image: '',
      skills: '',
      aboutYou: '',
      city: '',
      country: '',
    };
  }
  uploadFile(event: any) {
    if (event.target.files[0].type === 'application/pdf') {
      this.profileDetails.resume = event.target.files[0];
      console.log(this.profileDetails.resume);
    } else if (event.target.files[0].type.startsWith('image/')) {
      this.profileDetails.image = event.target.files[0];
      console.log(this.profileDetails.image);
    } else {
      return;
    }
  }
  submit() {
    const formData = new FormData();
    formData.append('fullName', this.profileDetails.fullName);
    formData.append('email', this.profileDetails.email);
    formData.append('phoneNumber', this.profileDetails.phoneNumber);
    formData.append('position', this.profileDetails.position);
    formData.append('resume', this.profileDetails.resume);
    formData.append('image', this.profileDetails.image);
    formData.append('city', this.profileDetails.city);
    formData.append('country', this.profileDetails.country);
    this.profileService.updateProfile(formData).subscribe(
      (data) => {
        this.toastr.success('Your profile was updated successfully', '', {
          timeOut: 2000,
          progressBar: true,
        });
      },
      (error) => console.log(error)
    );
  }
}
