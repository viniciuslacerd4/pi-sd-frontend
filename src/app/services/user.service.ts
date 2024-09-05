import { Injectable } from '@angular/core';
import { HttpAppService } from './http-app.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends HttpAppService {
  protected override endpoint: string = '/users';
}
