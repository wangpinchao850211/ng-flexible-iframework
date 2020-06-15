import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { domAnimation } from 'src/app/common/services/nativeDomAnimation';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
    private domAnime: domAnimation
  ) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this._formBuilder.group({
        colorTheme      : new FormControl('Default Light'),
        layout          : this._formBuilder.group({
          style    : new FormControl('Vertical Layout #1'),
          width    : new FormControl('Fullwidth'),
          navbar   : this._formBuilder.group({
              background         : new FormControl(),
              folded             : new FormControl(),
              hidden             : new FormControl(),
              position           : new FormControl('Left')
          }),
          toolbar  : this._formBuilder.group({
              background           : new FormControl(),
              customBackgroundColor: new FormControl('Use custom background color'),
              hidden               : new FormControl(),
              position             : new FormControl('Below Static')
          }),
          footer   : this._formBuilder.group({
              background           : new FormControl(),
              customBackgroundColor: new FormControl('Use custom background color'),
              hidden               : new FormControl(),
              position             : new FormControl('Below Static')
          })
      })
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
