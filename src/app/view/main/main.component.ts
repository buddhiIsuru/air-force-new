import {Component, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AuthService} from '../../service/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(
    private datepipe: DatePipe,
    private authservice: AuthService,
  ) {
  }

  ngOnInit() {
  }

  logOut() {
    this.authservice.logout();
  }

}
