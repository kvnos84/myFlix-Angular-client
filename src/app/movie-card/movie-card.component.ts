import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  standalone: true,
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    MatCardModule // ✅ Required for <mat-card> and related elements
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];

  constructor(private fetchApiData: FetchApiDataService) {}

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe({
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