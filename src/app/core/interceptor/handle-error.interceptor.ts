import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, throwError } from 'rxjs';


export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const skipApis = ['https://aab1-2001-fb1-18d-2b75-557f-c27e-74c2-943e.ngrok-free.app/login'];
  const shouldSkip = skipApis.includes(req.url);

  const requestCount = 0;
  const spinner = inject(NgxSpinnerService);
  // if (requestCount === 0) {
    spinner.show();
  // }
  // requestCount++;
  //  const spinner = inject(NgxSpinnerService);
  //  spinner.show();

  return next(req).pipe(
    catchError((error) => {
      if (!shouldSkip) {
        const status = error?.status;
        if (status === 401) {
          // return this.handle401();
        } else if (status === 403) {
          // return this.refreshTokenMethod(request, next);
        } else {
          // return this.handleOtherErrors(error);
        }
      }

      return throwError(() => error);
    }),
    finalize(() => {
      setTimeout(() => {
          spinner.hide();
      }, 1000);
    })
  );

};
