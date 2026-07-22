import 'zone.js';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <nav class="navbar">
      <div class="nav-brand">Student Course Portal</div>
      <ul class="nav-links">
        <li><a routerLink="/dashboard" routerLinkActive="active">Dashboard</a></li>
        <li><a routerLink="/courses" routerLinkActive="active">Courses</a></li>
        <li><a routerLink="/enroll" routerLinkActive="active">Enroll</a></li>
        <li><a routerLink="/enroll-reactive" routerLinkActive="active">Enroll Reactive</a></li>
        <li><a routerLink="/admin" routerLinkActive="active">Admin</a></li>
      </ul>
    </nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #2c3e50;
      padding: 1rem 2rem;
      color: white;
    }
    .nav-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .nav-links {
      display: flex;
      list-style: none;
      gap: 1rem;
      margin: 0;
      padding: 0;
    }
    .nav-links a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: background 0.3s;
    }
    .nav-links a:hover, .nav-links a.active {
      background: #34495e;
    }
    .main-content {
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class AppComponent {}