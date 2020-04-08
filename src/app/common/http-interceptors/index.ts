import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { HttpsHeaderInterceptor } from './https-header-interceptor';
import { HttpsBodyInterceptor } from './https-body-interceptor';
import { AuthInterceptor } from './auth-interceptor';
import { LoggingInterceptor } from './logging-interceptor';
import { UploadInterceptor } from './upload-interceptor';
import { CachingInterceptor } from './caching-interceptor';

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpsHeaderInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpsBodyInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: UploadInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
  ];
