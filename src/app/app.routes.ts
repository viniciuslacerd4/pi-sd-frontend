import { Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { NotFoundComponent } from './components/errors/not-found/not-found.component';
import { HomeComponent } from './components/logged/home/home.component';

import { LandingComponent } from './components/landing/landing.component';
import { ProfileComponent } from './components/logged/profile/profile.component';
import { TransfersComponent } from './components/logged/transfers/transfers.component';
import { authGuard } from './services/guards/auth.guard';
import { ProductListComponent } from './components/logged/product/product-list/product-list.component';
import { ProductBuzzardComponent } from './components/logged/product/product-buzzard/product-buzzard.component';
import { InvestmentDetailComponent } from './components/logged/investment/investment-detail/investment-detail.component';
import { InvestmentBuzzardComponent } from './components/logged/investment/investment-buzzard/investment-buzzard.component';
import { BalanceTransferComponent } from './components/logged/balance/balance-transfer/balance-transfer.component';
import { BalanceDepositComponent } from './components/logged/balance/balance-deposit/balance-deposit.component';

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
        children: [
          {
            path: '',
            component: InvestmentBuzzardComponent,
            pathMatch: 'full',
          },
          {
            path: ':id',
            component: InvestmentDetailComponent,
          },
        ],
      },
      {
        path: 'products',
        children: [
          {
            path: '',
            component: ProductListComponent,
            pathMatch: 'full',
          },
          {
            path: ':id',
            component: ProductBuzzardComponent,
          },
        ],
      },
      {
        path: 'balance',
        children: [
          {
            path: 'transfer',
            component: BalanceTransferComponent,
          },
          {
            path: 'deposit',
            component: BalanceDepositComponent,
          },
        ],
      },
    ],
  },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' },
];
