import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidPhone } from 'src/app/common/tools/tool';
import { Page } from 'src/app/network/model/page-list.model';
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


  beginTime: Date = new Date();

  endTime: Date = new Date();

  dateFormat: string = 'yyyy-MM-dd';


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
    this.dataSource = res.Data;
    this.page = res.Page;
    console.log('order-manage: ', res);
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
    console.log(pageInfo)
  }
  search() {
    console.log(this.searchInfo.phone);
    if (this.searchInfo.phone == '') {
      this.pageIndex = 1;
      this._init();
      return;
    }
    if (ValidPhone.test(this.searchInfo.phone)) {
      console.log('验证成功');
      this.pageIndex = 1;
      this._init();
    } else {
      console.log('验证失败')
    }
  }

  changeBegin(date: Date) {
    this.beginTime = date;
  }
  changeEnd(date: Date) {
    this.endTime = date;

  }
  async exportOrder() {
    console.log(this.beginTime)
    console.log(this.endTime);

    let res = await this._business.getExport(this.beginTime, this.endTime);

    let title = this._getTitle();
    let header = ['序号', '姓名', '付款手机', '订单金额', '消费类型', '订单日期'];

    this._business.exportXLSX(title, header, res)

  }

  async deleteOrder(model: OrderManageModel) {
    let res = await this._business.deleteOrder(model.id);
    if (res) {
      this._toastrService.success('删除成功');

      if (this.page?.RecordCount == 1) {
        this.pageIndex = Math.max(this.pageIndex - 1, 1);
      }
      this._init();
    }
  }


  private _getTitle() {
    if (this.beginTime && this.endTime) {
      let beginTime = formatDate(this.beginTime, 'yyyy年MM月dd日', 'zh-CN');
      let endTime = formatDate(this.endTime, 'yyyy年MM月dd日', 'zh-CN');
      return `${beginTime}-${endTime} 订单信息`;
    }
    return '';

  }

}
