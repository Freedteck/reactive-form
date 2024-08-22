import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private http: HttpClient) {}

  private url: string = 'https://restcountries.com/v3.1/all';

  fetchCountries(): Observable<any> {
    return this.http.get(this.url);
  }
}
