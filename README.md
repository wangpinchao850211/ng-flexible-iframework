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
