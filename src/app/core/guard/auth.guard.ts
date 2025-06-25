import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from '../service/api/authentication.service';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authenticationService = inject(AuthenticationService);
  if (authenticationService.isValidAuth()) {
    return true;
  }
  router.navigate(['/login']);
  return false;
};
