// src/app/fetch-api-data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  private apiUrl = ''; // replaces 👉 private apiUrl = 'https://movie-api-jyp7.onrender.com';

  constructor(private http: HttpClient) {}

  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + '/users', userDetails);
  }

  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(this.apiUrl + '/login', userDetails);
  }

  // ✅ Add this method to fetch all movies
  public getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }
}