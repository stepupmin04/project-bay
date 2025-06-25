import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AuthApiService } from '../../../core/service/api/auth-api.service';
import { CardModule } from 'primeng/card';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { MatGridListModule } from '@angular/material/grid-list';
import { Router } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { FormControl, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from '../../../core/service/api/authentication.service';

@Component({
  selector: 'app-login',
  imports: [
    ButtonModule,
    InputTextModule,
    CardModule,
    InputGroupModule,
    InputGroupAddonModule,
    MatGridListModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  form: FormGroup = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  error: string = '';
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {

  }

  ngOnInit() {
    this.authenticationService.removeStorage();
  }

  login() {
    this.error = '';
    let data = this.form.value;
    if (!(this.form.controls['username'].value === 'test' && this.form.controls['password'].value === '1234')) {
      this.error = 'username หรือ passwoed ไม่ถูกต้องกรุณาลองใหม่';
      return;
    }
    this.authenticationService.login(data).subscribe(res => {
      if (res) {
        this.router.navigate(['/home']);
      }
    });
  }

}
