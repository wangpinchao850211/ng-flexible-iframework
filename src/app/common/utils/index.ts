import { MenuToTabMapping } from 'src/app/common/domain/tab';
/**
 * 通过url获取TabName
 * @params url 入参
 */
export function getNameByUrl(url: string) {
    let tabName = '';
    for (const key in MenuToTabMapping) {
      if (MenuToTabMapping[key] === url) {
        tabName = key;
        break;
      }
    }
    return tabName;
}
/**
 * 通过TabName获取url
 * @params name 入参
 */
export function getUrlByName(name: string) {
    let tabUrl = '';
    for (const key in MenuToTabMapping) {
      if (key === name) {
        tabUrl = MenuToTabMapping[key];
        break;
      }
    }
    return tabUrl;
}

/**
 * 返回数据类型的字符串
 * @param obj 入参
 * @returns string
*/

export const checkType = (obj: any) => Object.prototype.toString.call(obj).slice(8, -1);

/**
 * 去除对象中的null，undefined，‘’
 * @param obj 入参
*/

export const removeObjectEmpty = (obj: Object): object => {
    let params = {};
    for (const key in obj) {
        if (checkType(obj[key]) === 'Object') {
            params[key] = removeObjectEmpty(obj[key]);
        } else if (checkType(obj[key]) === "Array") {
            params[key] = removeArrayEmpty(obj[key]);
        } else if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
            params[key] = obj[key];
        }
    }
    return params;
}

/**
 * 去除数组中的null，undefined，‘’
 * @param arr 入参
*/

export const removeArrayEmpty = (arr: Array<any>): Array<any> => {
    let array = [];
    arr.forEach((item, index) => {
        if (checkType(item) === 'Array') {
            array[index] = removeArrayEmpty(item)
        } else if (checkType(item) === 'Object') {
            array[index] = removeObjectEmpty(item);
        } else if (item !== null && item !== undefined && item !== '') {
            array[index] = item;
        }
    });
    return array;
}
/**
 * 去除传入参数中的null，undefined，‘’
 * @param realParam 入参
*/

export function removeToEmpty (realParam: any):any {
    let param = null;
    if (checkType(realParam) === "Array") {
        param = removeArrayEmpty(realParam);
    } else if (checkType(realParam) === "Object") {
        param = removeObjectEmpty(realParam);
    } else if (realParam !== null && realParam !== undefined && realParam !== '') {
        param = realParam;
    }
    return param;
}
