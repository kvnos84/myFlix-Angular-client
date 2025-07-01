/**
 * @file Service for fetching movie data from the myFlix API.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Service to interact with movie endpoints from the API.
 * This is a simplified version and assumes public access to movies.
 */
@Injectable({
  providedIn: 'root' // makes the service available app-wide
})
export class MovieService {
  /**
   * Base URL of the myFlix API.
   * Replace with your deployed backend URL.
   */
  private apiUrl = 'https://your-movie-api-url.com';

  constructor(private http: HttpClient) {}

  /**
   * Fetches all movies from the API.
   * @returns Observable containing an array of movies
   */
  getMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`);
  }
}