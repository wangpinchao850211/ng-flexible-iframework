import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
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

  // change nav color icon
  @ViewChild('navbarPaletteColor') navColorIcon: ElementRef;
  @ViewChild('toolbarPaletteColor') toolColorIcon: ElementRef;
  @ViewChild('footerPaletteColor') footerColorIcon: ElementRef;
  

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
        colorTheme      : new FormControl(),
        layout          : this._formBuilder.group({
          style    : new FormControl(),
          width    : new FormControl(),
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
              footerPosition             : new FormControl({value: '', disabled: true})
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
      if (changeKey === 'Nbackground') { // 更改icon颜色同 nav 背景色
        this.render.setStyle(this.navColorIcon.nativeElement, 'color', value.Nbackground);
      }
      this.store.dispatch(navbar({navbar: value, falg: 1, falgKey: changeKey}));
    });
  }
  resetNavBgColor() { // 重置颜色
    const setValue = Object.assign({}, this.form.get('layout.navbar').value, {Nbackground: "#030c2799"});
    this.render.setStyle(this.navColorIcon.nativeElement, 'color', "#8dcdff");
    this.store.dispatch(navbar({navbar: setValue, falg: 1, falgKey: "Nbackground"}));
  }
  toolbarChange() {
    let toolbarOldValue = toolbarEntity; // 先是默认值
    this.form.get('layout.toolbar').valueChanges.subscribe((value) => {
      const changeKey = this.giveChangeKey(toolbarOldValue, value);
      toolbarOldValue = { ...value };// 存储历史值
      // console.log(changeKey);
      const isCustom = this.form.get('layout.toolbar.TcustomBackgroundColor').value;
      if (changeKey === 'Tbackground') { // 当颜色有变更，就将use custom 去掉勾选
        this.render.setStyle(this.toolColorIcon.nativeElement, 'color', value.Tbackground); // 为icon 加色
        if (isCustom) {
          this.form.get('layout.toolbar.TcustomBackgroundColor').patchValue(false);
        }
      } else if (changeKey === 'TcustomBackgroundColor' && isCustom ) {// 重置icon
        this.render.setStyle(this.toolColorIcon.nativeElement, 'color', '#8dcdff');
      }
      this.store.dispatch(toolbar({toolbar: value, falg: 1, falgKey: changeKey}));
    });
  }
  giveChangeKey(old, newVal) { // 给出变更key值
    let Key = '';
    for (const key in newVal) {
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
      const changeKey = this.giveChangeKey(footerOldValue, value);
      // console.log(changeKey);
      const isCustom = this.form.get('layout.footer.FcustomBackgroundColor').value;
      if (changeKey === 'Fbackground') { // 当颜色有变更，就将use custom 去掉勾选
        this.render.setStyle(this.footerColorIcon.nativeElement, 'color', value.Fbackground); // 为icon 加色
        if (isCustom) {
          this.form.get('layout.footer.FcustomBackgroundColor').patchValue(false);
        }
      } else if (changeKey === 'FcustomBackgroundColor' && isCustom ) {// 重置icon
        this.render.setStyle(this.footerColorIcon.nativeElement, 'color', '#8dcdff');
      }
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
