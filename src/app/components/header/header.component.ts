import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { JwtUser } from '../../models/jwt-user.model';
import { AccountResponse } from '../../models/account-response.model';
import { AccountService } from '../../services/account.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user: JwtUser;
  accountResponse: AccountResponse;

  constructor(
    private authService: AuthService,
    private router: Router,
    private accountService: AccountService
  ) {}

  ngOnInit(): void {
    this.authService.$jwtUser.subscribe((jwtUser) => {
      this.user = jwtUser;

      if (jwtUser?.accountId != null) {
        this.accountService
          .findById(jwtUser.accountId)
          .subscribe((accountResponse) => {
            this.accountResponse = accountResponse;
          });
      } else {
        this.accountResponse = null;
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }
}
