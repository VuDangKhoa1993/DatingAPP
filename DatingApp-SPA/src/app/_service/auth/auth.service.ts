

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DataService } from '../base/data.service';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends DataService {
  private readonly jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(httpClient: HttpClient) {
    super(httpClient, 'auth');
  }

  login(model): Observable<any> {
    return this.httpClient.post(this.url + '/login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('userInfo', JSON.stringify(user));
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
        return response;
      })
    );
  }

  register(model): Observable<any> {
    return this.httpClient.post(this.url + '/register', model);
  }

  loggedIn() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (userInfo) {
      return !this.jwtHelper.isTokenExpired(userInfo.token);
    }
    return false;
  }
}
