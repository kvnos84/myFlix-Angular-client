import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';

@Component({
  standalone: true,
  selector: 'app-director-dialog',
  template: `
    <mat-card>
      <mat-card-title>Director: {{ data.Name }}</mat-card-title>
      <mat-card-content>
        <p><strong>Bio:</strong> {{ data.Bio }}</p>
        <p><strong>Born:</strong> {{ data.Birth }}</p>
        <p *ngIf="data.Death"><strong>Died:</strong> {{ data.Death }}</p>
      </mat-card-content>
    </mat-card>
  `,
  imports: [CommonModule, MatDialogModule, MatCardModule]
})
export class DirectorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { Name: string; Bio: string; Birth: string; Death?: string }) {}
}