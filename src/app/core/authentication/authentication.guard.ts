import { Injectable } from '@angular/core';
import { Router, Route, CanActivate,CanActivateChild, CanLoad, ActivatedRouteSnapshot } from '@angular/router';
import { of, Observable, throwError } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { UseraccessService } from '../useraccess/useraccess.service';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable()
export class AuthenticationGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private router: Router,
            //   private auth: AuthenticationService,
            //   private useraccessService: UseraccessService
              ) { }

//   canActivate(route: ActivatedRouteSnapshot) {
//     environment.noaccess_groups.split(';').forEach((x) => {
//       console.log('Profile: ', this.useraccessService.UserProfile);
//       if (this.useraccessService.UserProfile
//         && this.useraccessService.UserProfile.group
//         && this.useraccessService.UserProfile.group.indexOf(x) >= 0) {
//         this.router.navigateByUrl('/access-denied');
//         return false;
//       }
//     });

//     const value: boolean = this.auth.checkAuthentication(route);
//     return this.useraccessService.GetUserPermission().pipe(
//       map((body: any) => {
//         if (body.IsAFS) {
//           this.router.navigateByUrl('/access-denied');
//           return false;
//         }
//         this.useraccessService.useraccess.IsGCA = body.IsGCA;
//         this.useraccessService.useraccess.IsGCT = body.IsGCT;
//         this.useraccessService.useraccess.IsDDT = body.IsDDT;
//         this.useraccessService.useraccess.IsMT = body.IsMT;
//         this.useraccessService.useraccess.IsGCQStakeholder = body.IsGCQStakeholder;
//         this.useraccessService.useraccess.IsHPSStakeholder = body.IsHPSStakeholder;
//         this.useraccessService.useraccess.IsTGCStakeholder = body.IsTGCStakeholder;
//         this.useraccessService.useraccess.IsCR = body.IsCR;
//         if (!value) {
//           this.auth.login();
//           return false;
//         }
//         return true;
//       }),
//       catchError((err) => {
//         if (this.auth.IsTokenExpired(10)) {
//           this.auth.login();
//         }
//         if (err.status === 500) {
//           return of(true);
//         }
//         return of(false);
//       })
//     );
//   }
  canActivate(route: ActivatedRouteSnapshot) {
    return true;
  }

  canActivateChild(route: ActivatedRouteSnapshot){
    return this.canActivate(route);
  }
  canLoad(route: Route): boolean {
    return true;
  }
}
