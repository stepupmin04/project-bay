import { HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../service/api/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthenticationService);
  const token = authService.getToken();
  const ignoreUrl = ['https://aab1-2001-fb1-18d-2b75-557f-c27e-74c2-943e.ngrok-free.app/login'];
   if (token && !ignoreUrl.includes(req.url)) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest);
  }

  return next(req);
};
