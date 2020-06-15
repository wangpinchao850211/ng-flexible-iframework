import { Injectable, Inject, Type, Renderer2, RendererFactory2 } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { share, delay } from 'rxjs/operators';
/**
 * el: dom操作元素
 * speed: 元素整体宽度必须是传入速度的整数倍
 * falg: 判断推动的方向
 * */ 

 @Injectable()
 export class domAnimation {
    private render: Renderer2;
    public clearInterval$ = new BehaviorSubject(false);

    constructor(
        private rendererFactory: RendererFactory2
    ) {
        // 再service里 render工厂方法
        this.render = rendererFactory.createRenderer(null, null);
    }

    slideLeftRight(el, speed, falg) {
        let distance = speed;
        console.log(falg);

        let timer;
        if (falg === 'to Left') {
          timer = setInterval(() => {
            // el.style.right = -el.clientWidth + distance + 'px';
            this.render.setStyle(el, 'right', `${-el.clientWidth + distance}px`);
            distance += speed;
            if (distance > el.clientWidth) {
              clearInterval(timer);
              this.clearInterval$.next(false); // 这个不需要显示
            }
          }, 20);
        } else if (falg === 'to Right') {
          timer = setInterval(() => {
            // el.style.right = -distance + 'px';
            this.render.setStyle(el, 'right', `${-distance}px`);
            if (distance >= el.clientWidth) {
              clearInterval(timer);
              this.clearInterval$.next(true);// 实现动画结束通知外部调用处
            } else {
              distance += speed;
            }
          }, 20);
        }
     }

     onChangeClearInterval(): Observable<any> {
      return this.clearInterval$.pipe(
        delay(100),
        share()
      );
    }

 }
