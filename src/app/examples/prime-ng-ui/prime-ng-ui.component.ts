import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-prime-ng-ui',
  templateUrl: './prime-ng-ui.component.html',
  styleUrls: ['./prime-ng-ui.component.scss']
})
export class PrimeNGUiComponent implements OnInit {

  uiComponentList = [
      'checkbox', 'select', 'multiple select', 'tooltip', 'input', 'free input', 'tabs', 'datepicker',
      'auto suggestion', 'chart图', '分页', '轮播图', '进度条/loading', '折叠面板', '树形控件','popUp', '表单校验提示信息系统', 'card','级联选择器', '穿梭框', 'fileUpload', '全局message提示','table' 
  ]
  selectedValue: string = 'val1';

  public list = [
    {
      "id": 1,
      "tooltip": "August 5 2019 – Legal Regulated Offering – Application Security Assessment Report_Tier 1sdjhjfjsoiehhmnbmlvkjskdjg;asgdkjvbkjxbcvkifosfhgjbc.xlsx"
    },
    {
      "id": 2, 
      "tooltip": "MicrosoftTeams-image (1)fileNameToolongToDisplayfileNameToolongToDisplayfileNameToolongToDisplay.png"
    },
    {
      "id": 3, 
      "tooltip": "Symantec-VIP.PDF"
    },
    {
      "id": 4, 
      "tooltip": "Create IT Incident.docx"
    },
    {
      "id": 5, 
      "tooltip": "Evidence-LegalOffering.docx"
    },
    {
      "id": 6, 
      "tooltip": "MicrosoftTeams-image (1)fileNameToolongToDisplayfileNameToolongToDisplayfileNameToolongToDisplay.png"
    }
  ];

  selectedState: any = null;

  states: any[] = [
      {name: 'Arizona', code: 'Arizona'},
      {name: 'California', value: 'California'},
      {name: 'Florida', code: 'Florida'},
      {name: 'Ohio', code: 'Ohio'},
      {name: 'Washington', code: 'Washington'}
  ];

  cities1: any[] = [];
  
  cities2: any[] = [];
  
  city1:any = null;

  city2:any = null;
  constructor() { }
    
  ngOnInit() {
  }

}
