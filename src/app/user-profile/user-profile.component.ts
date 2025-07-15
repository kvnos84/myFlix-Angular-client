import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FetchApiDataService } from '../fetch-api-data.service';

@Component({
  standalone: true,
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ]
})
export class UserProfileComponent implements OnInit {
  userData: any = {
    Username: '',
    Email: '',
    Birthday: '',
    Password: ''
  };

  constructor(
    private fetchApiData: FetchApiDataService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getUserData();
  }

  getUserData(): void {
    const username = localStorage.getItem('user');
    if (!username) return;

    this.fetchApiData.getUserProfile().subscribe({
      next: (data) => {
        this.userData = data;
        this.userData.Password = ''; // Don't prefill password
      },
      error: (err) => {
        console.error('Could not fetch user data:', err);
      }
    });
  }

  updateUser(): void {
    this.fetchApiData.updateUserProfile(this.userData).subscribe({
      next: () => {
        localStorage.setItem('user', this.userData.Username);
        this.snackBar.open('Profile updated successfully!', 'OK', { duration: 3000 });
      },
      error: (err) => {
        this.snackBar.open('Update failed.', 'OK', { duration: 3000 });
        console.error(err);
      }
    });
  }

  deleteUser(): void {
    if (!confirm('Are you sure you want to delete your account?')) return;

    this.fetchApiData.deleteUserProfile().subscribe({
      next: () => {
        localStorage.clear();
        this.snackBar.open('Account deleted.', 'OK', { duration: 3000 });
        this.router.navigate(['welcome']);
      },
      error: (err) => {
        this.snackBar.open('Could not delete account.', 'OK', { duration: 3000 });
        console.error(err);
      }
    });
  }
}