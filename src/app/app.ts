/**
 * @file Root Angular component for the myFlix Angular client.
 * Initializes the app and loads movie data on startup.
 */

import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';

/**
 * Root component of the Angular application.
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  /**
   * Stores the list of movies fetched from the API.
   */
  movies: any[] = [];

  /**
   * Title of the application.
   */
  protected title = 'myFlix-Angular-client';

  /**
   * Injects the FetchApiDataService to interact with the backend API.
   * @param fetchApiData - Service to fetch movie data
   */
  constructor(private fetchApiData: FetchApiDataService) {}

  /**
   * Angular lifecycle method that runs when the component is initialized.
   * Fetches the list of movies from the API.
   */
  ngOnInit(): void {
    this.fetchApiData.getMovies().subscribe({
      next: (response) => {
        this.movies = response;
        console.log('Movies loaded:', this.movies);
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });
  }
}