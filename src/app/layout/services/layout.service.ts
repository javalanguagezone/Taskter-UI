import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  private userMenuOpened$ = new BehaviorSubject<boolean>(false);
  private navigationMenuOpened$ = new BehaviorSubject<boolean>(true);

  constructor() { }

  onNavigationToggle(): Observable<boolean> {
    return this.navigationMenuOpened$.asObservable();
  }

  navigationToggle() {
    this.navigationMenuOpened$.next(!this.navigationMenuOpened$.value);
  }

  onUserProfileToggle(): Observable<boolean> {
    return this.userMenuOpened$.asObservable();
  }

  openUserProfile() {
    this.userMenuOpened$.next(true);
  }

  closeUserProfile() {
    this.userMenuOpened$.next(false);
  }
}
