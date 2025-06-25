import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptor/auth.interceptor';
import { handleErrorInterceptor } from './core/interceptor/handle-error.interceptor';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthApiService } from './core/service/api/auth-api.service';
import { NgxSpinnerModule } from 'ngx-spinner';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura
      }
    }),
    provideHttpClient(
      withInterceptors([authInterceptor,handleErrorInterceptor]),
    ),
    importProvidersFrom(NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }))
  ]
};
