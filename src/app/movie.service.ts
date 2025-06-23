import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // makes the service available app-wide
})
export class MovieService {
  private apiUrl = 'https://your-movie-api-url.com';  // replace with your API URL

  constructor(private http: HttpClient) {}

  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }
}
