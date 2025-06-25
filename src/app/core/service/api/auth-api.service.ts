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
        const localUrl = `http://localhost:3000/login`;
        return this.http.get<HttpResponse<any>>(localUrl, { observe: 'response' });
  }
}
