import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders } from '@angular/common/http';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        // let getTokenKeys = sessionStorage.getItem('adal.token.keys');
        // if (getTokenKeys == null || getTokenKeys == undefined || getTokenKeys == "" || getTokenKeys.length < 37) {
        //     window.location.reload();
        // } else {
        //     let accessToken = 'Bearer ' + sessionStorage.getItem('adal.access.token.key' + getTokenKeys.substr(0, 36));
        //     const authReq = req.clone({ setHeaders: { Authorization: accessToken } });
        //     return next.handle(authReq);
        // }

        return next.handle(req);
    }
}
