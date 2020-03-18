import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { DataService } from '../base/data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/_model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService {
  constructor(httpClient: HttpClient) {
    super(httpClient, 'users');
  }

  getUsers(): Observable<User[]> {
    return this.getAll<User[]>();
  }

  getUserByid(id): Observable<User> {
    return this.getById<User>(id);
  }
}
