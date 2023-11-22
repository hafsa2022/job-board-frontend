import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TokenService } from 'src/app/services/token.service';
import { Router } from '@angular/router';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { UserDataService } from 'src/app/services/user-data.service';
import { ToastrService } from 'ngx-toastr';
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
    private authStatusService: AuthstatusService,
    private userDataService: UserDataService,
    private toastr: ToastrService,
  ) {}
  submitLogin() {
    this.authService.login(this.form).subscribe(
      (data) => {
        this.handelResponse(data);
        this.toastr.success('Welcome to our app', '', {
          timeOut: 2000,
          progressBar: true,
        });
      },
      (error) => this.handelError(error)
    );
  }

  handelResponse(data: any) {
    this.tokenService.handel(data.token);
    this.userDataService.handel(data.user);
    this.authStatusService.changeStatus(true);
    this.router.navigateByUrl('/');
  }

  handelError(error: any) {
    this.error = error.error.error;
  }

  toSignUp() {
    this.router.navigateByUrl('signup');
  }
}
