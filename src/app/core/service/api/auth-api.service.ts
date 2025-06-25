import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from "rxjs";
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  constructor(private http: HttpClient) { }

  login(): Observable<HttpResponse<any>> {
        const localUrl = `https://aab1-2001-fb1-18d-2b75-557f-c27e-74c2-943e.ngrok-free.app/login`;
        return this.http.get<HttpResponse<any>>(localUrl, { observe: 'response' });
  }
}
