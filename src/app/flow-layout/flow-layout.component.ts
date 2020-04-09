import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ConstParams } from 'src/app/common/ConstParams';
import { from, Observable } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { LayoutService } from 'src/app/common/services/layout.service';
import * as _ from 'lodash';
import { Store, select } from '@ngrx/store';
import { MenuTab } from 'src/app/common/domain/tab';
import { addTab, removeTab } from 'src/app/action/tab.action';
import { getUrlByName, getNameByUrl } from 'src/app/common/utils';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'app-flow-layout',
  templateUrl: './flow-layout.component.html',
  styleUrls: ['./flow-layout.component.scss']
})
export class FlowLayoutComponent implements OnInit {
  updateMenuTab$: Observable<MenuTab>
  items: MenuItem[];
  itemsResouce: MenuItem[] = [
      {
          label: 'frameWorkBasic',
          icon: 'pi pi-pw pi-file',
          items: [
            {
                label: 'Markdown',
                icon: 'pi pi-pw pi-file',
                command: (event) => {
                    console.log(event);
                    this.store.dispatch(addTab({
                    url: getUrlByName('Markdown'),
                    name: 'Markdown',
                    isSelect: true
                    }));
                    this.router.navigate([getUrlByName('Markdown')]);
                }
            },
            {
                label: 'Rxjs',
                icon: 'pi pi-fw pi-ticket',
                command: (event) => {
                    this.store.dispatch(addTab({
                    url: getUrlByName('Rxjs'),
                    name: 'Rxjs',
                    isSelect: true
                    }));
                    this.router.navigate([getUrlByName('Rxjs')]);
                }
            },
            {
                label: 'LazyLoad',
                icon: 'pi pi-fw pi-ticket',
                command: (event) => {
                    this.store.dispatch(addTab({
                    url: getUrlByName('LazyLoad'),
                    name: 'LazyLoad',
                    isSelect: true
                    }));
                    this.router.navigate([getUrlByName('LazyLoad')]);
                }
            },
            {
                label: 'PrimeNG-UI',
                icon: 'pi pi-fw pi-tags',
                command: (event) => {
                    this.store.dispatch(addTab({
                    url: getUrlByName('PrimeNGUI'),
                    name: 'PrimeNGUI',
                    isSelect: true
                    }));
                    this.router.navigate([getUrlByName('PrimeNGUI')]);
                }
            },
            {
                label: 'Ajax',
                icon: 'pi pi-fw pi-ticket',
                command: (event) => {
                    this.store.dispatch(addTab({
                    url: getUrlByName('Ajax'),
                    name: 'Ajax',
                    isSelect: true
                    }));
                    this.router.navigate([getUrlByName('Ajax')]);
                }
            },
            {
                label: 'RouterNavigation',
                icon: 'pi pi-fw pi-ticket',
                command: (event) => {
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
                this.store.dispatch(addTab({
                    url: getUrlByName('pipe'),
                    name: 'pipe',
                    isSelect: true
                }));
                this.router.navigate([getUrlByName('pipe')]);
                }
            },
            {
                label:'injectablecomponent',
                icon: 'pi pi-fw pi-microsoft',
                command: (event) => {
                    this.store.dispatch(addTab({
                    url: getUrlByName('injectablecomponent'),
                    name: 'injectablecomponent',
                    isSelect: true
                    }));
                    this.router.navigate([getUrlByName('injectablecomponent')]);
                }
            }
          ]
      },
      {
          label: 'web中级汇总',
          icon: 'pi pi-pw pi-file',
          items: [
            {
                label: 'html',
                icon: 'pi pi-pw pi-file',
                command: (event) => {
                    console.log(event);
                    this.store.dispatch(addTab({
                    url: getUrlByName('html'),
                    name: 'html',
                    isSelect: true
                    }));
                    this.router.navigate([getUrlByName('html')]);
                }
            },
          ]
      }
  ];
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
    this.setHtmlSize();
    this.initLayout();
  }
  constructor(
    private auth: AuthService,
    private store: Store<{tab: MenuTab}>,
    private renderer: Renderer2,
    private el: ElementRef,
    private layoutService: LayoutService,
    private router: Router,
    private routeInfo: ActivatedRoute,
    private location: PlatformLocation
  ) {
    // 刷新页面保留current tab
    const currentUrl = this.routeInfo.snapshot['_routerState'].url;
    console.log(currentUrl);
    if (currentUrl !== '/flowlayout/markdown') {
      const urlName = getNameByUrl(currentUrl);
      this.store.dispatch(addTab({url: currentUrl, name: urlName, isSelect: true}));
    }
    this.updateMenuTab$ = this.store.pipe(select('tab'));
    this.updateMenuTab$.subscribe((data) => {
      console.log(data);
      this.initTab(data);
    });
  }

  ngOnInit() {
    // 初始化布局页面
    this.initLayout();
    this.setHtmlSize();
  }

  initTab(menutabList) {
    this.tabItems = [];
    this.tabItems = [...menutabList.tab];
    this.getActiveItem();
    const currentUrl = this.routeInfo.snapshot['_routerState'].url;
    // console.log(currentUrl);
    this.tabItems.some((i) => {
      if (i.isSelect && i.url !== '/flowlayout/markdown' && i.url !== currentUrl) {
        this.router.navigate([i.url]);
      }
      if (this.tabItems.length === 1 && i.url === '/flowlayout/markdown') {
        this.router.navigate([i.url]);
      }
    });
  }

  setHtmlSize() {
    const html = this.renderer.selectRootElement('html', true);
    const width = window.innerWidth;
    const fontSize = 100 / 1920 * width;
    // console.log(fontSize);
    this.renderer.setStyle(html, 'font-size', `${fontSize}px`);
    this.renderer.setStyle(html, 'height', '100%');
  }

  initLayout() {
    const bodyWidth = this.renderer.selectRootElement('body', true).offsetWidth;
    if (bodyWidth < 960) {
      this.items = _.cloneDeep(this.itemsResouce); // 初始化调取添加左侧菜单
      this.getMiniStyle();
    } else {
      this.getCommonStyle();
    }
  }

  folding() {
    this.getMiniStyle();
  }
  unfolding() {
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

  switchTab(ev: Event, menuTab: MenuTab) {
    const currentTab = {
      url: menuTab.url,
      name: menuTab.name,
      isSelect: true
    }
    this.store.dispatch(addTab(currentTab));
    this.router.navigate([menuTab.url]);
    ev.preventDefault();
  }
  closeTab(ev: Event, tab: MenuTab) {
    console.log(tab);
    if (this.tabItems.length === 1) {
      return;
    }
    // dispatch remove
    this.store.dispatch(removeTab(tab));
    ev.preventDefault();
  }

  layout() {
    this.auth.logout();
  }
}
