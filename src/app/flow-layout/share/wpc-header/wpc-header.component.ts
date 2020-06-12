import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/common/services/auth.service';

@Component({
  selector: 'app-wpc-header',
  templateUrl: './wpc-header.component.html',
  styleUrls: ['./wpc-header.component.scss']
})
export class WpcHeaderComponent implements OnInit {

  constructor(
    private auth: AuthService,
  ) { }

  ngOnInit() {
  }

  layout() {
    this.auth.logout();
  }
}
