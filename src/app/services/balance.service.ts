import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subscription,
  throwError,
} from 'rxjs';
import { BalanceRequest } from '../models/balance-request.model';
import { BalanceResponse } from '../models/balance-response.model';
import { AuthService } from './auth.service';
import { HttpAppService } from './http-app.service';

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
    console.log('updateBalance');

    this.httpClient
      .get<BalanceResponse>(this.getEndpoint())
      .pipe(
        catchError((error: any) => {
          return throwError(() => 'Something went wrong');
        })
      )
      .subscribe({
        next: (balance) => this.balance$.next(balance.value),
        error: (error) => this.balance$.next(null),
      });
  }
}
