import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { LoggerService } from '../services/logger.service'
export type HandleError = <T> (operation?: string, result?: T) => (error: HttpErrorResponse) => Observable<T>;

@Injectable()
export class HttpErrorHandler {
  constructor(private loggerService: LoggerService) { }

  createHandleError = (serviceName = '') => <T>
    (operation = 'operation', result = {} as T) => this.handleError(serviceName, operation, result);

  handleError<T>(serviceName = '', operation = 'operation', result = {} as T) {
    return (error: HttpErrorResponse): Observable<T> => {
      switch (error.status) {
        case 401:
          console.log('401');
          break;
        case 403:
          console.log('403');
          break
        case 404:
          console.log('404');
          break;
        case 500:
          console.log('500');
          break;
      }
      const message = (error.error instanceof ErrorEvent) ?
        error.error.message : `server returned code ${error.status} with body "${error.error}"`;
      this.loggerService.error(`${serviceName}: ${operation} failed: ${message}`);
      return of(result);
    };
  }
}
