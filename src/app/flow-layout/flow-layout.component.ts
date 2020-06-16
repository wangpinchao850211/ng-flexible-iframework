import { Component, OnInit, HostListener, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { from, Observable, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/common/services/layout.service';
import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { MenuTab } from 'src/app/common/domain/tab';
import { StoreState } from '../common/domain/store';
import { addTab, removeTab } from 'src/app/action/tab.action';
import { getUrlByName, getNameByUrl } from 'src/app/common/utils';
import { PlatformLocation } from '@angular/common';


@Component({
  selector: 'app-flow-layout',
  templateUrl: './flow-layout.component.html',
  styleUrls: ['./flow-layout.component.scss']
})
export class FlowLayoutComponent implements OnInit, OnDestroy {
  updateMenuTab$: Observable<MenuTab>;
  // 定制主题store Observable
  themeColor$: Subscription;
  themeStyle$: Subscription;
  themeWidth$: Subscription;
  navbarTheme$: Subscription;
  toolbarTheme$: Subscription;
  footerTheme$: Subscription;

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

  tabItems:Array<MenuTab> = [];
  fold: boolean = true;
  showHeader: boolean = true;
  showFooter: boolean = true;
  
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
      this.store.dispatch(addTab({url: currentUrl, name: urlName, isSelect: true}));
    }
    this.updateMenuTab$ = this.store.pipe(select('tab'));
    this.updateMenuTab$.subscribe((data) => {
      console.log(data);
      this.initTab(data);
    });

    // theme color
    this.updateColor(); 
    // theme style
    this.updateLayout();
    // layout width
    this.updateBoxWidth();
    // theme Navbar
    this.updateNavbar(); 
    // theme Toolbar
    this.updateToolbar();
    // layout Footer
    this.updateFooter();

  }

  updateColor() {
    this.themeColor$ = this.store.pipe(select('color')).subscribe((color) => {
      console.log(`更新主题颜色：${color['color']}`);
    });
  }

  updateLayout() {
    this.themeStyle$ = this.store.pipe(select('layout')).subscribe((layout) => {
      console.log(`变更布局：${layout['layout']}`);
    });
  }

  updateBoxWidth() {
    this.themeWidth$ = this.store.pipe(select('width')).subscribe((width) => {
      console.log(`变更外层宽度：${width['boxWidth']}`);
    });
  }
  updateNavbar() {
    this.navbarTheme$ = this.store.pipe(select('navbar')).subscribe((navbar) => {
      console.log(`变更navbar布局：`);
      console.log(navbar);
    });
  }
  updateToolbar() {
    this.toolbarTheme$ = this.store.pipe(select('toolbar')).subscribe((toolbar) => {
      console.log(`变更toolbar布局：`);
      console.log(toolbar);
    });
  }
  updateFooter() {
    this.footerTheme$ = this.store.pipe(select('footer')).subscribe((footer) => {
      console.log(`变更footer布局：`);
      console.log(footer);
    });
  }

  ngOnInit() {
    // 初始化布局页面
    this.initLayout();
    // this.setHtmlSize(); rem布局核心
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
  }
  unfolding(ev) {
    console.log(ev);
    this.getCommonStyle();
  }

  getMiniStyle() {
    this.fold = false;
    this.showHeader = false;
    this.showFooter = false;
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
    this.showHeader = true;
    this.showFooter = true;
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
