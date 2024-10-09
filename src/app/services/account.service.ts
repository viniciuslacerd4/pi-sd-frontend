import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountResponse } from '../models/account-response.model';
import { HttpAppService } from './http-app.service';
import { AccountRequest } from '../models/account-request.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService extends HttpAppService {
  protected override endpoint: string = '/accounts';

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
  }

  public findById(id: number): Observable<AccountResponse> {
    return this.httpClient.get<AccountResponse>(`${this.getEndpoint()}/${id}`);
  }

  public create(account: AccountRequest): Observable<AccountResponse> {
    return this.httpClient.post<AccountResponse>(this.getEndpoint(), account);
  }
}
