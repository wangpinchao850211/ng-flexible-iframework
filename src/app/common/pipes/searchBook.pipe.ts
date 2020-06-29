import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBook'
})
export class FilterBookPipe implements PipeTransform {

  transform(list: any[], keyWord: string): any {
    // console.log(keyWord);
    const filterFiled = 'name';
    if (!keyWord) {
      return list;
    }
    return list.filter((item) => {
      const fieldValue = item[filterFiled];
      return fieldValue.indexOf(keyWord) >= 0;
    });
  }

}
