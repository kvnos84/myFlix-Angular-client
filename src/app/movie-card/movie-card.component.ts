import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

import { FetchApiDataService } from '../fetch-api-data.service';
import { GenreDialogComponent } from '../genre-dialog/genre-dialog.component';
import { DirectorDialogComponent } from '../director-dialog/director-dialog.component';
import { SynopsisDialogComponent } from '../synopsis-dialog/synopsis-dialog.component';

@Component({
  standalone: true,
  selector: 'app-movie-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  favoriteMovieIds: string[] = [];

  constructor(
    private fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchApiData.getAllMovies().subscribe({
      next: (response) => {
        this.movies = response;
      },
      error: (error) => {
        console.error('Error fetching movies:', error);
      }
    });

    this.getFavorites();
  }

  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe({
      next: (favorites) => {
        this.favoriteMovieIds = favorites;
      },
      error: () => {
        console.error('Could not fetch favorites');
      }
    });
  }

  isFavorite(movieId: string): boolean {
    return this.favoriteMovieIds.includes(movieId);
  }

  toggleFavorite(movie: any): void {
    if (this.isFavorite(movie._id)) {
      this.fetchApiData.removeFavoriteMovie(movie._id).subscribe({
        next: () => {
          this.favoriteMovieIds = this.favoriteMovieIds.filter(id => id !== movie._id);
          this.snackBar.open('Removed from favorites.', 'OK', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Failed to remove from favorites.', 'OK', { duration: 2000 });
        }
      });
    } else {
      this.fetchApiData.addMovieToFavorites(movie._id).subscribe({
        next: () => {
          this.favoriteMovieIds.push(movie._id);
          this.snackBar.open('Added to favorites!', 'OK', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Failed to add to favorites.', 'OK', { duration: 2000 });
        }
      });
    }
  }

  openGenreDialog(genre: { Name: string; Description: string }): void {
    this.dialog.open(GenreDialogComponent, {
      data: genre,
      width: '400px'
    });
  }

  openDirectorDialog(director: { Name: string; Bio: string; Birth: string; Death?: string }): void {
    this.dialog.open(DirectorDialogComponent, {
      data: director,
      width: '400px'
    });
  }

  openSynopsisDialog(description: string): void {
    this.dialog.open(SynopsisDialogComponent, {
      data: { description },
      width: '400px'
    });
  }
}