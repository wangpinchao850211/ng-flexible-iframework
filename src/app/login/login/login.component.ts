import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ThirdpartService } from '../thirdpart.service';
import { userNameVaild, passwordVaild, captchaVaild } from '../thirdpartvaild';
import { AuthService } from 'src/app/common/services/auth.service';
import { AjaxService } from '../../common/ajax/ajax.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private service: any;

  public loginForm: FormGroup;
  public captchaShow = false;
  public captchaContent: string = '获取验证码';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private setPs: ThirdpartService,
    private storage: AuthService,
    private http: AjaxService
  ) {
  }

  getControl(name) {
    return this.loginForm.controls[`${name}`];
  }

  ngOnInit() {
    this.formInit();
    this.loginForm.valueChanges.subscribe((value) => {
      console.log(value);
      console.log(this.loginForm.valid);
    });
  }

  formInit() {
    this.loginForm = this.fb.group({
      username: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(40)])),
      password: new FormControl('', Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(40)]))
    });
  }

  showCountDown() {
    let times = 60;
    this.captchaContent = `${times}s`;
    const timer = setInterval(() => {
      console.log(times);
      if (times > 0) {
        times--;
        this.captchaContent = `${times}s`;
      } else {
        this.captchaContent = '获取验证码';
        clearInterval(timer);
      }
    }, 1000);
  }

  getCaptcha() {
    console.log('获取验证码');
    // 进行获取验证码ajax请求
    // this.service.getCaptcha(this.loginForm.get('username')).then((res) => {
    //   console.log(res);
    // });
    setTimeout(() => {
      this.showCountDown();
    }, 1000);
  }

  setValidator(name, valid) {
    console.log(valid);
    console.log(name);
    if (valid) return;
    // this.loginForm.controls[`${name}`].setValidators([Validators.required, Validators.minLength(8), Validators.maxLength(40)]);
    // this.loginForm.controls[`${name}`].updateValueAndValidity();
    // const currentUserNameValid = this.loginForm.get(`${name}`).valid;
    // console.log(currentUserNameValid);
    console.log(this.loginForm.valid);
  }

  login(loginForm, ev: Event) {
    const {value, valid} = loginForm;
    console.log(value);
    console.log(valid);
    // 开始校验
    ev.preventDefault();
    if (!valid) {
      return;
    }
    // 自定义验证器也可以不在上面初始化时声明，可以在submit时动态设置使用,如下:
    this.loginForm.controls['username'].setValidators(userNameVaild);
    this.loginForm.controls['password'].setValidators(passwordVaild);
    let currentcaptchaValid;
    if (this.captchaShow) {
        this.loginForm.controls['captcha'].setValidators([Validators.required, captchaVaild]);
        this.loginForm.controls['captcha'].updateValueAndValidity({onlySelf: true, emitEvent: true});
        currentcaptchaValid = this.loginForm.get('captcha').valid;
    }

    this.loginForm.controls['username'].updateValueAndValidity({onlySelf: true, emitEvent: true});
    this.loginForm.controls['password'].updateValueAndValidity({onlySelf: true, emitEvent: true});

    const currentUserNameValid = this.loginForm.get('username').valid;
    const currentPassWordValid = this.loginForm.get('password').valid;

    console.log(currentUserNameValid);
    console.log(currentPassWordValid);
    console.log(currentcaptchaValid);
    let error: any = this.loginForm.get('username').errors
    console.log(JSON.stringify(error));
    if (currentUserNameValid && currentPassWordValid) {
      console.log('校验通过');
      console.log(this.loginForm.value);
      // 模拟进行ajax请求
      if (this.captchaShow && currentcaptchaValid) {

      } else if (this.captchaShow && !currentcaptchaValid) {
        return;
      }
      this.http.doPost('/user/login', this.loginForm.value).subscribe(res => {
        console.log(res);
        const {data, message, errno} = res;
        if ( errno === 0 ) {
            // 调用全局message。提示成功消息
            this.storage.resolveToken(data);
            this.router.navigate(['flowlayout/rxjs']);
        } else {
            // 调用全局message。提示错误消息
        }
      });

    }
  }

  goToSetPw(falg) {
    console.log(falg);
    this.setPs.changeSetPassword(falg);
    // this.router.navigate(['/setPassword'], {queryParams: {key: falg}});
    this.router.navigate(['/passport/setPassword']);
  }
  goToActivation() {
    this.router.navigate(['/activation'], {queryParams: {email: 'qihuan.wang@domain.com'}});
  }
}
