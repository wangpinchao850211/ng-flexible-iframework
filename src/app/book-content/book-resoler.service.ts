import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
}                                 from '@angular/router';
import { Observable, of, EMPTY }  from 'rxjs';
import { mergeMap, take }         from 'rxjs/operators';
import { Book } from '../common/domain/books';
import { AjaxService } from '../common/ajax/ajax.service';

@Injectable({
  providedIn: 'root'
})
export class BookResolerService implements Resolve<Book> {

  constructor(
    private http: AjaxService,
    private router: Router
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> | Observable<never> {
    let id = route.paramMap.get('id');
    console.log(id);
    return this.http.doGet('/wpcTechSummary/detail'+id, null).pipe(
      take(1), // take 操作符传入一个参数 1，以确保返回的可观察对象中取到第一个值之后就会结束。
      mergeMap(book => {
        if (book) {
          return of(book);
        } else { // id not found
          this.router.navigate(['/TeLayout/books']);
          return EMPTY;
        }
      })
    );
  }
}
