import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HwExport } from 'src/app/common/tools/hw-export';
import { CompanyModel } from 'src/app/network/model/company.model';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { CompanyManageModel, CompanyManageSearchInfo } from 'src/app/view-model/company-manage.model';
import { CompanyManageBusiness } from './company-manage.business';

@Component({
  selector: 'app-company-manage',
  templateUrl: './company-manage.component.html',
  styleUrls: ['./company-manage.component.less'],
  providers: [
    CompanyManageBusiness
  ]
})
export class CompanyManageComponent implements OnInit {

  dateFormat: string = 'yyyy-MM-dd';

  beginTime: Date | null = null;
  endTime: Date | null = null;

  dataSource: CompanyManageModel[] = [];

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 9;

  searchInfo: CompanyManageSearchInfo = {
    name: "",
  }

  constructor(private _business: CompanyManageBusiness, private _router: Router, private _toastrService: ToastrService) {
  }

  ngOnInit() {

    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSource = res.data;
    this.page = res.page;
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
        type: 'add'
      }
    })
  }
  editCompany(model: CompanyManageModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/company-operate/', model.id], {
      queryParams: {
        type: 'edit'
      }
    })
  }
  async deleteCompany(model: CompanyManageModel) {
    let res = await this._business.deleteCompany(model.id);
    if (res) {
      this._toastrService.success('删除成功');


      if (this.page?.recordCount == 1) {
        this.pageIndex = Math.max(this.pageIndex - 1, 1);
      }
      this._init();
    }
  }
  doctorManage(model: CompanyManageModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/doctor-manage', model.id])
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
