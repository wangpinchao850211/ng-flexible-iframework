import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { finalize, tap } from 'rxjs/operators';
import { LoggerService } from '../services/logger.service';

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  constructor(private loggerService: LoggerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const startTime = Date.now();
    let status: string;

    return next.handle(req).pipe(
      tap(
        event => {
          status = '';
          if (event instanceof HttpResponse) {
            status = 'succeeded';
          }
        },
        error => status = 'failed'
      ),
      finalize(() => {
        const elapsedTime = Date.now() - startTime;

        const message = `Request url:${req.url};
                         method:${req.method};
                         params:${req.urlWithParams};
                         status;${status};
                         elapsedTime:${elapsedTime}ms`;

        this.loggerService.log(message);
      })
    );
  }
}
