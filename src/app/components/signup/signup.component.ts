import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  public form = {
    role: 'Employer',
    fullname: null,
    email: null,
    password: null,
    password_confirmation: null,
  };
  error: any = [];
  constructor(private authService: AuthService) {}

  submitSignup() {
    return this.authService.signup(this.form).subscribe(
      (data) => console.log(data),
      (error) => this.handelError(error)
    );
  }
  handelError(error: any) {
    this.error = error.error.errors;
  }
}
