import { formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HwExport } from 'src/app/common/tools/hw-export';
import { Company } from 'src/app/network/model/company.model';
import { Page, PagedList } from 'src/app/network/model/page-list.model';
import { CompanyListModel, CompanyListSearchInfo } from 'src/app/view-model/company-manage.model';
import { CompanyListBusiness } from './company-list.business';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.less'],
  providers: [
    CompanyListBusiness
  ]
})
export class CompanyListComponent implements OnInit, OnDestroy {

  dateFormat: string = 'yyyy-MM-dd';

  beginTime: Date | null = null;
  endTime: Date | null = null;

  dataSource: CompanyListModel[] = [];

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 10;

  searchInfo: CompanyListSearchInfo = {
    name: "",
  }

  constructor(private _business: CompanyListBusiness, private _router: Router, private _toastrService: ToastrService) {
  }

  ngOnInit() {

    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSource = res.Data;
    this.page = res.Page;
    // console.log(res.data);
  }
  search() {
    this._init();
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }

  changeBegin(date: Date) {
    this.beginTime = date;
  }
  changeEnd(date: Date) {
    this.endTime = date;

  }
  async exportCompany() {
    if (this.beginTime && this.endTime) {
      let res = await this._business.getExport(this.beginTime, this.endTime);
      let title = this._getTitle();
      let header = ['序号', '机构名称', '机构账号', 'ASQ-3剩余次数', 'ASQ-3总次数', 'ASQ:SE剩余次数', 'ASQ:SE总次数', 'ASQ:SE-2剩余次数', 'ASQ:SE-2总次数',];

      this._business.exportXLSX(title, header, res)
    } else {
      this._toastrService.warning('请选择导出时间');
    }

  }
  exportASQ() {

  }
  exportASQSE() {

  }
  exportASQSE2() {

  }
  addCompany() {
    this._router.navigate(['/neoballoon/neoballoon-manage/company-manage/company-operate'], {
      queryParams: {
        type: 'add',
        cid: ""
      }
    })
  }
  editCompany(model: CompanyListModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/company-manage/company-operate'], {
      queryParams: {
        type: 'edit',
        cid: model.id
      }
    })
  }
  async deleteCompany(model: CompanyListModel) {
    let res = await this._business.deleteCompany([model.id]);
    if (res) {
      this._toastrService.success('删除成功');


      if (this.page?.RecordCount == 1) {
        this.pageIndex = Math.max(this.pageIndex - 1, 1);
      }
      this._init();
    }
  }
  doctorManage(model: CompanyListModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/company-manage/doctor-manage', model.id])
  }

  ngOnDestroy(): void {
    // console.log()
  }
  private _getTitle() {
    if (this.beginTime && this.endTime) {
      let beginTime = formatDate(this.beginTime, 'yyyy年MM月dd日', 'zh-CN');
      let endTime = formatDate(this.endTime, 'yyyy年MM月dd日', 'zh-CN');
      return `${beginTime}-${endTime}注册机构信息`;
    }
    return '';

  }




}
