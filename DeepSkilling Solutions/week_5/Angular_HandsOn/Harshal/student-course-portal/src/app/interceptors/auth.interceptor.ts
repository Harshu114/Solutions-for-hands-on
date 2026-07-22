import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Mock auth token — in production this comes from a login response or storage
  private readonly MOCK_TOKEN = 'mocktoken-12345';

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Clone the request and add the Authorization header (requirement 814)
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.MOCK_TOKEN}`
      }
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Navigate to home on 401 (requirement 819)
          console.error('[AuthInterceptor] 401 Unauthorized — redirecting to home');
          this.router.navigate(['/']);
        }
        if (error.status === 500) {
          // Global error notification for 500 (requirement 819)
          console.error('[AuthInterceptor] 500 Server Error');
        }
        return throwError(() => error);
      })
    );
  }
}