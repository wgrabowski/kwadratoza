import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { ApiData } from './model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private data = new BehaviorSubject<ApiData | null>(null);
  private apiKey: string | null;

  constructor(private httpClient: HttpClient) {
    this.apiKey = localStorage.getItem('sh_api_key');
  }

  hasApiToken() {
    return this.apiKey !== null;
  }
  getApiToken() {
    return this.apiKey;
  }
  setApiToken(key: string) {
    this.apiKey = key;
    localStorage.setItem('sh_api_key', key);
  }

  fetchData() {
    return this.httpClient
      .get(`https://www.statshunters.com/api/${this.apiKey}/tiles`)
      .pipe(
        tap((tiles: any) => {
          console.log(tiles);
          this.data.next(tiles);
        })
      );
  }
  getData() {
    return this.data
      .asObservable()
      .pipe(filter((value) => value !== null)) as Observable<ApiData>;
  }
}
