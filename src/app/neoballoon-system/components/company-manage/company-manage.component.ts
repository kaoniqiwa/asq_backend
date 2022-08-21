import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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


  // Table
  dataSource: CompanyManageModel[] = [];

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 9;

  searchInfo: CompanyManageSearchInfo = {
    name: "",
  }
  id: string = '';


  constructor(private _business: CompanyManageBusiness, private _router: Router, private _toastrService: ToastrService) {
  }

  ngOnInit() {

    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSource = res.data;
    this.page = res.page
  }
  search() {
    this._init();
  }

  pageEvent(pageInfo: PageEvent) {
    if (this.pageIndex == pageInfo.pageIndex + 1) return;
    this.pageIndex = pageInfo.pageIndex + 1;
    this._init();
  }

  exportASQ() {

  }
  exportASQSE() {

  }
  exportASQSE2() {

  }
  addCompany() {
    this._router.navigate(['/neoballoon/neoballoon-manage/company-operate'], {
      queryParams: {
        cid: '',
        type: 'add'
      }
    })
  }
  editCompany(model: CompanyManageModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/company-operate'], {
      queryParams: {
        cid: model.id,
        type: 'edit'
      }
    })
  }
  async deleteCompany(model: CompanyManageModel) {
    let res = await this._business.deleteCompany(model.id);
    if (res) {
      this._toastrService.success('删除成功');
      this._init();
    }
  }
  doctorManage(model: CompanyManageModel) {
    this._router.navigate(['/neoballoon/neoballoon-manage/doctor-manage'], {
      queryParams: {
        cid: model.id,
      }
    })
  }




}
