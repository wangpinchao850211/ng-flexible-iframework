import { AjaxService } from '../ajax/ajax.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
    heros: Array<{ id:number; name: string }> = [
        { id: 11, name: 'Mr.Nice' },
        { id: 12, name: 'Narco' },
        { id: 13, name: 'Bombasto' }
    ];

    constructor(private http: AjaxService) {}

    getHeros(){
        return this.heros;
    }
}

// export interface ClassProvider{
//     provide: any;  //用来设置与依赖对象关联的token值：type或者injectiontoken
//     userClass: Type<any>;
//     //用来判断是不是多个provider：若是multiple类型，则返回与token管理的依赖
//     multi?:boolean;

// }
