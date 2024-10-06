import { Injectable } from '@angular/core';
import { HttpAppService } from './http-app.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { InvestmentResponse } from '../models/investment-response.model';
import { InvestmentRequest } from '../models/investment-request.model';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService extends HttpAppService {
  protected override endpoint: string = '/investments';

  constructor(private httpClient: HttpClient, private router: Router) {
    super();
  }

  public findAll(): Observable<InvestmentResponse[]> {
    return this.httpClient.get<InvestmentResponse[]>(this.getEndpoint());
  }

  public findById(id: number): Observable<InvestmentResponse> {
    return this.httpClient.get<InvestmentResponse>(
      `${this.getEndpoint()}/${id}`
    );
  }

  public create(
    investmentRequest: InvestmentRequest
  ): Observable<InvestmentResponse> {
    return this.httpClient.post<InvestmentResponse>(
      this.getEndpoint(),
      investmentRequest
    );
  }

  public sell(id: number): Observable<InvestmentResponse> {
    return this.httpClient.get<InvestmentResponse>(
      `${this.getEndpoint()}/${id}/sell`
    );
  }
}
