import { Injectable } from '@angular/core';
import { Router, Route, CanActivate,CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { AuthService } from '../../common/services/auth.service';
import { UseraccessService } from '../useraccess/useraccess.service';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router,
              private auth: AuthService,
              private useraccessService: UseraccessService
              ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const value: boolean = this.auth.checkAuthenicated(route, state);
    console.log(value);
    if (!value) {
        this.auth.startURL = state.url;
        return false;
    } else {
        return true;
    }
  }
}
