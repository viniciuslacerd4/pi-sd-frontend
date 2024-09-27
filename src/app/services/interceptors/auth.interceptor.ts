import { HttpInterceptorFn } from '@angular/common/http';
import { JwtUser } from '../../models/jwt-user.model';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const jwtUser = JwtUser.fromLocalStorage();
  if (!req.url.match('/auth/') && jwtUser?.jwtToken != null) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwtUser.jwtToken}`,
      },
    });
  }
  return next(req);
};
