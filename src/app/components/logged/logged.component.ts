import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtUser } from '../../models/jwt-user.model';
import { AccountResponse } from '../../models/account-response.model';
import { AccountService } from '../../services/account.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-logged',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet, CurrencyPipe],
  templateUrl: './logged.component.html',
  styleUrl: './logged.component.css',
})
export class LoggedComponent implements OnInit {
  accountResponse: AccountResponse;

  constructor(
    private authService: AuthService,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.$jwtUser.subscribe((jwtUser) => {
      if (jwtUser?.accountId != null) {
        this.accountService
          .findById(jwtUser.accountId)
          .subscribe((accountResponse) => {
            this.accountResponse = accountResponse;
          });
      }
    });
  }
}
