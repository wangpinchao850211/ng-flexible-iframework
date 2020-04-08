import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CacheService } from '../services/cache.service';
import { environment } from '../../../environments/environment';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cacheService: CacheService) { }

  private serverUrl = environment.serverUrl;

  private cacheUrlList: Array<string> = [""];
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRequestCachable(req)) {
      return next.handle(req);
    }

    // const cachedResponse = this.cacheService.get(req);
    // if (cachedResponse !== null) {
    //   return of(cachedResponse);
    // }

    // return next.handle(req).pipe(
    //   tap(event => {
    //     if (event instanceof HttpResponse) {
    //       this.cacheService.put(req, event);
    //     }
    //   })
    // );
  }

  private isRequestCachable(req: HttpRequest<any>) {
    this.cacheUrlList.forEach((val, idx, array) => {
      if (req.url.indexOf(val) > -1) {
        return true;
      }
    });
    return false;
  }
}