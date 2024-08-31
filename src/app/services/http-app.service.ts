export abstract class HttpAppService {
  private baseUrl = 'http://localhost:8080';
  protected abstract endpoint: string;

  protected getEndpoint(): string {
    return `${this.baseUrl}${this.endpoint}`;
  }
}
