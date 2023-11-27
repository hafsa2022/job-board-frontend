import { UserService } from 'src/app/services/user.service';
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
    numberOfExper: '',
  };
  userData: any;
  series = ['1', '2', '3', '4', '5+'];
  profileData: any;

  constructor(
    private router: Router,
    private userDataService: UserDataService,
    private profileService: ProfileService,
    private toastr: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userData = this.userDataService.get();
    console.log(this.userData.id);
    const formData = new FormData();
    formData.append('userId', this.userData.id);
    this.profileService.getProfile(formData).subscribe((data) => {
      this.profileData = data;
      this.profileDetails = {
        fullName: this.profileData.profile.username,
        email: this.profileData.profile.email,
        phoneNumber: this.profileData.profile.phone_number
          ? this.profileData.profile.phone_number
          : '',
        position: this.profileData.profile.position
          ? this.profileData.profile.position
          : '',
        resume: '',
        image: '',
        skills: this.profileData.profile.skills
          ? this.profileData.profile.skills
          : '',
        aboutYou: this.profileData.profile.about
          ? this.profileData.profile.about
          : '',
        city: this.profileData.profile.city
          ? this.profileData.profile.city
          : '',
        country: this.profileData.profile.country
          ? this.profileData.profile.country
          : '',
        numberOfExper: this.profileData.profile.number_of_exper
          ? this.profileData.profile.number_of_exper
          : '',
      };
    });
  }

  uploadFile(event: any) {
    if (event.target.files[0].type === 'application/pdf') {
      this.profileDetails.resume = event.target.files[0];
    } else if (event.target.files[0].type.startsWith('image/')) {
      this.profileDetails.image = event.target.files[0];
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
    formData.append('skills', this.profileDetails.skills);
    formData.append('about', this.profileDetails.aboutYou);
    formData.append('number_of_exper', this.profileDetails.numberOfExper);
    this.profileService.updateProfile(formData).subscribe(
      (data) => {
        this.toastr.success('Your profile was updated successfully', '', {
          timeOut: 3000,
          progressBar: true,
        });
        const formDataUser = new FormData();
        formDataUser.append('fullName', this.profileDetails.fullName);
        formDataUser.append('email', this.profileDetails.email);
        this.userService.updateUserName(formDataUser).subscribe((data) => {
          const userData: any = data;
          console.log(this.userData);
          this.userDataService.set(userData.user);
        });
        this.profileData = data;
        this.profileDetails = {
          fullName: this.profileData.profile.username,
          email: this.profileData.profile.email,
          phoneNumber: this.profileData.profile.phone_number
            ? this.profileData.profile.phone_number
            : '',
          position: this.profileData.profile.position
            ? this.profileData.profile.position
            : '',
          resume: this.profileData.profile.resume
            ? this.profileData.profile.resume
            : '',
          image: this.profileData.profile.image
            ? this.profileData.profile.image
            : '',
          skills: this.profileData.profile.skills
            ? this.profileData.profile.skills
            : '',
          aboutYou: this.profileData.profile.about
            ? this.profileData.profile.about
            : '',
          city: this.profileData.profile.city
            ? this.profileData.profile.city
            : '',
          country: this.profileData.profile.country
            ? this.profileData.profile.country
            : '',
          numberOfExper: this.profileData.profile.number_of_exper
            ? this.profileData.profile.number_of_exper
            : '',
        };
      },
      (error) => console.log(error)
    );
  }
}
