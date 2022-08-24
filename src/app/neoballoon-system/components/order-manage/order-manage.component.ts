import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/network/model/page_list.model';
import { OrderManageModel, OrderManageSearchInfo } from 'src/app/view-model/order-manage.model';
import { OrderManageBusiness } from './order-manage.business';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.less'],
  providers: [
    OrderManageBusiness
  ]
})
export class OrderManageComponent implements OnInit {


  dataSource: OrderManageModel[] = [];


  searchInfo: OrderManageSearchInfo = {
    phone: "",
  }


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 9;

  constructor(private _business: OrderManageBusiness, private _router: Router, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSource = res.data;
    this.page = res.page;
    console.log(res.data);
  }
  pageEvent(pageInfo: PageEvent) {
    // if (this.pageIndex == pageInfo.pageIndex + 1) return;
    // this.pageIndex = pageInfo.pageIndex + 1;
    // this._init();
    console.log(pageInfo)
  }
}
