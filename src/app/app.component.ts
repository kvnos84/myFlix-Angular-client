import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private router: Router) {}

// ✅ Show navbar only when logged in and not on welcome page
  get showNavbar(): boolean {
    const token = localStorage.getItem('token');
    return !!token && !this.router.url.includes('welcome');
  }

logout(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
