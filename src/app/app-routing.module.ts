import { ApplicationDetailsComponent } from './components/application-details/application-details.component';
import { JobViewComponent } from './components/job-view/job-view.component';
import { HomeComponent } from './components/home/home.component';
import { JobsComponent } from './components/jobs/jobs.component';
import { ProfilesComponent } from './components/profiles/profiles.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { AfterLoginService } from './services/after-login.service';
import { BeforeLoginService } from './services/before-login.service';
import { ProfileViewComponent } from './components/profile-view/profile-view.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService],
  },
  { path: 'profiles', component: ProfilesComponent },
  { path: 'jobs', component: JobsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'job-view',
    component: JobViewComponent,
  },
  {
    path: 'profile',
    component: ProfileViewComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AfterLoginService],
  },
  {
    path: 'application-details',
    component: ApplicationDetailsComponent,
    canActivate: [AfterLoginService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
