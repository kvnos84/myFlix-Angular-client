import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  standalone: true,
  selector: 'app-user-registration-form',
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  registerUser(): void {
    console.log('Attempting to register:', this.userData);
    
    this.fetchApiData.userRegistration(this.userData).subscribe({
      next: () => {
        this.dialogRef.close();
        this.snackBar.open('Registration successful! You can now log in.', 'OK', {
          duration: 3000
        });
      },
      error: (error) => {
        console.error('Registration error:', error);

        const errorMessage =
          error?.error?.message ||
          (typeof error === 'string' ? error : JSON.stringify(error));

        this.snackBar.open(`Registration failed: ${errorMessage}`, 'OK', {
          duration: 4000
        });
      }
    });
  }
}