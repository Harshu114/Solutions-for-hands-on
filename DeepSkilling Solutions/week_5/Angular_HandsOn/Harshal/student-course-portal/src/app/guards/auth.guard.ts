import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

/**
 * Route guard that protects the admin route.
 * In a real app, this would check for an auth token or user role.
 * For this hands-on, we simulate with a hardcoded check.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  // Simulated admin check — in production, validate a real auth token
  private readonly ADMIN_TOKEN = 'admin-access-xyz';

  constructor(private router: Router) {}

  canActivate(): boolean | UrlTree {
    const token = localStorage.getItem('auth_token');
    if (token === this.ADMIN_TOKEN) {
      return true;
    }
    // Redirect to home if not authorized
    return this.router.createUrlTree(['/']);
  }
}