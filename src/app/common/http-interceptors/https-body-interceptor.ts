import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { removeToEmpty } from '../utils';

@Injectable()
export class HttpsBodyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('ssssssssss--------------');
        const body = req.body;
        if (!body) {
            return next.handle(req);
        }

        const modifiedReq = req.clone({
            body: removeToEmpty(req.body)
        })
        console.log(modifiedReq);
        return next.handle(modifiedReq);
  }
}
