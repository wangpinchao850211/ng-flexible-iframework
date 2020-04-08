import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { delay, share } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class LayoutService {

  public layoutSize$ = new Subject();
  constructor() { 
  }

  changeLayoutSize(val) {
    this.layoutSize$.next(val);
  }

  onChangeLayoutSize(): Observable<any> {
    return this.layoutSize$.pipe(
      share()
    );
  }
}
