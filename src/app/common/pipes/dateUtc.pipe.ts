import { Pipe,PipeTransform } from '@angular/core';
import * as Timezone from 'moment-timezone';

@Pipe({
    name: "utcDate"
})
export class UtcDatePipe {
    transform(value: any, type: any): any {
        value = value.getTime() + type*60*60*1000;
        value = new Date(value);
        return value;    
 }
    
}