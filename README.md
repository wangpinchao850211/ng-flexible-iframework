# Angular Common Framework
## Angular Version Info -  Angular7

## common folder
 ### directives folder
 this folder is used for saving customized directives

 ### pipes folder
 this folder is used for saving customized pipes

 ### ConstParams.ts file
 this file is used for saving const parameter in program by get accessor

 ### ajax.service.ts file
 this file is user for data communication between the page and the web server

 ### http-interceptors folder
 this folder is used for inspect and transform HTTP requests from your application to the server

## SASS
 ### Variables
 You can store the color values in variables and then use them in the design of the entire website, which  greatly ensures the usability and consistency of the entire design project.

 ### Nested Rules
 If you want to write a large list of styles that point to the same block in the page, CSS needs to write  the selector repeatedly, while sass only writes once, nested rule blocks make the style more readable.

 ### Extend
 Inherit the existing CSS selector and can override the existing style and add new style based on it.

 ### Import
 Allow it to import SCSS or Sass files, All SCSS or Sass files imported will be merged together into the  same CSS file, Any variable or mixin defined in the import file can be used in the main file.

 ### Mixin
 Mixing allows you to define styles that can be reused throughout the stylesheet, avoiding the use of silent  classes.

 ### Function
 SassScript defines useful functions that can be invoked as normal CSS function syntax.

### PrimeNG format theme
 if we use the PrimeMG, We can customize a new style theme to suit our project needs and you can also introduce existing theme style in the plug-in, It is a common style that covers the entire project, if you have a special style, you can change it separately in component to override the original theme style, Now we have create name as "newtheme.css" format theme, you just need to introduce it into the styles.scss to use it. 
 For example: @import "../node_modules/primeng/resources/themes/nova-light/newtheme.css";

## Project Technical point Introduce
interduce：包含三大模块：登录模块，basic框架常规使用模块，book模块
一、项目基本配置：
1、使用ngrx-store实现tab菜单管理，实现项目整体布局和主题的定制
2、封装ajax直接使用Observable形式进行http请求服务，引入了多种http-interceptors
3、service里：
    ①、nativeDomAnimation封装抽屉效果的动画-----------------------------------------------------------------------------封装动画
    ②、封装的auth.service 进行获取到的token的解析，存储
4、utils里多了深浅色的判断，还有一些常规数据处理函数 ---------------------------------------------------------------------深浅色判断
5、core除了引入通用模块，主要封装了一些权限判断的guard和service
    ①、AuthenticationGuard ( `basic框架常规使用模块和book模块的canActivate` )
    ②、CanDeactivateGuard (`basic框架常规使用模块和book模块的canDeactivate`)
    ③、LoginGuard对login的路由验权拦截 (`还是使用了auth.service`)
    ④、UseraccessService相对于role.service, 对角色的判断(可结合登录模块的第三项一起看)
    ⑤、AuthenticationService & LocalAuthenticationContext (对aad的深入理解和封装研究)
    ⑥、route.service要与router-navigation.routing组件使用结合一起看看原理(`待深入，挖掘更广的使用方式`)
6、pipe管道(
    `addTax:根据选的百分比不同，通过管道里的算法计算rate; filter:根据catogory去filter产品; utcDate; multiple; SafeHtmlPipe; filterBook`
    )
7、根组件：
    ①、appModule，appRouting，appComponent(`在浏览器中注册自定义元素wpc-dialog, 使用DialogService进行调用，最重点的封装※※※`) -------- 自定义dialog
    ②、flow-layout进行的主题订制(`最重点的组件`)
    ③、preload的使用结合glr(`待深入研究`)
8、questionnaire的简单使用两种方式实现

二、登录模块
1、主要使用响应式form表单，自定义校验器thirdpartvaild.service，验证码倒计时器 --------------------------------------------------------- 自定义校验器
2、插槽组件自定义vaildation的message提示信息通用组件 -------------------------------------------------------------------------------- message插槽组件
3、结合aad封装的auth.service 进行获取到的token的解析，存储，供各个组件使用；以及涉及白名单验权的逻辑(注意项目开发权限和路由的实现是个比较重点的地方，详见vue项目)
4、忘记密码组件同样使用了响应式表单开发，并尝试使用了异步验证器

三、basic框架常规使用模块
1、flow-layout组件(`※※※`)：深度使用了scss、flex
    1-1：布局(使用ngSwitch，使用layout.config.type决定布局)，
         menu(primeNG的menu动态操作方式)、
         主题(纯使用js操作dom样式实现，操作通过store触发dom操作的逻辑)，
         tab组件：store的应用，刷新页面initTab关键点
    1-2：主题订制组件: themes文件：
         ①、app-theme-solt插槽组件嵌套使用(`比较牛`) && 结合wpc-options组件深度使用form响应式表单和store的触发 -------------------------- theme 插槽组件的循环嵌套使用
         ②、鼠标触发滚动条动态显示隐藏，在wpc-options组件 ----------------------------------------------------------------------------- 鼠标动态显示scroll
2、newer-questionnaire：新版questionnaire比较好，整合了老版的方式，更疏通了实现方式(`需要细细看看，有好的东西需要借鉴，主要使用了viewContainerRef结合指令的形式实现，将数据和组件组装在一起后传给指令组件来渲染※※※`)
3、questionnaire：使用指令dynamicField，组件工厂resolveComponentFactory构造方式构造field
4、router-navigation
5、pipe组件介绍: 纯管道和非纯管道的区别在pipe组件有介绍
    ①、通过管道转换UTC时间：utcDate
    ②、根据选的百分比不同，通过管道里的算法计算rate：addTax
    ③、根据catogory去filter产品
    ④、number官方管道使用
    ⑤、multiple自定义数据操作管道
    ⑥、mark文档的介绍官方管道的基本使用方式(`uppercase,lowcase,number,json,slice,currency,percent,date:"shortDate""mediumDate""longDate"`)
6、rxjs介绍: markdown 插件语法的使用：这里有详细的使用基本概念，对面试有好处，以后写待code的例子文档可使用markdown文档！！！
7、markdown使用
8、ui框架使用：有个自适应的tooltip，css的深度应用，(`max-width和width的理解`) ------------------------------------------------------------- 自适应tooltip

四、book模块 --------------------------------------------------------------------------------------------------------------------------- 比较牛的模块，看看权限控制
1、book入口组件，list/card 切换组件
    ①、使用ngTemplateOutlet渲染card 和 list的组件切换 ----------------------------------------------------------------------------------- ngTemplateOutlet渲染使用
    ②、使用了filterBook管道进行filter数据
    ③、使用了ngDoCheck和KeyValueDiffers来监听radio的值变更来切换布局 --------------------------------------------------------------------- ngDoCheck和KeyValueDiffers应用
    ⑤、card组件的样式，控制不同的card header和小星星四舍五入取整
    ⑤、p-table的基础使用，主要有个滚动条对齐的问题(::after::before应用)
2、book模块路由`canLoad`用于异步路由组件：BookAuthGuard
3、BookContentModule，BookContentRoutingModule(`使用了canActivate(BookAuthGuard※※※)，canDeactivate，resolve`)
   的权限应用(`比较牛，深入研究下多应用！！！ 好好研究研究这个权限的控制※※※`)
   业务逻辑：使用了全局封装的dialog！
   `点击card或list，通过路由拦截，判断是否已登录此类书籍的权限，登录即跳入detail页， 未登录，显示具体权限级别，需要点击 read按钮 ，通过全局dialog输入用户名密码，改变bookStorage.service的存储数据，再重新跳入，执行验权守卫，跳入detail页`
4、book-auth组件：主要是使用自己封装的dialog，结合权限控制进行路由跳转的控制 ---------------------------------------------------------------- 自己封装dialog的实际应用
5、book-detail组件：(`获取resolver的数据; 使用了canDeactivate控制跳出`)