import { ProductResponse } from './product-response.model';

export interface InvestmentResponse {
  id: number;
  buyPrice: number;
  buyTime: Date;
  sellPrice: number;
  sellTime: Date;
  isSold: boolean;
  product: ProductResponse;
}
