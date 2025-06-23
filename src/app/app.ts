import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FetchApiDataService } from './fetch-api-data.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit {
  movies: any[] = [];
  protected title = 'myFlix-Angular-client';

  constructor(private fetchApiData: FetchApiDataService) {}

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
