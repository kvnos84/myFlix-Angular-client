import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-synopsis-dialog',
  template: `
    <mat-card>
      <mat-card-title>Synopsis</mat-card-title>
      <mat-card-content>
        <p>{{ data.description }}</p>
      </mat-card-content>
    </mat-card>
  `,
  imports: [CommonModule, MatDialogModule, MatCardModule]
})
export class SynopsisDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { description: string }) {}
}