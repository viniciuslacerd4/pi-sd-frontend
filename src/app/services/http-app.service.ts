import { baseUrl } from '../utils/base-url';

export abstract class HttpAppService {
  protected abstract endpoint: string;

  protected getEndpoint(): string {
    const fixedEndpoint = this.endpoint.startsWith('/')
      ? this.endpoint.substring(1)
      : this.endpoint;
    return `${baseUrl}${fixedEndpoint}`;
  }
}
