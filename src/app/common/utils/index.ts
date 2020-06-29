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

/**
 * @param sColor 入参 颜色16进制
*/
export function getRgbNum(sColor){ // 真正将16进制转成rgb的方法
    if(sColor.length === 4){
        var sColorNew = "#";
        for(var i=1; i<4; i+=1){  //补全颜色值 例如：#eee,#fff等
            sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
        }
        sColor = sColorNew;
    }
    //处理六位颜色值
    var sColorChange = [];
    for(var i=1; i<7; i+=2){
        //核心代码，通过parseInt将十六进制转为十进制，parseInt只有一个参数时是默认转为十进制的，第二个参数则是指定转为对应进制
        sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
    }
    // console.log(sColorChange);
    return sColorChange;
}

/**
 * @param rgb 入参 颜色rgb值
*/
export function judgeDarkOrLight(rgb) { // 判断深浅的方法
    const r = rgb[0];
    const g = rgb[1];
    const b = rgb[2];
    if(r*0.299 + g*0.578 + b*0.114 >= 192){ //浅色
        // console.log('浅色');
        return '浅色';
    }else{  //深色
        // console.log('深色');
        return '深色';
    }
}
