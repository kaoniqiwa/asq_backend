import { Component, OnInit } from '@angular/core';
import { SendNotifyBusiness } from './inform-manage.business';

@Component({
  selector: 'app-inform-manage',
  templateUrl: './inform-manage.component.html',
  styleUrls: ['./inform-manage.component.less'],
  providers: [
    SendNotifyBusiness
  ]
})
export class InformManage implements OnInit {

  constructor(private _business: SendNotifyBusiness) { }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init()
    // this.dataSource = res;
  }

}
