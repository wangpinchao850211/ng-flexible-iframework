import { Component, OnInit, HostListener, ElementRef, Renderer2, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { from, Observable, Subscription, config } from 'rxjs';
import { LayoutService } from 'src/app/common/services/layout.service';
import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { MenuTab } from 'src/app/common/domain/tab';
import { StoreState } from '../common/domain/store';
import { addTab, removeTab } from 'src/app/action/tab.action';
import { getUrlByName, getNameByUrl, getRgbNum, judgeDarkOrLight } from 'src/app/common/utils';
import { PlatformLocation } from '@angular/common';
import { ThemeBasicStore, navEntity, toolbarEntity, footerEntity } from '../common/domain/theme';
import { basicThemeStore, navbar, toolbar, footer } from '../action/theme.action';


@Component({
  selector: 'app-flow-layout',
  templateUrl: './flow-layout.component.html',
  styleUrls: ['./flow-layout.component.scss']
})
export class FlowLayoutComponent implements OnInit, AfterViewInit, OnDestroy {
  updateMenuTab$: Observable<MenuTab>;
  // 定制主题store Observable
  themeColor$: Subscription;
  themeStyle$: Subscription;
  themeWidth$: Subscription;
  navbarTheme$: Subscription;
  toolbarTheme$: Subscription;
  footerTheme$: Subscription;

  // theme form 初始化数据
  storeInitForm: ThemeBasicStore;
  // theme Color
  currentColor = '';
  @ViewChild('outletBg') outletBg: ElementRef;
  // theme layout
  layout = {
    config: {
      type: 'VL#1'
    }
  }
  // layout width
  @ViewChild('cotainer') cotainer: ElementRef;
  widthKey: string; // 存储width的值
  // navbarTheme
  showMenu: boolean = true;
  showTitle: boolean = true;
  @ViewChild('aside') aside: ElementRef;
  collapsedArrow: boolean = true;
  // toolbarTheme
  showHeader: boolean = true;
  @ViewChild('Vcotainer') Vcotainer: ElementRef;
  @ViewChild('Hcotainer') Hcotainer: ElementRef;
  @ViewChild('header') header: ElementRef;
  // footerTheme
  @ViewChild('footer') footer: ElementRef;
  showFooter: boolean = true;

  items: MenuItem[];
  itemsResouce: MenuItem[] = [
    {
      label: 'frameWorkBasic',
      icon: 'pi pi-pw pi-file',
      items: [
        {
          label: 'Rxjs',
          icon: 'pi pi-fw pi-ticket',
          command: (event) => {

            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);

            this.store.dispatch(addTab({
              url: getUrlByName('Rxjs'),
              name: 'Rxjs',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('Rxjs')]);
          }
        },
        {
          label: 'Markdown',
          icon: 'pi pi-pw pi-file',
          command: (event) => {
            console.log(event);

            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);

            this.store.dispatch(addTab({
              url: getUrlByName('Markdown'),
              name: 'Markdown',
              isSelect: true
            }));

            this.router.navigate([getUrlByName('Markdown')]);
          }
        },
        {
          label: 'PrimeNG-UI',
          icon: 'pi pi-fw pi-tags',
          command: (event) => {

            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);

            this.store.dispatch(addTab({
              url: getUrlByName('PrimeNGUI'),
              name: 'PrimeNGUI',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('PrimeNGUI')]);
          }
        },
        {
          label: 'RouterNavigation',
          icon: 'pi pi-fw pi-ticket',
          command: (event) => {

            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);

            this.store.dispatch(addTab({
              url: getUrlByName('RouterNavigation'),
              name: 'RouterNavigation',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('RouterNavigation')]);
          }
        },
        {
          label: 'Questionnaire',
          icon: 'pi pi-fw pi-ticket',
          command: (event) => {
            console.log(event);

            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);

            this.store.dispatch(addTab({
              url: getUrlByName('Questionnaire'),
              name: 'Questionnaire',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('Questionnaire')]);
          }
        },
        {
          label: 'NewQuestionnaire',
          icon: 'pi pi-fw pi-ticket',
          command: (event) => {
            console.log(event);

            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);

            this.store.dispatch(addTab({
              url: getUrlByName('NewQuestionnaire'),
              name: 'NewQuestionnaire',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('NewQuestionnaire')]);
          }
        },
        {
          label: 'pipe',
          icon: 'pi pi-fw pi-ticket',
          command: (event) => {
            console.log(event);

            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);

            this.store.dispatch(addTab({
              url: getUrlByName('pipe'),
              name: 'pipe',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('pipe')]);
          }
        }
      ]
    },
    {
      label: 'web中级汇总',
      icon: 'pi pi-pw pi-file',
      items: [
        {
          label: 'books',
          icon: 'pi pi-pw pi-file',
          command: (event) => {
            console.log(event);
            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);
            this.store.dispatch(addTab({
              url: getUrlByName('books'),
              name: 'books',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('books')]);
          }
        },
        {
          label: 'simpleQuestionnaire',
          icon: 'pi pi-pw pi-file',
          command: (event) => {
            console.log(event);
            const el = event.originalEvent.target;
            console.log(el);
            this.changeMenuActiveColor(el);
            this.store.dispatch(addTab({
              url: getUrlByName('simpleQuestionnaire'),
              name: 'simpleQuestionnaire',
              isSelect: true
            }));
            this.router.navigate([getUrlByName('simpleQuestionnaire')]);
          }
        }
      ]
    }
  ];

  changeMenuActiveColor(el) {
    const parent = this.render.parentNode(el);
    console.log(parent);
    const siblings = parent.parentNode.children;
    console.log(siblings);

    for (const iterator of siblings) {
      this.render.setStyle(iterator, 'backgroundColor', '#fff');
      this.render.setStyle(iterator, 'borderLeftWidth', '0px');
      this.render.setStyle(iterator, 'borderLeftStyle', 'solid');
      this.render.setStyle(iterator, 'borderLeftColor', '#fff');
    }

    this.render.setStyle(parent, 'backgroundColor', '#8dcdff');
    this.render.setStyle(parent, 'borderLeftWidth', '5px');
    this.render.setStyle(parent, 'borderLeftStyle', 'solid');
    this.render.setStyle(parent, 'borderLeftColor', '#005b9f');
  }

  getActiveItem() {
    return this.tabItems.filter(i => i.isSelect)[0];
  };

  tabItems: Array<MenuTab> = [];
  fold: boolean = true;

  @HostListener('window:resize')
  onWindowResize() {
    this.layoutService.changeLayoutSize(`${window.innerHeight}px`);
    // this.setHtmlSize(); rem布局核心
    this.initLayout();
  }
  constructor(
    private render: Renderer2,
    private store: Store<StoreState>, // 注意StoreState中必须填上新的store interface
    private el: ElementRef,
    private layoutService: LayoutService,
    private router: Router,
    private routeInfo: ActivatedRoute,
    private location: PlatformLocation
  ) {
    // 刷新页面保留current tab
    const currentUrl = this.routeInfo.snapshot['_routerState'].url;
    console.log(currentUrl);
    if (currentUrl !== '/flowlayout/rxjs') {
      const urlName = getNameByUrl(currentUrl);
      this.store.dispatch(addTab({ url: currentUrl, name: urlName, isSelect: true }));
    }
    this.updateMenuTab$ = this.store.pipe(select('tab'));
    this.updateMenuTab$.subscribe((data) => {
      console.log(data);
      this.initTab(data);
    });

    // 存储初始化theme form数据
    this.store.pipe(select('themeData')).subscribe((data) => {
      console.log(data);
      this.storeInitForm = _.cloneDeep(data['themeData']);
    });
  }

  /**
   * theme 定制业务指南，需要闲暇时先整理出来，
   * 然后有空根据业务在重新梳理逻辑，
   * 这样会清晰得处理dom操作，避免漏洞
   * */

  updateColor() {
    this.themeColor$ = this.store.pipe(select('color')).subscribe((color) => {
      console.log(`更新主题颜色：${color['color']}`);
      const key = color['color'];
      switch (key) {
        case 'Default Light':
          this.currentColor = '#039be5'; // #f5f5f5
          break;
        case 'Yellow Light':
          this.currentColor = '#fdd835'; // #f5f5f5
          break;
        case 'Blue-Gray Dark':
          this.currentColor = '#607d8b'; // #303030
          break;
        case 'Pink Dark':
          this.currentColor = '#e91e63'; // #303030
          break;
        default:
          break;
      }
      // 开始更新页面的主题颜色：考虑下执行方案
      this.setCurrentColor();
    });
  }

  setCurrentColor() {
    // console.log(this.currentColor);
    const currentRgb = getRgbNum(this.currentColor);
    // console.log(currentRgb);
    if (this.outletBg) {
      this.render.setStyle(this.outletBg.nativeElement, 'backgroundColor', this.currentColor);
      if (judgeDarkOrLight(currentRgb) === '浅色') {
        this.render.setStyle(this.outletBg.nativeElement, 'color', 'white');
      } else if (judgeDarkOrLight(currentRgb) === '深色') {
        this.render.setStyle(this.outletBg.nativeElement, 'color', 'black');
      }
    }
  }

  updateLayout() {
    this.themeStyle$ = this.store.pipe(select('layout')).subscribe((layout) => {
      if (this.layout.config.type === 'VL#1') { // 只有verl布局重置
        // 重置menu，footer
        this.resetMenu();
        this.resetHeader();
        this.resetFooter();
      }
      console.log(`变更布局：${layout['layout']}`);
      const key = layout['layout'];
      switch (key) {
        case 'Vertical Layout #1':
          this.layout.config.type = 'VL#1';
          this.showTitle = true;
          // 从新dispatch store初始化navba，toolbar，footer
          if (layout['falg'] > 0) {
            this.initNavToolFooter();
          }
          break;
        case 'Horizontal Layout #1':
          this.layout.config.type = 'HL#1';
          this.showTitle = false;
          // 从新dispatch store初始化navba人，toolbar，footer
          if (layout['falg'] > 0) {
            this.initNavToolFooter();
          }
          break;
        default:
          break;
      }
      setTimeout(() => {
        this.setCurrentColor();
      }, 0);
    });
  }

  initNavToolFooter() {
    const resetNav = navEntity;
    const resetFooter = footerEntity;
    const resetToolbar = toolbarEntity;
    this.store.dispatch(navbar({ navbar: resetNav, falg: 2, falgKey: '' }));
    this.store.dispatch(toolbar({ toolbar: resetToolbar, falg: 2, falgKey: '' }));
    this.store.dispatch(footer({ footer: resetFooter, falg: 2, falgKey: '' }));
  }

  updateBoxWidth() {
    this.themeWidth$ = this.store.pipe(select('width')).subscribe((width) => {
      if (this.layout.config.type === 'VL#1') { // 只有verl布局重置
        // 重置menu，footer
        this.resetMenu();
        this.resetHeader();
        this.resetFooter();
      }
      console.log(`变更外层宽度：${width['boxWidth']}`);
      this.widthKey = width['boxWidth'];
      this.setCurrentWidth(this.cotainer);
    });
  }

  setCurrentWidth(el: ElementRef) {
    if (this.widthKey === 'Fullwidth') {
      this.setFullWidth(el);
    } else if (this.widthKey === 'Boxed') {
      this.setBoxedWidth(el);
    }
  }

  setFullWidth(el: ElementRef) {
    this.render.setStyle(el.nativeElement, 'max-width', '100vw');
    this.render.setStyle(el.nativeElement, 'margin', '0');
    this.render.setStyle(el.nativeElement, 'box-shadow', 'none');
  }

  setBoxedWidth(el: ElementRef) {
    this.render.setStyle(el.nativeElement, 'max-width', '1200px');
    this.render.setStyle(el.nativeElement, 'margin', '0 auto');
    this.render.setStyle(el.nativeElement, 'box-shadow', '0 5px 5px -3px rgba(0,0,0,.2), 0 8px 10px 1px rgba(0,0,0,.14), 0 3px 14px 2px rgba(0,0,0,.12)');
  }

  updateNavbar() {
    this.navbarTheme$ = this.store.pipe(select('navbar')).subscribe((navbar) => {
      if (this.layout.config.type === 'VL#1') { // 只有verl布局重置
        // 重置menu，footer
        this.resetMenu();
        this.resetHeader();
        this.resetFooter();
      }

      console.log(`变更navbar布局：`);
      console.log(navbar);
      if (navbar['falg'] > 0) { // 初始化不变更
        switch (navbar['falgKey']) {
          case 'Nhidden':
            if (navbar['navbar'].Nhidden) {
              console.log(this.aside.nativeElement);
              this.render.addClass(this.aside.nativeElement, 'hidden-menu');
            } else {
              this.render.removeClass(this.aside.nativeElement, 'hidden-menu');
            }
            break;
          case 'folded':
            if (navbar['navbar'].folded) {
              this.getMiniStyle();
            } else {
              this.getCommonStyle();
            }
            break;
          case 'navbarPosition':
            this.updaeNavbarPosition(navbar);
            break;
          case 'Nbackground':
            if (navbar['navbar'].Nbackground) {
              // 设置颜色
              // console.log(navbar['navbar'].Nbackground);
              const navBgColor = navbar['navbar'].Nbackground;
              this.render.setStyle(this.aside.nativeElement, 'backgroundColor', navBgColor);
            }

            break;
          default:
            break;
        }
      }
    });
  }

  updaeNavbarPosition(navbar) {
    if (navbar['navbar'].navbarPosition === 'Right') {
      this.collapsedArrow = false;
      if (this.aside) {
        this.render.setStyle(this.aside.nativeElement, 'order', '2');
      }
    } else {
      this.collapsedArrow = true;
      if (this.aside) {
        this.render.setStyle(this.aside.nativeElement, 'order', '0');
      }
    }
  }

  updateToolbar() {
    this.toolbarTheme$ = this.store.pipe(select('toolbar')).subscribe((toolbar) => {
      // 重置menu，footer
      if (this.layout.config.type === 'VL#1') { // 只有verl布局重置
        this.resetMenu();
        this.resetHeader();
        this.resetFooter();
      }
      console.log(`变更toolbar布局：`);
      console.log(toolbar);
      if (toolbar['falg'] > 0) { // 初始化不变更
        switch (toolbar['falgKey']) {
          case 'Thidden':
            if (toolbar['toolbar'].Thidden) {
              this.showHeader = false;
            } else {
              this.showHeader = true;
            }
            this.showTitle = true;
            this.fixedMenu();
            // 显隐变更时 重置store Above值
            this.resetAbove(toolbar['toolbar']);
            this.resetHeader();
            break;
          case 'toolbarPosition':
            this.updateToolbarPosition(toolbar);
            break;
          case 'TcustomBackgroundColor':
            if (toolbar['toolbar'].TcustomBackgroundColor) {
              // 重置custom颜色
              this.render.setStyle(this.header.nativeElement, 'backgroundColor', '#030c2799');
            }
            break;
          case 'Tbackground':
            if (toolbar['toolbar'].Tbackground) {
              // 设置颜色
              const toolBgColor = toolbar['toolbar'].Tbackground;
              this.render.setStyle(this.header.nativeElement, 'backgroundColor', toolBgColor);
            }
            break;
          default:
            break;
        }
      }
    });
  }

  resetAbove(t) {
    this.store.dispatch(toolbar({
      toolbar: {
        Tbackground: t.Tbackground,
        TcustomBackgroundColor: t.TcustomBackgroundColor,
        Thidden: t.Thidden,
        toolbarPosition: 'Below Fixed'
      },
      falg: 3, // 特殊得3
      falgKey: 'toolbarPosition'
    }));
  }

  resetFooterAbove(f) {
    this.store.dispatch(footer({
      footer: {
        Fbackground: f.Fbackground,
        FcustomBackgroundColor: f.FcustomBackgroundColor,
        Fhidden: f.Fhidden,
        footerPosition: 'Below Fixed'
      },
      falg: 3, // 特殊得3
      falgKey: 'footerPosition'
    }));
  }

  updateToolbarPosition(toolbar) {
    if (toolbar['toolbar'].toolbarPosition === 'Below Static') {
      if (this.layout.config.type === 'VL#1') {
        const child = this.Vcotainer.nativeElement.children[1].children[1];
        console.log(child);
        this.render.setStyle(this.Vcotainer.nativeElement, 'overflow-y', 'auto');
        this.render.setStyle(child, 'overflow-y', 'visible');
        this.render.setStyle(child, 'padding-bottom', '60px');
        // 定位menu
        this.fixedMenu();
        // 定位footer
        this.fixedFooter();
        this.showTitle = true;
      } else if (this.layout.config.type === 'HL#1') {
        const child = this.Hcotainer.nativeElement.children[1]; // main节点
        this.render.setStyle(this.Hcotainer.nativeElement, 'overflow-y', 'auto');
        this.render.setStyle(child, 'overflow-y', 'visible');
        this.showTitle = false;
        this.fixedFooter();
      }
    } else if (toolbar['toolbar'].toolbarPosition === 'Below Fixed') {
      if (this.layout.config.type === 'VL#1') {
        const child = this.Vcotainer.nativeElement.children[1].children[1];
        this.render.setStyle(this.Vcotainer.nativeElement, 'overflow-y', 'hidden');
        this.render.setStyle(child, 'overflow-y', 'auto');
        this.showTitle = true;
        if (this.widthKey === 'Boxed') {
          // this.fixedFooter();
        }

      } else if (this.layout.config.type === 'HL#1') {
        const child = this.Hcotainer.nativeElement.children[1]; // main节点
        this.render.setStyle(this.Hcotainer.nativeElement, 'overflow-y', 'visible');
        this.render.setStyle(child, 'overflow-y', 'hidden');
        this.showTitle = false;
        this.fixedFooter();
      }
    } else if (toolbar['toolbar'].toolbarPosition === 'Above') {
      if (this.layout.config.type === 'VL#1') {
        this.fixedHeader();
        this.showTitle = false;
      } else if (this.layout.config.type === 'HL#1') {
        // 有待详细梳理下theme操作业务！！
      }
    }
  }

  fixedHeader() {
    if (this.header) {
      if (this.widthKey === 'Boxed') {
        this.render.setStyle(this.header.nativeElement, 'width', '100%');
      } else if (this.widthKey === 'Fullwidth') {
        this.render.setStyle(this.header.nativeElement, 'width', '100vw');
      }
      this.render.setStyle(this.header.nativeElement, 'position', 'absolute');
      this.render.setStyle(this.header.nativeElement, 'left', '0px');
      this.render.setStyle(this.header.nativeElement, 'top', '0px');
      this.render.setStyle(this.header.nativeElement, 'zIndex', '100');
      this.render.setStyle(this.Vcotainer.nativeElement, 'margin-top', '60px');
      this.render.setStyle(this.footer.nativeElement, 'margin-bottom', '60px');
      this.render.setStyle(this.aside.nativeElement, 'position', 'relative');
    }
  }
  resetHeader() {
    if (this.header) {
      this.render.setStyle(this.header.nativeElement, 'position', 'static');
      this.render.setStyle(this.header.nativeElement, 'width', '100%');
      this.render.setStyle(this.header.nativeElement, 'left', '0px');
      this.render.setStyle(this.header.nativeElement, 'top', '0px');
      this.render.setStyle(this.header.nativeElement, 'zIndex', 'auto'); // zIndex 默认值
      if (this.Vcotainer) {
        this.render.setStyle(this.Vcotainer.nativeElement, 'margin-top', '0px');
      }
      if (this.footer) {
        this.render.setStyle(this.footer.nativeElement, 'margin-bottom', '0px');
      }
    }
  }

  fixedMenu() {
    if (this.Vcotainer) {
      this.render.setStyle(this.aside.nativeElement, 'position', 'fixed');
      this.render.setStyle(this.aside.nativeElement, 'height', '100vh');
      if (this.widthKey === 'Boxed') {
        this.render.setStyle(this.Vcotainer.nativeElement.children[1], 'margin-left', '25.6%');
      } else if (this.widthKey === 'Fullwidth') {
        this.render.setStyle(this.Vcotainer.nativeElement.children[1], 'margin-left', '20%');
      }
    }
  }

  resetMenu() {
    if (this.Vcotainer) {
      this.render.setStyle(this.Vcotainer.nativeElement.children[1], 'margin-left', '0');
      this.render.setStyle(this.aside.nativeElement, 'position', 'relative');
      this.render.setStyle(this.aside.nativeElement, 'height', 'auto');
    }
  }

  fixedFooter() {
    if (this.footer) {
      this.render.setStyle(this.footer.nativeElement, 'position', 'absolute');
      this.render.setStyle(this.footer.nativeElement, 'bottom', '0px');
      this.render.setStyle(this.footer.nativeElement, 'right', '0px');
      this.render.setStyle(this.footer.nativeElement, 'width', '80%');
    }
    if (this.widthKey === 'Boxed') {
      // this.resetFooter();
      // this.render.setStyle(this.footer.nativeElement, 'width', '74.4%');
    }
  }
  resetFooter() {
    if (this.footer) {
      this.render.setStyle(this.footer.nativeElement, 'position', 'static');
      this.render.setStyle(this.footer.nativeElement, 'bottom', '0px');
      this.render.setStyle(this.footer.nativeElement, 'width', '100%');
      this.render.setStyle(this.footer.nativeElement, 'height', '60px');
    }
  }

  updateFooter() {
    this.footerTheme$ = this.store.pipe(select('footer')).subscribe((footer) => {
      // 重置menu，footer
      if (this.layout.config.type === 'VL#1') { // 只有verl布局重置
        this.resetMenu();
        this.resetHeader();
        this.resetFooter();
      }
      console.log(`变更footer布局：`);
      console.log(footer);
      if (footer['falg'] > 0) { // 初始化不变更
        switch (footer['falgKey']) {
          case 'Fhidden':
            if (footer['footer'].Fhidden) {
              this.showFooter = false;
            } else {
              this.showFooter = true;
            }
            // 显隐变更时 重置store Above值
            // this.resetFooterAbove(footer['footer']);
            break;
          case 'footerPosition':
            this.updateFooterPosition(footer);
            break;
          case 'FcustomBackgroundColor':
            if (footer['footer'].FcustomBackgroundColor) {// 重置custom颜色
              this.render.setStyle(this.footer.nativeElement, 'backgroundColor', '#030c2799');
            }
            break;
          case 'Fbackground':
            if (footer['footer'].Fbackground) {// 设置颜色
              const footerBgColor = footer['footer'].Fbackground;
              this.render.setStyle(this.footer.nativeElement, 'backgroundColor', footerBgColor);
            }
            break;
          default:
            break;
        }
      }
    });
  }
  updateFooterPosition(footer) {
    if (footer['footer'].footerPosition === 'Below Static') {
      if (this.layout.config.type === 'VL#1') {
        const child = this.Vcotainer.nativeElement.children[1].children[1];
      } else if (this.layout.config.type === 'HL#1') {
        const child = this.Hcotainer.nativeElement.children[1]; // main节点
      }
    } else if (footer['footer'].footerPosition === 'Below Fixed') {
      this.resetFooter();
    } else if (footer['footer'].footerPosition === 'Above') {
      if (this.layout.config.type === 'VL#1') {
        if (this.footer) {
          this.render.setStyle(this.footer.nativeElement, 'position', 'absolute');
          this.render.setStyle(this.footer.nativeElement, 'bottom', '0px');
          this.render.setStyle(this.footer.nativeElement, 'right', '0px');
          this.render.setStyle(this.footer.nativeElement, 'width', '100%');
        }
      } else if (this.layout.config.type === 'HL#1') {
        // 有待详细梳理下theme操作业务！！
        if (this.footer) {
          this.render.setStyle(this.footer.nativeElement, 'position', 'absolute');
          this.render.setStyle(this.footer.nativeElement, 'bottom', '0px');
          this.render.setStyle(this.footer.nativeElement, 'right', '0px');
          this.render.setStyle(this.footer.nativeElement, 'width', '100%');
        }
      }
    }
  }

  ngOnInit() {
    // 初始化布局页面
    this.initLayout();
    // this.setHtmlSize(); rem布局核心
  }

  ngAfterViewInit() { // 在AfterViewInit里方可获取到元素
    // theme color
    this.updateColor();
    // theme style
    this.updateLayout();
    // layout width, 
    this.updateBoxWidth();
    // theme Navbar
    this.updateNavbar();
    // theme Toolbar
    this.updateToolbar();
    // layout Footer
    this.updateFooter();

  }

  ngOnDestroy() {
    this.themeColor$.unsubscribe();
    this.themeStyle$.unsubscribe();
    this.themeWidth$.unsubscribe();
    this.navbarTheme$.unsubscribe();
    this.toolbarTheme$.unsubscribe();
    this.footerTheme$.unsubscribe();
  }

  initTab(menutabList) {
    this.tabItems = [];
    this.tabItems = [...menutabList.tab];
    this.getActiveItem();
    const currentUrl = this.routeInfo.snapshot['_routerState'].url;
    // console.log(currentUrl);
    this.tabItems.some((i) => {
      if (i.isSelect && i.url !== '/flowlayout/rxjs' && i.url !== currentUrl) {
        this.router.navigate([i.url]);
      }
      if (this.tabItems.length === 1 && i.url === '/flowlayout/rxjs') {
        this.router.navigate([i.url]);
      }
    });
  }

  setHtmlSize() {
    const html = this.render.selectRootElement('html', true);
    const width = window.innerWidth;
    const fontSize = 100 / 1920 * width;
    // console.log(fontSize);
    this.render.setStyle(html, 'font-size', `${fontSize}px`);
    this.render.setStyle(html, 'height', '100%');
  }

  initLayout() {
    const bodyWidth = this.render.selectRootElement('body', true).offsetWidth;
    if (bodyWidth < 960) {
      this.items = _.cloneDeep(this.itemsResouce); // 初始化调取添加左侧菜单
      this.getMiniStyle();
    } else {
      this.getCommonStyle();
    }
  }

  folding(ev) {
    console.log(ev);
    this.getMiniStyle();
    setTimeout(() => {// 保证footer适应
      this.resetHeader();
      this.resetMenu();
      this.resetFooter();
      if (this.Vcotainer) {
        if (this.widthKey === 'Fullwidth') {
          // this.render.setStyle(this.footer.nativeElement, 'width', '100%');
          // this.render.setStyle(this.Vcotainer.nativeElement.children[1], 'margin-left', '0px');
        } else if (this.widthKey === 'Boxed') {
          // this.render.setStyle(this.footer.nativeElement, 'width', '100%');
        }
      } else if (this.Hcotainer) {
        if (this.widthKey === 'Fullwidth') {
          console.log(this.footer.nativeElement);
          // this.render.setStyle(this.Hcotainer.nativeElement.children[1].children[1], 'margin-left', '0px');
          // this.render.setStyle(this.footer.nativeElement, 'width', '96.7%');
        } else if (this.widthKey === 'Boxed') {
          // this.render.setStyle(this.footer.nativeElement, 'width', '100%');
        }
      }
    }, 0);
  }

  unfolding(ev) {
    console.log(ev);
    this.getCommonStyle();
    setTimeout(() => {// 保证footer适应
      if (this.Vcotainer) {
        if (this.widthKey === 'Fullwidth') {
          // this.render.setStyle(this.footer.nativeElement, 'width', '100%');
          // this.render.setStyle(this.Vcotainer.nativeElement.children[1], 'margin-left', '0%');
        } else if (this.widthKey === 'Boxed') {
          // this.render.setStyle(this.footer.nativeElement, 'width', '100%');
          this.render.setStyle(this.Vcotainer.nativeElement.children[1], 'margin-left', '25.6%');
        }
      } else if (this.Hcotainer) {
        // this.render.setStyle(this.Hcotainer.nativeElement.children[1].children[1], 'margin-left', '50px');
        if (this.widthKey === 'Fullwidth') {
          // this.render.setStyle(this.footer.nativeElement, 'width', '80%');
        } else if (this.widthKey === 'Boxed') {
          // this.render.setStyle(this.footer.nativeElement, 'width', '100%');
        }
      }
    }, 0);
  }

  getMiniStyle() {
    this.fold = false;
    this.removeMenuContent(this.items);
  }
  removeMenuContent(Items) {
    for (const ite of Items) {
      ite.label = '';
      if (ite.hasOwnProperty('items')) {
        this.removeMenuContent(ite.items);
      }
    }
  }
  getCommonStyle() {
    this.fold = true;
    this.items = _.cloneDeep(this.itemsResouce);
  }

  switchTab(item) {
    const menuTab: MenuTab = item;
    const currentTab = {
      url: menuTab.url,
      name: menuTab.name,
      isSelect: true
    }
    this.store.dispatch(addTab(currentTab));
    this.router.navigate([menuTab.url]);
  }

  closeTab(item) {
    const tab: MenuTab = item;
    if (this.tabItems.length === 1) {
      return;
    }
    // dispatch remove
    this.store.dispatch(removeTab(tab));
  }

}
