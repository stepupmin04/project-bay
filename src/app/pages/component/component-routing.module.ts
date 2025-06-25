import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { HomeComponent } from '../auth/home/home.component';
import { authGuard } from '../../core/guard/auth.guard';
import { TopbarComponent } from '../auth/topbar/topbar.component';

const routes: Routes = [
  {
    path: '', component: TopbarComponent, children: [
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard]
      },
      {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [authGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
