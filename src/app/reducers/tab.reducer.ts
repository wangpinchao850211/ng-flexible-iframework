import { createReducer, on } from '@ngrx/store';
import { addTab, removeTab } from '../action/tab.action';
import { MenuTab } from '../common/domain/tab';
import * as _ from 'lodash';

export interface State {
  tab: Array<MenuTab>;
}

export const initTabListState: State = {
  tab: [{
    url: '/flowlayout/rxjs', 
    name: "Rxjs", 
    isSelect: true
  }]
}

 
const _tabReducer = createReducer(initTabListState,
  on(addTab, (state, response) => {
    const resouce = _.cloneDeep(state.tab);

    let flag = false; // 标识是否存在tab
    resouce.forEach(i => {
      if (response.name === i.name) {
        flag = true;
        i.isSelect = true;
      } else {
        i.isSelect = false;
      }
    });

    if (flag) {
      return {tab: [...resouce]}
    } else {
      const resouceData = _.pick(response, ['url', 'name', 'isSelect']);
      return {tab: [...resouce, resouceData]}
    }
    
  }),
  on(removeTab, (state, response) => {
    const resouce = _.cloneDeep(state.tab);
    if (!response.isSelect) {
      const currentResouce = resouce.filter(i => response.name !== i.name);
      return {tab: [...currentResouce]}
    } else {
      const ind = resouce.findIndex(v => response.name === v.name);
      if (ind + 1 === resouce.length){ // 删除最后一个
        resouce.splice(ind, 1);
        resouce[resouce.length - 1].isSelect = true;
      } else {
        resouce.splice(ind, 1);
        resouce[ind].isSelect = true;
      }
      return {tab: [...resouce]};
    }
  }),
);
 
export function tabReducer(state, action) {
  return _tabReducer(state, action);
}
