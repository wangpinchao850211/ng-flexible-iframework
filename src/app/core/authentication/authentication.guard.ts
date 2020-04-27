import { Injectable } from '@angular/core';
import { Router, Route, CanActivate,CanActivateChild, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { AuthService } from '../../common/services/auth.service';
import { UseraccessService } from '../useraccess/useraccess.service';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router,
              private auth: AuthService,
              private useraccessService: UseraccessService
              ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    environment.noaccess_groups.split(';').forEach((x) => {
      console.log('Profile: ', this.useraccessService.UserProfile);
      if (this.useraccessService.UserProfile
        && this.useraccessService.UserProfile.group
        && this.useraccessService.UserProfile.group.indexOf(x) >= 0) {
        this.router.navigateByUrl('/access-denied');
        return false;
      }
    });

    const value: boolean = this.auth.checkAuthenicated(route, state);
    console.log(value);
    if (!value) {
        this.auth.startURL = state.url; // 存储路由跳转的源路由路径
        return false;
    } else {
        return true;
    }
    // return this.useraccessService.GetUserPermission().pipe(
    //   map((body: any) => {
    //     console.log(body);
    //     if (!value) {
    //       this.auth.login();
    //       return false;
    //     }
    //     return true;
    //   }),
    //   catchError((err) => {
    //     if (this.auth.IsTokenExpired(10)) {
    //       this.auth.login();
    //     }
    //     if (err.status === 500) {
    //       return of(true);
    //     }
    //     return of(false);
    //   })
    // );
  }

//   canActivate(route: ActivatedRouteSnapshot) {
//     return true;
//   }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    return this.canActivate(route, state);
  }
  canLoad(route: Route): boolean {
    return true;
  }
}
