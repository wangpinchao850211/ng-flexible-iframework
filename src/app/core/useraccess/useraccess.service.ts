import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication.service';
import { retry, timeout } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class UseraccessService {
  useraccess = {
    IsCR: false,
    IsDDT: false,
    IsGCA: true,
    IsGCQStakeholder: false,
    IsGCT: false,
    IsHPSStakeholder: false,
    IsMT: false,
    IsTGCStakeholder: false
  };
  private profile;
  constructor(private auth: AuthenticationService,
              private httpClient: HttpClient) { }

  get UserProfile() {
    if (this.auth.Token) {
      const base64Url = this.auth.Token.split('.')[1];
      const base64 = base64Url.replace('-', '+').replace('_', '/');
      return JSON.parse(window.atob(base64));
    }
    return null;
  }

  get eid() {
    return this.auth.getCachedUser.profile.upn.split('@')[0];
  }

  get email() {
    return this.auth.getCachedUser.profile.upn.split('@')[0] + '@accenture.com';
  }

  GetUserPermission() {
    return this.httpClient.post('/api/Access/getUserPermission', {}).pipe(
      timeout(5000),
      retry(3)
    );
  }
}
