import { ProductResponse } from './product-response.model';

export interface InvestmentResponse {
  id: number;
  investedValue: number;
  buyPrice: number;
  buyTime: Date;
  sellPrice: number;
  sellTime: Date;
  isSold: boolean;
  product: ProductResponse;
}
