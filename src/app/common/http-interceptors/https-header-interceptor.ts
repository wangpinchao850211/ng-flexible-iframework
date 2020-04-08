import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpsHeaderInterceptor implements HttpInterceptor {

    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.auth.getCacheToken(environment.OAuth.clientID);
        // console.log(authToken); 调用service里的方法就出错
        const authReq = req.clone({
            headers: req.headers.set('Content-Type', 'application/json')
                                .set('Authorization', 'authToken')
        })
        return next.handle(authReq);
    }
}
