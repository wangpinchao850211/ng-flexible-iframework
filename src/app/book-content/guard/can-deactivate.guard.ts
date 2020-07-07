/**
 * 在保存成功之前，你还可以继续推迟导航。如果你让用户立即移到下一个界面，而保存却失败了（可能因为数据不符合有效性规则），你就会丢失该错误的上下文环境。

  在等待服务器的答复时，你没法阻塞它 —— 这在浏览器中是不可能的。 你只能用异步的方式在等待服务器答复之前先停止导航。
*/
import { Injectable }    from '@angular/core';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot } from '@angular/router';
import { Observable }    from 'rxjs';

export interface CanComponentDeactivate {
 canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(
    component: CanComponentDeactivate,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
    console.log(component);
    console.log(route.paramMap.get('id'));
    console.log(state.url);
    // 它将检查这个（任意）组件中是否有 canDeactivate() 函数。它只需要检查该组件是否有一个 canDeactivate() 方法，并调用它。 这就让该守卫可以复用。
    return component.canDeactivate ? component.canDeactivate() : true;
  }
}
