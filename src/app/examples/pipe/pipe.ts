import { Component, OnInit } from '@angular/core';
import { Product } from '../../../app/common/services/model/product.model';

@Component({
    selector: 'iframe-pipe',
    templateUrl: './pipe.html',
    styleUrls: ['./pipe.css'],
})

export class PipeComponent implements OnInit {
    public md = `
    Angular内置的pipe->直接使用，但是内置管道的module里一定要引BrowserModule，否则不好用。
    1.大写转换:uppercase 小写:lowcase
    \`\`\`html
    <p>{{ 'Angular' | uppercase }}</p>  //output:ANGULAR
    <p>{{ 'Angular' | lowcase }}</p>    //output:angular
    \`\`\`
    2. 截取小数点
    \`\`\`html
    <p>{{3.141590265 | number: ‘1-4-4’}}</p>    //output:3.1416
    \`\`\`
    {最少整数位数}.{最少小数位数}-{最多小数位数}
    3.Js对象序列化
    \`\`\`html
    <p>{{ { name: 'semlinker' } | json }}</p>   //output:{"name": "semlinker"}
    \`\`\`
    4.截取字符串
    \`\`\`html
    <p>{{ 'semlinker' | slice:0:5 | uppercase }}</p>  //output:semli
    \`\`\`
    5. 将数字格式化为货币值
    True表示显示为货币符号$,false表示显示为货币代码：USD
    \`\`\`html
    <p>{{ 131 | currency:"USD":true }}</p>   //output: $131
    \`\`\`
    6. 格式化百分比
    \`\`\`html
    <div>{{ 0.2 | percent }}</div>
    \`\`\`
    7. 日期
    \`\`\`html
    dateNumber: string = "2020-02-20T00:00:11.000Z";
    <div>{{ dateNumber | date }}</div>
    //output: Feb 20, 2020
    <div>a:{{ dateNumber | date:"shortDate" }}</div>
    //output: 2/20/20
    <div>b:{{ dateNumber | date:"mediumDate" }}</div>
    //output: Feb 20,2020
    <div>c:{{ dateNumber | date:"longDate" }}</div>
    //output: February 20,2020
    \`\`\`
    8. splice
    \`\`\`html
    <div>a:{{ "aaa" | slice:1 }}</div>
    output: aa
    \`\`\`
    

`
    public products: Product[];
    public CreateDttm: any = new Date();
    public categoryFilter: any;
    public taxRate = 0;
    constructor(
    ) { }
    ngOnInit() {
        this.products = [
            { id: 1, name: "dog", category: "pet" },
            { id: 2, name: "rabbit", category: "pet" },
            { id: 3, name: "sheep", category: "pet" },
            { id: 4, name: "keyboard", category: "tool" },
            { id: 5, name: "window", category: "tool" },
        ];
        //  this.CreateDttm = new Date();

        console.log("CreateDttm", this.CreateDttm);
    }
}