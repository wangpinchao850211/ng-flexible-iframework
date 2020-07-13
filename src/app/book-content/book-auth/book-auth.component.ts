import { Component, OnInit, EventEmitter, ElementRef, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { BookStorageService } from '../bookStorage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogService, ButtonCommand } from 'src/app/common/dynamicSharingComponent/dialog.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-book-auth',
  templateUrl: './book-auth.component.html',
  styleUrls: ['./book-auth.component.scss'],
  providers: [ DialogService, MessageService ]
})
export class BookAuthComponent implements OnInit, AfterViewChecked {

  readBookId: string;
  readBooklevel: string;

  @ViewChild('viewSlot', {static: false}) viewSlot: ElementRef;
  loadDialogContent: boolean = false;
  username: string;
  password: string;

  constructor(
    private localAuth: BookStorageService,
    private router: Router,
    private routeInfo: ActivatedRoute,
    private dialogService: DialogService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.routeInfo.queryParams.subscribe((params: Params) => {
      // console.log(params);
      this.readBookId = params.id;
      this.readBooklevel = params.id[0];
    });
  }

  ngAfterViewChecked() {
    // console.log(this.viewSlot); 这里会返回调用检查，尽量不要在这里写逻辑，调用方法
  }

  saveLocalNavigate(data) {
    if (this.localAuth[`Auth${this.readBooklevel}`].name === data.name 
        && this.localAuth[`Auth${this.readBooklevel}`].password === data.password) {
       this.localAuth[`Auth${this.readBooklevel}`].isLogin = true;
       this.messageService.add({severity:'success', detail:'save success'});
       setTimeout(() => { // 模拟一下提示后再跳转
         this.router.navigate(['/TeLayout/bookDetail', this.readBookId]); 
       },1000);
    } else {
      this.messageService.add({severity:'error', summary: 'Error Message', detail:'用户名密码错误,请重新输入'});
    }
    this.loadDialogContent = false; // 关闭dialog，移除自定义solt
    this.username = ''; // 清除自定义solt数据
    this.password = ''; // 清除自定义solt数据
    this.dialogService.CloseDialog(); // 执行完毕数据操作，单纯关闭dialog
  }

  AssignPermissions() {
    // 传入自定义solt ref，使其加载到dom树中，在ngAfterViewChecked才可获取到元素节点
    this.loadDialogContent = true; // 另可以使用setTimeOut
    setTimeout(() => {
      if (this.viewSlot) {
        this.transmitSoltToDialog();
      }
    },0);
  }

  async transmitSoltToDialog() {
    const DialogSubmitted = new EventEmitter<any>(); // 注意这个东西用this没接上
    DialogSubmitted.subscribe((res) => { // submit使用第三种outputs进行提交数据
      // console.log(res);
      if (res) {
        if (!!this.username && !!this.password) {
          const data = {
            name: this.username,
            password: this.password
          }
          this.saveLocalNavigate(data);
        } else { // 调用message
          this.dialogService.CloseDialog();
          this.messageService.add({ severity:'warn', summary: 'Warn Message', detail:'请输入阅读密码'}); // 注意这里是异步组件，需要动态引入ToastModule和MessageService到当前组件
        }
      }
    });
    const result = await this.dialogService.OpenDialog({
      inputs: {
        wpc: 'wangpinchao',
        buttons: ['cancel', 'submit'],
        position: 'center', // content 定位位置 (top, right, bottom, left)
        solt: true // 是否有solt内容
      },
      outputs: { DialogSubmitted }, // 这种可以不使用Promise, dialogService只传input就行了
      contentSolt: {
        ref: this.viewSlot, // solt内容
      },
      overLayParent: 'main-content', // 定位父级
    });

    const ButtonCommandKey = ButtonCommand[result.falg];
    // console.log(ButtonCommandKey);
    switch (ButtonCommandKey) {
      case 'yes': 
        // 执行提交操作
        this.saveLocalNavigate(result.data);
        break;
      case 'no':
        this.dialogService.CloseDialog(); // 单纯关闭dialog
        break;
      case 'ok': 
        // 执行提交操作
        this.saveLocalNavigate(result.data);
        break;
      case 'cancel':
        this.dialogService.CloseDialog(); // 单纯关闭dialog
        break;
      case 'close': 
      this.dialogService.CloseDialog(); // 单纯关闭dialog
        break;
      case 'wait':
        break;
      case 'submit': 
        // 使用第三种outputs方式进行了提交
        break;
      default:
        break;
    }
  }

}
