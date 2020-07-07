import { Injectable } from '@angular/core';

export interface Auth {
    name: string,
    password: string,
    isLogin: boolean
}

@Injectable({
    providedIn: 'root'
})
export class BookStorageService {
    public AuthA: Auth = {
        name: 'wangqixuan',
        password: 'wqx0211',
        isLogin: false
    }
    public AuthB: Auth = {
        name: 'wangqihuan',
        password: 'wqh0211',
        isLogin: false
    }
    public AuthC: Auth = {
        name: 'wangpinchao',
        password: 'wpc0211',
        isLogin: false
    }
    public AuthD: Auth = {
        name: 'wangpinchao',
        password: 'wpc1222',
        isLogin: false
    }
    public AuthE: Auth = {
        name: 'wangpinchao',
        password: 'wpc',
        isLogin: false
    }
    
    constructor() {}
}
