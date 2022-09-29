import { Component, OnInit } from '@angular/core';
import { AccountStatisticBusiness } from './account-statistic.business';

@Component({
  selector: 'app-account-statistic',
  templateUrl: './account-statistic.component.html',
  styleUrls: ['./account-statistic.component.less'],
  providers: [
    AccountStatisticBusiness
  ]
})
export class AccountStatisticComponent implements OnInit {

  companyTotal = 0;
  memberTotal = 0;
  orderTotal = 0;

  constructor(private _business: AccountStatisticBusiness) { }

  ngOnInit(): void {

    this.getMemberList();

    this.getCompanyList();

    this.getOrderList()
  }
  async getCompanyList() {
    let res = await this._business.getCompanyList();
    this.companyTotal = res.Page.TotalRecordCount;
  }
  async getMemberList() {
    let res = await this._business.getMemberList();
    this.memberTotal = res.Page.TotalRecordCount;
  }
  async getOrderList() {
    let res = await this._business.getOrderList();
    this.orderTotal = res.Page.TotalRecordCount;
  }

}
