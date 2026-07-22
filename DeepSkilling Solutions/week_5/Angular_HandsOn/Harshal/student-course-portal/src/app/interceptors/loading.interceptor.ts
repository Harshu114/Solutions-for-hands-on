import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Show loading spinner before sending request
    this.loadingService.show();

    return next.handle(req).pipe(
      // Log response for debugging
      tap(event => {
        if (event instanceof HttpResponse) {
          console.log(`[LoadingInterceptor] Response: ${event.status}`);
        }
      }),
      // finalize runs on both success and error — always hide loader
      finalize(() => {
        this.loadingService.hide();
      })
    );
  }
}