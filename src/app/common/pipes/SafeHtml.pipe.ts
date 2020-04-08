import { Pipe , PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
/*
 * Usage:
 *   string | safeHtmlPipe
*/
@Pipe({name: 'SafeHtmlPipe'})
export class SafeHtmlPipe implements PipeTransform {
    constructor(private sanitized: DomSanitizer) { }
    transform(value: any) {
        return this.sanitized.bypassSecurityTrustHtml(value);
    }
}
