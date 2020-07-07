import { Component, OnInit } from '@angular/core';
import { BookStorageService } from '../bookStorage.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-book-auth',
  templateUrl: './book-auth.component.html',
  styleUrls: ['./book-auth.component.scss']
})
export class BookAuthComponent implements OnInit {

  readBookId: string;
  readBooklevel: string;
  constructor(
    private localAuth: BookStorageService,
    private router: Router,
    private routeInfo: ActivatedRoute
  ) { }

  ngOnInit() {

    this.routeInfo.queryParams.subscribe((params: Params) => {
      // console.log(params);
      this.readBookId = params.id;
      this.readBooklevel = params.id[0];
    });

  }

  AssignPermissions() {
    this.localAuth[`Auth${this.readBooklevel}`].isLogin = true;
    this.router.navigate(['/TeLayout/bookDetail', this.readBookId]);
  }

}
