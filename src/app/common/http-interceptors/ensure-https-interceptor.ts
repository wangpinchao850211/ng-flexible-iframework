import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class EnsureHttpsIntercepto implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const recureReq = req.clone({
            url: req.url.replace('http://', 'https://')
        });
        return next.handle(recureReq);
    }
}

