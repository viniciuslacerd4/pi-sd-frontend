import { Routes } from '@angular/router';
import { HomeComponent } from './components/logged/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';

import { LandingComponent } from './components/landing/landing.component';
import { InvestmentsHomeComponent } from './components/logged/investments/investments-home/investments-home.component';
import { InvestmentsComponent } from './components/logged/investments/investments.component';
import { ProfileComponent } from './components/logged/profile/profile.component';
import { LoggedComponent } from './components/logged/logged.component';
import { TransfersComponent } from './components/logged/transfers/transfers.component';
import { authGuard } from './services/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
    ],
  },
  { path: 'landing', component: LandingComponent },
  {
    path: '',
    component: LoggedComponent,
    canActivateChild: [authGuard],
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'transfers', component: TransfersComponent },
      {
        path: 'investments',
        component: InvestmentsComponent,
        children: [
          { path: '', component: InvestmentsHomeComponent, pathMatch: 'full' },
        ],
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
