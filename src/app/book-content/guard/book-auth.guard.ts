import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { BookStorageService } from '../bookStorage.service';

@Injectable({
  providedIn: 'root'
})
export class BookAuthGuard implements CanActivate, CanActivateChild, CanLoad {
  get AuthA() {
		return this.localAuth.AuthA
  };
  get AuthB() {
		return this.localAuth.AuthB
  };
  get AuthC() {
		return this.localAuth.AuthC
  };
  get AuthD() {
		return this.localAuth.AuthD
  };
  get AuthE() {
		return this.localAuth.AuthE
	};
  constructor(
    private localAuth: BookStorageService,
    private router: Router,
    private routeInfo: ActivatedRoute
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // console.log(next);
      // console.log(next.params.id);
      let url: string = state.url;
      // console.log(url);
      
      if (this.checkCurrentBookAuth(next.params.id[0])) {
        return true;
      }

      const nextUrl = url.split(`/${next.params.id}`);
      this.router.navigate([nextUrl[0]], {queryParams: {id: next.params.id}, relativeTo: this.routeInfo}); // 跳回当前：/TeLayout/bookDetail
      return false;
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return this.canActivate(route, state);
      return true;
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
      // console.log(route);
      let url = `/${route.path}`;
      // url未请求时的url
      // console.log(url);
      // console.log(segments); // 路由参数
      if (!segments[1]) {// 没有segments，直接走detail页
        return true;
      }

      let Id = segments[1].path;
      if (this.checkCurrentBookAuth(Id[0])) {
        return true;
      }
      
      // 使用queryParams将未跳转得book id传入auth 操作组件
      this.router.navigate(['/TeLayout/bookDetail'], {queryParams: {id: Id}, relativeTo: this.routeInfo});

      return false;
  }

  checkCurrentBookAuth(key): boolean {
    // console.log(this.localAuth[`Auth${key}`]);
    console.log(this[`Auth${key}`]);
    return this[`Auth${key}`].isLogin;
  }
}
