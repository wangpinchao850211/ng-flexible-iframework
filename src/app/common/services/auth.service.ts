import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import storage from './storage';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    public TOKENKEY = environment.OAuth.storage.TOKEN_KEYS;
    public EXPIRATION_KEY = environment.OAuth.storage.EXPIRATION_KEY;
    public USERNAME = environment.OAuth.storage.USERNAME;
    public clientID = environment.OAuth.clientID;
    public TENANT = environment.OAuth.tenant;
    public localloginUrl = environment.OAuth.localLoginUrl;
    public expireOffset = environment.OAuth.expireOffsetSeconds;
    public responseType = environment.OAuth.response_type;

    public whiteUrList = ['/login', '/setPassword', '/activation', '/404'];
    public startURL = '/passport/login'; // 存储当前location
    public authData = {
        isAuthenticated: false, // 当前系统是否存在token
        userName: '' // 用户名(邮箱)
    };
    public token = null;
    public headertoken = '';

    public isLoginIn = false;
    public UserRole: any;
    public redirectUrl: any;
    constructor(
        private router: Router
    ) {
        // this.expiredTime = storage._getItem(this.EXPIRATION_KEY)?storage._getItem(this.EXPIRATION_KEY): null;
        // this.updateDataFromCache();
    }

    getToken(resource) {
        return storage._getItem(`${this.TOKENKEY}${resource}`);
    }
    get expiredTime() {
        return storage._getItem(`${this.EXPIRATION_KEY}${this.clientID}`);
    }
    getUserProfile() {
        return storage._getItem(this.USERNAME);
    }

    checkAuthenicated(activatedRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        console.log(activatedRoute);
        let url: string = state.url;
        console.log(url);
        if (url.includes('flowlayout') || url.includes('TeLayout') ) {
            console.log(this.authData.isAuthenticated)
            console.log(this.isLoginIn);
            return this.authData.isAuthenticated && this.isLoginIn
        } else {
            return true
        }
    }

    isloginUrl(uri) {
        if (this.whiteUrList.includes(uri)) {
            return false;
        } else {
            return true;
        }
    }
    logout() {
        storage._clear();
        this.sourceClear();
        console.log(this.startURL);
        this.router.navigate([this.startURL]);
    }
    sourceClear() {
        this.token = '';
        this.headertoken = '';
        this.authData = {
            isAuthenticated: false,
            userName: ''
        };
        this.isLoginIn = false;
    }
    getCacheToken(resource) {
        const token = this.getToken(resource);
        const expiredTime = this.expiredTime;

        if (!token && !expiredTime) {
            return null;
        }

        if (expiredTime && (expiredTime > this.getNow() + parseInt(`${this.expireOffset}`))) {
            this.token = token;
            return token;
        } else { // 存在过期token，清除
            storage._clear();
            return null;
        }
    }
    getCacheUser() {}

    // 获取浏览器传来的token
    getWindowCallback() {}
    getEid() {
        return storage._getItem('usernameEid')
    }
    getEmail() {
        return storage._getItem(this.USERNAME)
    }
    handleAuthentication(claims): void {
        // username: "qihuan.wang@126.com"
        // admin: true
        // iss: "wangpinchao"
        // exp: 1586401801897
        // iat: 1586402018456
        // Eid: "qihuan.wang"
        // 设置效期时间
        storage._setItem(`${this.EXPIRATION_KEY}${this.clientID}`, claims['exp']);
        // 设置eid
        storage._setItem('usernameEid', claims['Eid']);
        // 设置用户信息
        this.authData.userName = claims['username'];
        storage._setItem(this.USERNAME, claims['username']);
        storage._setItem('UserInfo', claims['iss']);
        // 设置请求头
        this.headertoken = this.token;
    }
    // 解析token
    resolveToken(token) { // 解析token, set token, expired, userInfo
        // 第一步，存储token
        this.token = this.token ? this.token : token;
        storage._setItem(`${this.TOKENKEY}${this.clientID}`, token);
        // 第二步，解析token
        let claims = JWT(token);
        console.log(claims);
        // exp 效期先在前端设置，当jwt通了挪到后台
        const starTime = Date.now();
        claims.exp = starTime + 60 * 600 * 1000;
        claims.iat = starTime;
        claims.Eid = claims.username.split('@')[0];
        console.log(claims);
        this.handleAuthentication(claims);
        this.updateDataFromCache(); // 初始化数据
    }
    getNow() {
        return Math.round(new Date().getTime());
    }

    initStorageSource() {
        // 第一步 将token解析存储到session
        // this.resolveToken(this.token);
        const interval = window.setInterval(() => {
            console.log(this.getNow());
            console.log(this.expiredTime);
            if (!this.expiredTime || this.expiredTime < (this.getNow() + parseInt('120'))) {
                // 跳转到login页, 清除session
                storage._clear();
                this.router.navigate(['/passport/login']);
                clearInterval(interval);
            }
        }, 5000);
    }
    updateDataFromCache() { // 闭环了！！！
        this.token = this.token ? this.token : this.getCacheToken(this.clientID);
        console.log(this.token);
        this.authData.isAuthenticated = this.token != null && this.token.length > 0;
        if (this.authData.isAuthenticated) {
          this.isLoginIn = true;
          storage._setItem('isLoginIn', this.isLoginIn);
          this.initStorageSource();
          // 初始化init数据接口，跳转到this.startURL
        } else { // 没有token，判断this.startURL是否属于白名单
          if (this.whiteUrList.includes(this.startURL)) {
            this.router.navigate([this.startURL]);
          } else { // 没有权限，并且不是白名单，登出 或者 renewToken
            this.logout()
          }
        }
    }
}
