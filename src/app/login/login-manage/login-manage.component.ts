import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login-manage',
  templateUrl: './login-manage.component.html',
  styleUrls: ['./login-manage.component.less']
})
export class LoginManageComponent implements OnInit {

  constructor(private _title: Title) {
    this._title.setTitle('用户登录')
  }

  ngOnInit(): void {
  }

}
