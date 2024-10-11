import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { map } from 'rxjs';
import { JwtUser } from '../../models/jwt-user.model';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateChildFn = (route, state) => {
  const router = inject(Router);
  return inject(AuthService).jwtUser$.pipe(
    map((user: JwtUser) => {
      return user != null ? true : router.createUrlTree(['/auth', 'login']);
    })
  );
};
