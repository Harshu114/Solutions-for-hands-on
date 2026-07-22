import { Injectable } from '@angular/core';
import {
  HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(`[ErrorHandlerInterceptor] ${req.method} ${req.url} failed:`, error);
        // Global error notification (requirement 819)
        alert(`Request failed: ${error.status} - ${error.message}`);
        return throwError(() => error);
      })
    );
  }
}