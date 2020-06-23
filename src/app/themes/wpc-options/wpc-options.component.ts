import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { domAnimation } from 'src/app/common/services/nativeDomAnimation';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { StoreState } from 'src/app/common/domain/store';
import { ThemeBasicStore, ThemeToolbar, ThemeFooter, ThemeNavbar, navEntity, toolbarEntity, footerEntity } from 'src/app/common/domain/theme';
import { themeColor, layoutStyle, layoutWidth, navbar, toolbar, footer, basicThemeStore } from 'src/app/action/theme.action';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-wpc-options',
  templateUrl: './wpc-options.component.html',
  styleUrls: ['./wpc-options.component.scss'],
  providers: [ domAnimation ]
})
export class WpcOptionsComponent implements OnInit {

  navbarTheme$: Subscription;
  toolbarTheme$: Subscription;
  footerTheme$: Subscription;
  toolbarOldValue: ThemeToolbar;
  navbarOldValue: ThemeToolbar;
  footerOldValue: ThemeToolbar;

  showSetting: boolean = false;
  form: FormGroup;
  storeInitForm: ThemeBasicStore;
  list = [
    {
      name: 'Color themes',
    },
    {
      name: 'Layout Styles',
      children: [
        {
          name: 'Layout Width',
        },
        {
          name: 'Navbar',
        },
        {
          name: 'toolbar',
        },
        {
          name: 'footer',
        },
      ]
    }

  ];
  selectedValue: string = 'val1';

  constructor(
    private render: Renderer2,
    private el: ElementRef,
    private _formBuilder: FormBuilder,
    private domAnime: domAnimation,
    private store: Store<StoreState>,
  ) {

    this.store.pipe(select('themeData')).subscribe((data) => {
      this.storeInitForm = data['themeData'];
      console.log(this.storeInitForm);
      this.initForm();
    });

    this.store.pipe(select('navbar')).subscribe((navbar) => {
      console.log(navbar['falg']);
      if (navbar['falg'] === 2) {
        console.log(`重置navbar布局：`);
        this.form.get('layout.navbar').patchValue(navbar['navbar']);
      }
    });

    this.store.pipe(select('toolbar')).subscribe((toolbar) => {
      console.log(toolbar['falg']);
      if (toolbar['falg'] === 2) {
        console.log(`重置toolbar布局：`);
        this.form.get('layout.toolbar').patchValue(toolbar['toolbar']);
      }
      if (toolbar['falg'] === 3) {
        this.form.get('layout.toolbar').patchValue(toolbar['toolbar']);
      }
    });

    this.store.pipe(select('footer')).subscribe((footer) => {
      console.log(footer['falg']);
      if (footer['falg'] === 2) {
        console.log(`重置footer布局：`);
        this.form.get('layout.footer').patchValue(footer['footer']);
      }
    });

  }

  ngOnInit() {
    this.form.valueChanges.subscribe((values) => {
      console.log(values);
    });
    this.colorThemeChange();
    this.layoutStyleChange();
    this.layoutWidthChange();
    this.navbarChange();
    this.toolbarChange();
    this.footerChange();
  }

  initForm() {
    // console.log(this.storeInitForm);
    // this.form = this._formBuilder.group({
    //     colorTheme      : new FormControl(this.storeInitForm.colorTheme),
    //     layout          : this._formBuilder.group({
    //       style    : new FormControl(this.storeInitForm.layout.style),
    //       width    : new FormControl(this.storeInitForm.layout.width),
    //       navbar   : this._formBuilder.group({
    //           Nbackground         : new FormControl(this.storeInitForm.layout.navbar.Nbackground),
    //           folded             : new FormControl(this.storeInitForm.layout.navbar.folded),
    //           Nhidden             : new FormControl(this.storeInitForm.layout.navbar.Nhidden),
    //           navbarPosition           : new FormControl(this.storeInitForm.layout.navbar.navbarPosition)
    //       }),
    //       toolbar  : this._formBuilder.group({
    //           Tbackground           : new FormControl(this.storeInitForm.layout.toolbar.Tbackground),
    //           TcustomBackgroundColor: new FormControl(this.storeInitForm.layout.toolbar.TcustomBackgroundColor),
    //           Thidden               : new FormControl(this.storeInitForm.layout.toolbar.Thidden),
    //           toolbarPosition             : new FormControl(this.storeInitForm.layout.toolbar.toolbarPosition)
    //       }),
    //       footer   : this._formBuilder.group({
    //           Fbackground           : new FormControl(this.storeInitForm.layout.footer.Fbackground),
    //           FcustomBackgroundColor: new FormControl(this.storeInitForm.layout.footer.FcustomBackgroundColor),
    //           Fhidden               : new FormControl(this.storeInitForm.layout.footer.Fhidden),
    //           footerPosition             : new FormControl(this.storeInitForm.layout.footer.footerPosition)
    //       })
    //   })
    // });
    this.form = this._formBuilder.group({
        colorTheme      : new FormControl('Default Light'),
        layout          : this._formBuilder.group({
          style    : new FormControl('Vertical Layout #1'),
          width    : new FormControl('Fullwidth'),
          navbar   : this._formBuilder.group({
              Nbackground         : new FormControl(),
              folded             : new FormControl(),
              Nhidden             : new FormControl(),
              navbarPosition           : new FormControl()
          }),
          toolbar  : this._formBuilder.group({
              Tbackground           : new FormControl(),
              TcustomBackgroundColor: new FormControl(),
              Thidden               : new FormControl(),
              toolbarPosition             : new FormControl()
          }),
          footer   : this._formBuilder.group({
              Fbackground           : new FormControl(),
              FcustomBackgroundColor: new FormControl(),
              Fhidden               : new FormControl(),
              footerPosition             : new FormControl()
          })
      })
    });
    this.form.patchValue(this.storeInitForm);
    console.log(this.form.value);
  }
  
  colorThemeChange() {
    this.form.get('colorTheme').valueChanges.subscribe((value) => {
      console.log(value);
      this.store.dispatch(themeColor({color: value}));
    });
  }

  layoutStyleChange() {
    this.form.get('layout.style').valueChanges.subscribe((value) => {
      console.log(value);
      this.store.dispatch(layoutStyle({layout: value, falg: 1}));
    });
  }
  layoutWidthChange() {
    this.form.get('layout.width').valueChanges.subscribe((value) => {
      console.log(value);
      this.store.dispatch(layoutWidth({boxWidth: value}));
    });
  }
  navbarChange() {
    let navbarOldValue = navEntity;
    this.form.get('layout.navbar').valueChanges.subscribe((value) => {
      const changeKey = this.giveChangeKey(navbarOldValue, value);
      navbarOldValue = { ...value };
      this.store.dispatch(navbar({navbar: value, falg: 1, falgKey: changeKey}));
    });
  }
  toolbarChange() {
    console.log(toolbarEntity);
    let toolbarOldValue = toolbarEntity; // 先是默认值
    console.log(toolbarOldValue);
    this.form.get('layout.toolbar').valueChanges.subscribe((value) => {
      console.log(toolbarOldValue);
      const changeKey = this.giveChangeKey(toolbarOldValue, value);
      toolbarOldValue = { ...value };// 存储历史值
      console.log(changeKey);
      this.store.dispatch(toolbar({toolbar: value, falg: 1, falgKey: changeKey}));
    });
  }
  giveChangeKey(old, newVal) { // 给出变更key值
    let Key = '';
    for (const key in newVal) {
      // debugger;
      const newValItem = newVal[key];
      if (newValItem !== old[key]) {
        Key = key;
        return Key;
      }
    }
  }
  footerChange() {
    let footerOldValue = footerEntity;
    this.form.get('layout.footer').valueChanges.subscribe((value) => {
      console.log(footerOldValue);
      const changeKey = this.giveChangeKey(footerOldValue, value);
      console.log(changeKey);
      footerOldValue = { ...value };
      this.store.dispatch(footer({footer: value, falg: 1, falgKey: changeKey}));
    });
  }

  showSettingDialog(ev: Event) {
    ev.stopPropagation();
    this.showSetting = true;
    const themeEl = this.el.nativeElement.children[0]; // 与document.getElementById('wpc-theme')相同
    this.domAnime.slideLeftRight(themeEl, 20, 'to Left');
  }

  closeSettingDialog(ev: Event) {
    ev.stopPropagation();
    const themeEl = this.el.nativeElement.children[0];
    this.domAnime.slideLeftRight(themeEl, 20, 'to Right');
    this.domAnime.onChangeClearInterval().subscribe((res) => { // 实现动画结束通知调用部位的功能
      if (res) this.showSetting = false; // 得到通知后再改
    });
  }

}
