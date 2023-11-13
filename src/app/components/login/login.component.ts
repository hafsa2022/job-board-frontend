import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthstatusService } from 'src/app/services/authstatus.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public form = {
    email: null,
    password: null,
  };
  error: any = '';
  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router,
    private authStatusService: AuthstatusService
  ) {}
  submitLogin() {
    this.authService.login(this.form).subscribe(
      (data) => this.handelResponse(data),
      (error) => this.handelError(error)
    );
  }

  handelResponse(data: any) {
    this.tokenService.handel(data.token);
    this.authStatusService.changeStatus(true);
    this.router.navigateByUrl('/jobs');
  }

  handelError(error: any) {
    this.error = error.error.error;
  }
}
