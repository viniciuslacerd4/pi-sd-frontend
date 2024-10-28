import { baseUrl } from '../utils/base-url';

export abstract class HttpAppService {
  protected abstract endpoint: string;

  protected getEndpoint(): string {    
    return `${baseUrl}${this.endpoint}`;
  }
}
