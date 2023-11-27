import { ProfileService } from './../../services/profile.service';
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  res!: any;
  public form = {
    role: 'Employer',
    fullname: null,
    email: null,
    password: null,
    password_confirmation: null,
  };
  error: any = [];
  getResponse: boolean = false;
  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private profileService: ProfileService
  ) {}

  submitSignup() {
    return this.authService.signup(this.form).subscribe(
      (data) => {
        this.res = data;
        this.getResponse = true;
        this.form = {
          role: 'Employer',
          fullname: null,
          email: null,
          password: null,
          password_confirmation: null,
        };
        const params = {
          userId: this.res.userData.id,
          fullName: this.res.userData.username,
          email: this.res.userData.email,
        };
        this.profileService.addProfile(params).subscribe((res) => {
          this.toastr.success(
            'Your account created succesfully, please go to Log In.',
            '',
            {
              timeOut: 3000,
              progressBar: true,
            }
          );
        });
      },
      (error) => this.handelError(error)
    );
  }
  handelError(error: any) {
    this.error = error.error.errors;
  }
}
