import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { BalanceResponse } from '../models/balance-response.model';
import { AuthService } from './auth.service';
import { HttpAppService } from './http-app.service';
import { BalanceRequest } from '../models/balance-request.model';

@Injectable({
  providedIn: 'root',
})
export class BalanceService extends HttpAppService implements OnDestroy {
  balance$: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  private authSubscription: Subscription;

  protected override endpoint: string = '/balance';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {
    super();

    this.authSubscription = this.authService.jwtUser$.subscribe((jwtUser) => {
      this.updateBalance();
    });
  }

  ngOnDestroy(): void {
    this.authSubscription?.unsubscribe();
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
    this.getBalance().subscribe({
      next: (balance) => this.balance$.next(balance.value),
      error: () => this.balance$.next(null),
    });
  }
}
