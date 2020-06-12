import { Component, OnInit, DoCheck, KeyValueChangeRecord, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { AjaxService } from 'src/app/common/ajax/ajax.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, DoCheck {

  listLayout = {
    selectedValue: 'Card'
  }
  differ: any;
  changeLayout: boolean = true;

  // booksUrl: string = 'assets/json/books.json'; 使用代理进行node请求，请求assets并没有成
  constructor(
    private differs: KeyValueDiffers,
    private http: AjaxService
  ) {
    this.differ = differs.find({}).create();
  }

  ngOnInit() {
    this.http.doGet('/wpcTechSummary/marklist', null).subscribe((res) => {
      console.log(res);
    });
  }

  radioClick(ev: Event) {
    console.log(ev.returnValue);
  }

  ngDoCheck(): void {
    var changes = this.differ.diff(this.listLayout);
    if(changes) {
      // console.log('changes detected');
      changes.forEachChangedItem(r => {
        if (r.currentValue === 'List') {
          this.changeLayout = false;
        } else if (r.currentValue === 'Card'){
          this.changeLayout = true;
        }
      });
      // changes.forEachAddedItem(r => console.log('added ' + r.currentValue));
      // changes.forEachRemovedItem(r => console.log('removed ' + r.currentValue));
    } else {
      // console.log('nothing changed');
    }
  }

}
