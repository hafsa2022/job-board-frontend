import { Component, OnInit } from '@angular/core';
import { AuthstatusService } from 'src/app/services/authstatus.service';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn: boolean = false;
  navbarOpen = false;
  constructor(
    private authStatusService: AuthstatusService,
    private router: Router,
    private tokenService: TokenService
  ) {}
  ngOnInit(): void {
    this.authStatusService.authStatus.subscribe(
      (value) => (this.loggedIn = value)
    );
  }

  logout(event: MouseEvent) {
    event.preventDefault();
    this.authStatusService.changeStatus(false);
    this.tokenService.remove();
    this.router.navigateByUrl('/');
  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
