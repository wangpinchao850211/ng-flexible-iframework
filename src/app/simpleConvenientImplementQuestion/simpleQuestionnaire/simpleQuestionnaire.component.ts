import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-simpleQuestionnaire',
  templateUrl: './simpleQuestionnaire.component.html',
  styleUrls: ['./simpleQuestionnaire.component.scss']
})
export class SimpleQuestionnaireComponent implements OnInit {

  // Download Questionnaire 第三个接口
  inforRes = {
    "status":200,
    "success":true,
    "msg":"successful",
    "response": {
      "downloadHistoryId":0,
      "caseId":54,"caseNbr":
      "22-028",
      "createAt":"2021-12-15T06:35:22.5846158Z",
      "createBy":"T135542.DS.110",
      "versionNbr":"V1.1"
    }
  }
  constructor() { 

  }

  ngOnInit() {
  }

}
