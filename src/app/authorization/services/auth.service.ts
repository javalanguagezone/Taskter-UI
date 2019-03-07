import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { UrlSegment, Router } from '@angular/router';
import { BehaviorSubject, Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private manager = new UserManager(getClientSettings());
  private _user: User = null;
  private userProfile: Subject<any> = new Subject();

  private get user() { return this._user; }
  private set user(value: User) {
    this._user = value;
    this.userProfile.next(this._user && this._user.profile);
  }

  isAuthenticationComplete$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private router: Router) {
    this.manager.getUser().then(user => {
      this.user = user;
    });
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  getUserProfile(): Observable<any> {
    return this.userProfile.asObservable();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.isAuthenticationComplete$.next(true);
      this.user = user;
      const returnUrl: string = localStorage.getItem('taskter_return_url');
      localStorage.removeItem('taskter_return_url');
      this.router.navigateByUrl(returnUrl);
    });
  }

  startLogout(): Promise<void> {
    return this.manager.signoutRedirect();
  }
}

export function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:5000/',
    client_id: 'js',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type: 'id_token token',
    scope: 'role address picture openid profile api',
    filterProtocolClaims: true,
    loadUserInfo: true
  };
}
