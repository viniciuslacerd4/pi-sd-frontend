import { Injectable } from '@angular/core';
import { HttpAppService } from './http-app.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { JwtUser } from '../models/jwt-user.model';
import { AuthResponse } from '../models/auth-response.model';
import { AppConstants } from '../utils/app-constants';
import { Router } from '@angular/router';
import { BalanceService } from './balance.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends HttpAppService {
  jwtUser$: BehaviorSubject<JwtUser> = new BehaviorSubject<JwtUser>(null);

  protected override endpoint: string = '/auth';

  private tokenExpirationTimer: any;

  constructor(
    private httpClient: HttpClient,
    private balanceService: BalanceService,
    private router: Router
  ) {
    super();
  }

  public login(username: string, password: string) {
    return this.httpClient
      .post(
        `${this.getEndpoint()}/login`,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Basic ' + btoa(`${username}:${password}`),
          }),
          observe: 'response',
        }
      )
      .pipe(
        map((response) => {
          const jwtUser = new JwtUser(
            +response.body['id'],
            response.body['email'],
            response.headers.get('Authorization'),
            response.body['accountId']
          );

          this.updateJwtUser(jwtUser);
          this.autoLogout(jwtUser.expirationTime);
          return jwtUser;
        })
      );
  }

  // this is called in app.component.ts only
  public autoLogin() {
    const jwtUser = JwtUser.fromLocalStorage();
    if (jwtUser != null && jwtUser?.jwtToken) {
      this.jwtUser$.next(jwtUser);
      this.balanceService.updateBalance();
      this.autoLogout(jwtUser.expirationTime);
    }
  }

  public logout() {
    localStorage.removeItem(AppConstants.USER_LOCALSTORAGE_KEY);

    //clear autologout timer
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
    this.jwtUser$.next(null);
    this.balanceService.updateBalance();
  }

  public register(
    username: string,
    password: string
  ): Observable<AuthResponse> {
    const request = {
      email: username,
      password: password,
    };
    return this.httpClient.post<AuthResponse>(
      `${this.getEndpoint()}/register`,
      request
    );
  }

  public updateJwtUser(jwtUser: JwtUser) {
    localStorage.setItem(
      AppConstants.USER_LOCALSTORAGE_KEY,
      JSON.stringify(jwtUser)
    );
    this.jwtUser$.next(jwtUser);
    this.balanceService.updateBalance();
  }

  private autoLogout(expirationTime: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      // TODO can add a toast message here
      this.logout();
      this.router.navigate(['/auth', 'login']);
    }, expirationTime);
  }
}
