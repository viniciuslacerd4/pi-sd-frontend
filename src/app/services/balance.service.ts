import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BalanceRequest } from '../models/balance-request.model';
import { BalanceResponse } from '../models/balance-response.model';
import { HttpAppService } from './http-app.service';

@Injectable({
  providedIn: 'root',
})
export class BalanceService extends HttpAppService {
  balance$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  protected override endpoint: string = '/balance';

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getBalance(): Observable<BalanceResponse> {
    return this.httpClient.get<BalanceResponse>(this.getEndpoint());
  }

  public operateBalance(
    balanceRequest: BalanceRequest
  ): Observable<BalanceResponse> {
    return this.httpClient.post<BalanceResponse>(
      this.getEndpoint(),
      balanceRequest
    );
  }

  public updateBalance(): void {
    this.httpClient.get<BalanceResponse>(this.getEndpoint()).subscribe({
      next: (balance) => this.balance$.next(balance.value),
      error: (error) => this.balance$.next(null),
    });
  }
}
