import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { mode } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/network/model/page-list.model';
import { MemberManageModel, MemberManageSearchInfo } from 'src/app/view-model/member-manage.model';
import { MemberListBusiness } from './member-list.business';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.less'],
  providers: [
    MemberListBusiness
  ]
})
export class MemberListComponent implements OnInit {
  dateFormat: string = 'yyyy-MM-dd';

  beginTime: Date | null = null;
  endTime: Date | null = null;

  dataSource: MemberManageModel[] = [];


  searchInfo: MemberManageSearchInfo = {
    name: "",
  }

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 10;

  constructor(private _business: MemberListBusiness, private _router: Router, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSource = res.Data;
    this.page = res.Page;
    console.log('member manage', res)
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }
  addMember() {
    this._router.navigate(['/neoballoon/neoballoon-manage/member-manage/member-operate'], {
      queryParams: {
        type: 'add'
      }
    })
  }
  editMember(model: MemberManageModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/member-manage/member-operate'], {
      queryParams: {
        type: 'edit',
        mid: model.id
      }
    })
  }
  async deleteMember(model: MemberManageModel) {
    let res = await this._business.deletMember(model.id);
    if (res) {
      this._toastrService.success('删除成功');
      if (this.page?.RecordCount == 1) {
        this.pageIndex = Math.max(this.pageIndex - 1, 1);
      }
      this._init();
    }
  }

  babyManage(model: MemberManageModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/baby-manage', model.id])
  }

  changeBegin(date: Date) {
    this.beginTime = date;
  }
  changeEnd(date: Date) {
    this.endTime = date;

  }
  search() {
    this._init();

  }
  exportASQ() {

  }
  exportASQSE() {

  }
  exportASQSE2() {

  }
}
