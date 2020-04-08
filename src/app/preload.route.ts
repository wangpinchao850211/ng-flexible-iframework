import { Route, PreloadingStrategy } from '@angular/router';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concatMap';

export class CustomPreloadingStrategy implements PreloadingStrategy{
    preload(route: Route, fn: () => Observable<any>): Observable<any>{
        return Observable.of(true).delay(5000).mergeMap((_: boolean) => fn());
        // return route.data&&route.data.preload?fn():Observable.of(null);
    }
}