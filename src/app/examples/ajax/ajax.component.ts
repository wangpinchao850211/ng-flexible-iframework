import { Component, OnInit } from '@angular/core';

import { AjaxService } from '../../common/ajax/ajax.service'

@Component({
    selector: 'app-ajax',
    templateUrl: './ajax.component.html',
    styleUrls: ['./ajax.component.scss']
})

export class AjaxComponent implements OnInit {
    constructor(private ajaxService: AjaxService) {
    }

    public employeeArray: any;
    public typeWord: any = {
        id: '',
        name: '',
        age: '',
        level: '',
    };

    ngOnInit() {
        // this.getEmps();
    }

    getEmps(): void {
        const param = {  };
        this.ajaxService.doGet(param).subscribe(data => {
            this.employeeArray = data.Employee;
            console.log(this.employeeArray);
        });
    }

    addEmp(): void {
        // const newObject = {...this.typeWord};
        // this.employeeArray.push(newObject);
        console.log(this.typeWord);
        const param = {
            username: "zhangsan",
            password: "123",
            catch: ''
        }
        console.log(param);
        this.ajaxService.doPost('/user/login', param).subscribe(data => {
                console.log(data);
        });
    }

    // updateEmp(): void {
    //     this.ajaxService.doPut("Home/UpdateEmployee", "")
    //         .subscribe(data => console.log(data));
    // }

    delEmp(num): void {
        // for (let index = 0; index < this.employeeArray.length; index++) {
        //     const element = this.employeeArray[index];

        // }
        // const param = { id: id };
        // this.ajaxService.doDelete("Home/DeleteEmployee", param)
        //     .subscribe(data => console.log(data));
        this.employeeArray.splice(num, 1);
    }
}
