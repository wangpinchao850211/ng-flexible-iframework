import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { domAnimation } from 'src/app/common/services/nativeDomAnimation';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoreState } from 'src/app/common/domain/store';
import { themeColor, layoutStyle, layoutWidth, navbar, toolbar, footer } from 'src/app/action/theme.action';

@Component({
  selector: 'app-wpc-options',
  templateUrl: './wpc-options.component.html',
  styleUrls: ['./wpc-options.component.scss'],
  providers: [ domAnimation ]
})
export class WpcOptionsComponent implements OnInit {

  showSetting: boolean = false;
  form: FormGroup;
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
  ) { }

  ngOnInit() {
    this.initForm();
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
    this.form = this._formBuilder.group({
        colorTheme      : new FormControl('Default Light'),
        layout          : this._formBuilder.group({
          style    : new FormControl('Vertical Layout #1'),
          width    : new FormControl('Fullwidth'),
          navbar   : this._formBuilder.group({
              Nbackground         : new FormControl(),
              folded             : new FormControl(),
              Nhidden             : new FormControl(),
              navbarPosition           : new FormControl('Left')
          }),
          toolbar  : this._formBuilder.group({
              Tbackground           : new FormControl(),
              TcustomBackgroundColor: new FormControl('Use custom background color'),
              Thidden               : new FormControl(),
              toolbarPosition             : new FormControl('Below Static')
          }),
          footer   : this._formBuilder.group({
              Fbackground           : new FormControl(),
              FcustomBackgroundColor: new FormControl('Use custom background color'),
              Fhidden               : new FormControl(),
              footerPosition             : new FormControl('Below Static')
          })
      })
    });
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
      this.store.dispatch(layoutStyle({layout: value}));
    });
  }
  layoutWidthChange() {
    this.form.get('layout.width').valueChanges.subscribe((value) => {
      console.log(value);
      this.store.dispatch(layoutWidth({boxWidth: value}));
    });
  }
  navbarChange() {
    this.form.get('layout.navbar').valueChanges.subscribe((value) => {
      console.log(value);
      this.store.dispatch(navbar({navbar: value}));
    });
  }
  toolbarChange() {
    this.form.get('layout.toolbar').valueChanges.subscribe((value) => {
      console.log(value);
      this.store.dispatch(toolbar({toolbar: value}));
    });
  }
  footerChange() {
    this.form.get('layout.footer').valueChanges.subscribe((value) => {
      console.log(value);
      this.store.dispatch(footer({footer: value}));
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
