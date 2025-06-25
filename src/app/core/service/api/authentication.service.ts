import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthApiService } from './auth-api.service';
import { User } from '../model/master.model';

enum Storage {
  token = 'token',
  user = 'user'
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  X_TOKEN: string = '';
  constructor(private authApiService: AuthApiService
  ) { }

  login(data: any): Observable<any> {
    return this.authApiService.login().pipe(tap((resp) => {
      if (resp) {
        const token = resp.body['token'];
        this.setToken(token || '');
        this.setUser(JSON.stringify(data));
      }
    })
    );
  }

  isValidAuth(): boolean {
    return !!this.getToken();
  }

  setToken(token: string) {
    localStorage.setItem(Storage.token, token);
  }

  getToken() {
    return localStorage.getItem(Storage.token);
  }

  setUser(user: string) {
    localStorage.setItem(Storage.user, user);
  }

  getUser(): User {
    return JSON.parse(localStorage.getItem(Storage.user) || '');
  }

  async removeStorage(): Promise<void> {
    localStorage.removeItem(Storage.token);
  }
}
