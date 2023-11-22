import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css'],
})
export class ProfileViewComponent {
  constructor(private router: Router) {}

  toProfilesList() {
    this.router.navigateByUrl('profiles');
  }
}
