import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../../service/auth.service';

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {

  constructor(
    private datepipe: DatePipe,
    private authservice: AuthService,
  ) { }

  ngOnInit() {
  }

  logOut() {
    this.authservice.logout();
  }

}
