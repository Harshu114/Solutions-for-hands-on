import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  // BehaviorSubject holds the current loading state and emits to new subscribers
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  readonly isLoading$ = this._isLoading$.asObservable();

  show(): void {
    this._isLoading$.next(true);
  }

  hide(): void {
    this._isLoading$.next(false);
  }
}