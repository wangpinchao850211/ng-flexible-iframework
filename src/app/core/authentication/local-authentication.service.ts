import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, NavigationExtras } from '@angular/router';
import { environment } from './../../../environments/environment';
export class LocalAuthenticationContext {
    constructor(private router: Router) {

    }
    login() {
        this.router.navigate(['/login']);
    }

    logout() {
        sessionStorage.removeItem('11405.GovernmentComplianceHub.Web.adal.access.token.key');
        sessionStorage.removeItem('adal.expiration.key' + environment.OAuth.clientID);
        this.router.navigate(['/login']);
    }

    isCallback(hash: string) {
        if (hash && hash.indexOf('#id_token=') > -1) {
            return true;
        }
        return false;
    }

    handleWindowCallback(hash?: string) {
        const hashtoken = !!hash ? hash : window.location.hash;
        let key: string = hashtoken.replace('#id_token=', '');
        key = key.replace('#', '');
        const now = Math.round(new Date().getTime() / 1000.0);
        sessionStorage.setItem('11405.GovernmentComplianceHub.Web.adal.access.token.key', key);
        const jwt = this.parseJwt(key);
        sessionStorage.setItem('adal.expiration.key' + environment.OAuth.clientID, jwt.exp.toString());
    }

    getCachedUser() {
        if (!!sessionStorage.getItem('11405.GovernmentComplianceHub.Web.adal.access.token.key')) {
            const base64Url = sessionStorage.getItem('11405.GovernmentComplianceHub.Web.adal.access.token.key').split('.')[1];
            const base64 = base64Url.replace('-', '+').replace('_', '/');
            const prof = {
                profile: JSON.parse(window.atob(base64))
            };
            return prof;
        }
        return null;
    }
    getCachedToken(token: string) {
        return sessionStorage.getItem('11405.GovernmentComplianceHub.Web.adal.access.token.key');
    }

    acquireToken() {
        return null;
    }
    _renewIdToken() {
        this.login();
    }
    get userInfo() {
        const hold = sessionStorage.getItem('11405.GovernmentComplianceHub.Web.adal.access.token.key');
        return hold;
    }

    get isAuthenticated() {
        return !!this.userInfo;
    }
    get Token() {
        return 'local';
    }

    parseJwt(token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };
}
