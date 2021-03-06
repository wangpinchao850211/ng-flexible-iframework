import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { HttpErrorHandler, HandleError } from '../services/http-error-handler.service'
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable()
export class AjaxService {

    public handleError: HandleError;

    private baseUrl = environment.apiUrl;
    // private baseUrl = 'assets/json/Employee.json';

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler) {
        this.handleError = httpErrorHandler.createHandleError('AjaxService');

        // Content-Type 种类
        /**
         * 1、application/json
         * 2、application/x-www-form-urlencoded
         * 3、multipart/form-data
         *  */ 
    }

    doGet(uri: string, params: any): Observable<any> {
        console.log(params);
        return this.http.get(this.baseUrl+uri, { params: params }).pipe(
            catchError(this.handleError<any[]>('doGet', []))
        );
    }

    doPost(uri: string, params: any) {
        console.log(params);
        return this.http.post<any>(this.baseUrl + uri, params)
                // .pipe(map(q => JSON.parse(JSON.stringify(q))));
            .pipe(catchError(this.handleError('doPost', params)));
    }

    doPut(url: string, params: any): Observable<any> {
        console.log(params);
        return this.http.put<any>(`${this.baseUrl}/${url}`, { params: params })
            .pipe(catchError(this.handleError('doPut', params)));
    }

    doDelete(url: string, params: any): Observable<{}> {
        return this.http.delete(`${this.baseUrl}/${url}`, { params: params })
            .pipe(catchError(this.handleError('doDelete', params)));
    }

}
