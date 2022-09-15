import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { mode } from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/network/model/page_list.model';
import { MemberManageModel, MemberManageSearchInfo } from 'src/app/view-model/member-manage.model';
import { MemberManageBusiness } from './member-manage.business';

@Component({
  selector: 'app-member-manage',
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.less'],
  providers: [
    MemberManageBusiness
  ]
})
export class MemberManageComponent implements OnInit {
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
  pageSize = 9;

  constructor(private _business: MemberManageBusiness, private _router: Router, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSource = res.data;
    this.page = res.page;
    console.log('member manage', res)
  }
  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    console.log(pageInfo)
  }
  addMember() {
    this._router.navigate(['/neoballoon/neoballoon-manage/member-operate'], {
      queryParams: {
        type: 'add'
      }
    })
  }
  editMember(model: MemberManageModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/member-operate', model.id], {
      queryParams: {
        type: 'edit'
      }
    })
  }
  async deleteMember(model: MemberManageModel) {
    let res = await this._business.deletMember(model.id);
    if (res) {
      this._toastrService.success('删除成功');
      if (this.page?.recordCount == 1) {
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
