import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-genre-dialog',
  template: `
    <mat-card>
      <mat-card-title>Genre: {{ data.Name }}</mat-card-title>
      <mat-card-content>
        <p>{{ data.Description }}</p>
      </mat-card-content>
    </mat-card>
  `,
  imports: [CommonModule, MatDialogModule, MatCardModule]
})
export class GenreDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Name: string; Description: string }) {}
}