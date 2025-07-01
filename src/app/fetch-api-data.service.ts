/**
 * @file Service to handle HTTP requests to the myFlix API.
 * All methods return observables and require a valid JWT.
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const apiUrl = 'http://localhost:8080/';

/**
 * Service to communicate with the myFlix API backend.
 * Handles user registration, authentication, movie data, and user profiles.
 */
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param userDetails - Object containing user data (username, password, email, birthday)
   * @returns Observable with server response
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Logs in an existing user.
   * @param userCredentials - Object with Username and Password
   * @returns Observable with user data and JWT token
   */
  public userLogin(userCredentials: any): Observable<any> {
    return this.http.post(apiUrl + 'login', userCredentials).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Fetches all movies.
   * @returns Observable containing movie array
   */
  public getMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches a single movie by title.
   * @param title - The title of the movie
   * @returns Observable with movie details
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `movies/${title}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches director info by name.
   * @param name - Director's name
   * @returns Observable with director details
   */
  public getDirector(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `directors/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches genre info by name.
   * @param name - Genre name
   * @returns Observable with genre details
   */
  public getGenre(name: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `genres/${name}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches user profile data.
   * @param username - The username of the user
   * @returns Observable with user data
   */
  public getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Fetches user's favorite movies.
   * @param username - The username of the user
   * @returns Observable with favorite movie IDs
   */
  public getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + `users/${username}/favorites`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * Adds a movie to user's favorites.
   * @param username - The username of the user
   * @param movieId - ID of the movie to add
   * @returns Observable with updated user data
   */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + `users/${username}/favorites/${movieId}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Edits user profile.
   * @param username - The username of the user
   * @param updatedData - Object with updated user details
   * @returns Observable with updated user data
   */
  public editUser(username: string, updatedData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + `users/${username}`, updatedData, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Deletes a user.
   * @param username - The username of the user
   * @returns Observable with deletion confirmation
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Removes a movie from user's favorites.
   * @param username - The username of the user
   * @param movieId - ID of the movie to remove
   * @returns Observable with updated user data
   */
  public deleteFavoriteMovie(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + `users/${username}/favorites/${movieId}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Helper function to extract data from API response.
   * @param res - The response object
   * @returns Response body or empty object
   */
  private extractResponseData(res: any): any {
    return res || {};
  }

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response
   * @returns Observable that throws an error message
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('Client-side error:', error.error.message);
    } else {
      console.error(`Server returned code ${error.status}, body was: `, error.error);
    }
    return throwError('Something bad happened; please try again later.');
  }
}