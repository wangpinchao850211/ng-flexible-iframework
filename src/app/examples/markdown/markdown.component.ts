import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-markdown',
  templateUrl: './markdown.component.html',
  styleUrls: ['./markdown.component.scss', '../../themes/markdown.scss']
})
export class MarkdownComponent implements OnInit {

  md = 
`
# Ngx-Markdown

<br>

&#x2003;提供了markdown相关的例子，便于以文档形式demo

<br>

&#x2003;ngx-markdown is an Angular library that uses marked to parse markdown to html combined with Prism.js for syntax highlight.

<br>

&#x2003;[https://github.com/jfcere/ngx-markdown](https://github.com/jfcere/ngx-markdown)

<br>

\`\`\` typescript
var observable = Rx.Observable.create(function (observer) {
observer.next(1);
observer.next(2);
observer.next(3);
    setTimeout(() => {
        observer.next(4);
        observer.complete();
    }, 1000);
});

console.log('just before subscribe');
observable.subscribe({
    next: x => console.log('got value ' + x),
    error: err => console.error('something wrong occurred: ' + err),
    complete: () => console.log('done'),
});
console.log('just after subscribe');
\`\`\`

<br>

\`\`\`html
    <p>This is a paragraph</p>
    <p>This is another paragraph</p>
    <p>This is a paragraph</p>
    <p>This is another paragraph</p>
    <p>This is a paragraph</p>
    <p>This is another paragraph</p>
    <p>This is a paragraph</p>
    <p>This is another paragraph</p>
\`\`\`

<br>

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone. Oh, you can *put* **Markdown** into a blockquote.

<br>

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

<br>

1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第一个元素

<br>

* Unordered list can use asterisks
- Or minuses
+ Or pluses

Colons can be used to align columns.

<br>

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

<br>

There must be at least 3 dashes separating each header cell.
The outer pipes (|) are optional, and you don't need to make the
raw Markdown line up prettily. You can also use inline Markdown.

<br>

Markdown | Less | Pretty
--- | --- | ---
*Still* | \`renders\` | **nicely**
1 | 2 | 3

`;

  constructor() { }

  ngOnInit() {
  }

}
