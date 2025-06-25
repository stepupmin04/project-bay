import { Component } from '@angular/core';
import { ActivationEnd, NavigationEnd, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { LayoutModule } from '@angular/cdk/layout';
import { filter, map, Observable, of } from 'rxjs';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    ButtonModule,
    LayoutModule,
    NgxSpinnerModule,
    ProgressSpinnerModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'project-bay';
  isLoginPageAngular: Observable<Boolean> = of(true);
  CUST_SUIT_BY_PASS = 'CustSuitByPass';
  isCustSuitByPass!: boolean;
  constructor(
    private router: Router,
  ) { }
  ngOnInit() {
    this.isLoginPageAngular = this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map((a: NavigationEnd) => a.url !== 'login')
    );

    // this.router.events.subscribe(e => {
    //   if (e instanceof ActivationEnd && e.snapshot.data?.['pageName'] === this.CUST_SUIT_BY_PASS) {
    //     this.isCustSuitByPass = e.snapshot.data?.['pageName'] === this.CUST_SUIT_BY_PASS;
    //     // this.navbarOpen = true;
    //   }

    // });
  }
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.isLoginPageAngular

  }
}
