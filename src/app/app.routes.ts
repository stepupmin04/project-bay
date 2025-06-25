import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { authGuard } from './core/guard/auth.guard';

export const routes: Routes = [
        {
                path: '',
                redirectTo: '',
                pathMatch: 'full'
        },
        {
                path: '',
                component: LoginComponent,
                canActivate: [authGuard]
        },
        {
                path: 'login',
                component: LoginComponent,
        },
        {
                path: '',
                loadChildren: () => import('./pages/component/component.module').then(m => m.ComponentModule),
        }
];
