// src/app/fetch-api-data.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  private apiUrl = 'https://movie-api-jyp7.onrender.com';

  constructor(private http: HttpClient) {}

  // 🔐 Helper method to get authorization headers
  private getAuthHeaders(): any {
    const token = localStorage.getItem('token');
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  }

  /** 1. User registration */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, userDetails);
  }

  /** 2. User login */
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, userDetails);
  }

  /** 3. Get all movies */
  public getAllMovies(): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies`, this.getAuthHeaders());
  }

  /** 4. Get one movie by title */
  public getMovie(title: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/movies/${title}`, this.getAuthHeaders());
  }

  /** 5. Get director details */
  public getDirector(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/directors/${name}`, this.getAuthHeaders());
  }

  /** 6. Get genre details */
  public getGenre(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/genres/${name}`, this.getAuthHeaders());
  }

  /** 7. Get user profile */
  public getUser(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}`, this.getAuthHeaders());
  }

  /** 8. Get favorite movies */
  public getFavoriteMovies(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${username}/movies`, this.getAuthHeaders());
  }

  /** 9. Add a movie to favorites */
  public addFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/users/${username}/movies/${movieId}`, {}, this.getAuthHeaders());
  }

  /** 10. Remove a movie from favorites */
  public removeFavoriteMovie(username: string, movieId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}/movies/${movieId}`, this.getAuthHeaders());
  }

  /** 11. Edit user details */
  public editUser(username: string, updatedData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${username}`, updatedData, this.getAuthHeaders());
  }

  /** 12. Delete user */
  public deleteUser(username: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/${username}`, this.getAuthHeaders());
  }
}