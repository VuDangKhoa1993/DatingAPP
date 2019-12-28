import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private rootUrl = 'http://localhost:5000/api/';
  protected url = '';
  constructor(protected httpClient: HttpClient, urlLink: string) {
    this.url = this.rootUrl + urlLink;
  }

  getAll(): Observable<any> {
    return this.httpClient.get<any>(this.url);
  }

  getById(id): Observable<any> {
    return this.httpClient.get<any>(this.url + `/${id}`);
  }

  create(params): Observable<any> {
    return this.httpClient.post<any>(this.url, params);
  }

  update(params): Observable<any> {
    return this.httpClient.put<any>(this.url, params);
  }

  delete(id): Observable<any> {
    return this.httpClient.delete<any>(this.url + `/${id}`);
  }

}
