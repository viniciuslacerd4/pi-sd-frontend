import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvestmentBuyRequest } from '../models/investment-buy-request.model';
import { InvestmentResponse } from '../models/investment-response.model';
import { InvestmentSellRequest } from '../models/investment-sell-request.model';
import { HttpAppService } from './http-app.service';

@Injectable({
  providedIn: 'root',
})
export class InvestmentService extends HttpAppService {
  protected override endpoint: string = '/investments';

  constructor(private httpClient: HttpClient) {
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

  public buy(
    investmentBuyRequest: InvestmentBuyRequest
  ): Observable<InvestmentResponse> {
    return this.httpClient.post<InvestmentResponse>(
      `${this.getEndpoint()}/buy`,
      investmentBuyRequest
    );
  }

  public sell(
    investmentSellRequest: InvestmentSellRequest
  ): Observable<InvestmentResponse> {
    return this.httpClient.post<InvestmentResponse>(
      `${this.getEndpoint()}/sell`,
      investmentSellRequest
    );
  }
}
