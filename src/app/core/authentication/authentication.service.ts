import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { LocalAuthenticationContext } from './local-authentication.service';
import { environment } from 'src/environments/environment';

declare var AuthenticationContext: any;

@Injectable()
export class AuthenticationService {

  private context: any;
  private conf = {
    wpcTenant: environment.OAuth.wpcTenant,
    wpclientID: environment.OAuth.wpclientID,
    redirectUri: location.origin,
    postLogoutRedirectUri: location.origin,
    scope: environment.OAuth.SCOPE,
    responseType: environment.OAuth.response_type,
    cacheLocation: 'sessionStorage',
    expireOffsetSeconds: 600
  };
  constructor(private router: Router) {
    this.context = !environment.isLocal ? new AuthenticationContext(this.conf) : new LocalAuthenticationContext(router);
    (window as any).AuthenticationContext = AuthenticationContext;
  }
  checkAuthentication(activatedRoute: ActivatedRouteSnapshot) {
    if (!!window.location.hash) {
      if (window.location.hash.indexOf('#error') >= 0) {
        console.log('hash:', window.location.hash);
        this.logout();
        return false;
      }
      if (window.location.hash && this.isCallback(window.location.hash)) {
        this.handleCallback(undefined);
      }
    } else {
      if (activatedRoute.fragment && this.isCallback(activatedRoute.fragment)) {
        this.handleCallback(activatedRoute.fragment);
        this.router.navigate(['/']);
        return true;
      }
    }
    if ((!this.isAuthenticated || !this.getCachedUser) &&
      ((!window.location.hash || !this.isCallback(window.location.hash)) ||
        (!activatedRoute.fragment || this.isCallback(activatedRoute.fragment)))) {
      this.login();
      return false;
    }
    return true;
  }
  login() {
    this.context.login();
  }

  logout() {
    this.context.logOut();
  }

  isCallback(hash) {
    return this.context.isCallback(hash);
  }
  handleCallback(hash?: string) {
    this.context.handleWindowCallback(hash);
    window.location.hash = '';
  }

  RenewIdToken() {
    console.log('renew token...');
    this.context._renewIdToken(this.log);
  }

  public get getCachedUser() {
    return this.context.getCachedUser();
  }

  public get Token() {
    return this.context.getCachedToken(this.conf.wpclientID);
  }

  public get TokenExpiration() {
    const utcSeconds = sessionStorage.getItem('adal.expiration.key' + environment.OAuth.wpclientID);
    const d = new Date(0);
    d.setUTCSeconds(parseInt(utcSeconds));
    return d;
  }

  public IsTokenExpired(offsetminutes: number) {
    const MS_PER_MINUTE = 60000;
    const now = new Date(Date.now() + offsetminutes * MS_PER_MINUTE);
    const expiration = this.TokenExpiration;
    if (now > expiration) {
      return true;
    }
    return false;
  }

  public get isAuthenticated(): boolean {
    return !!this.Token && !!this.getCachedUser;
  }

  log(a, b, c) {
    console.log(a);
    console.log(b);
    console.log(c);
  }

}
