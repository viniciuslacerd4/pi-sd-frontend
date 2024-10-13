import { HttpInterceptorFn } from '@angular/common/http';
import { JwtUser } from '../../models/jwt-user.model';
import { AuthService } from '../auth.service';
import { inject } from '@angular/core';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtUser: JwtUser = inject(AuthService).jwtUser$.value;

  if (!req.url.match('/auth/') && jwtUser?.jwtToken != null) {
    req = req.clone({
      setHeaders: {
        Authorization: `${jwtUser.jwtToken}`,
      },
    });
  }
  return next(req);
};
