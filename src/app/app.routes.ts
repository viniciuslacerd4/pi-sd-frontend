import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { InvestmentsComponent } from './components/investments/investments.component';
import { InvestmentsHomeComponent } from './components/investments/investments-home/investments-home.component';
import { LandingComponent } from './components/landing/landing.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'investments',
    component: InvestmentsComponent,
    children: [
      { path: '', component: InvestmentsHomeComponent, pathMatch: 'full' },
    ],
  },
  { path: 'landing', component: LandingComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
