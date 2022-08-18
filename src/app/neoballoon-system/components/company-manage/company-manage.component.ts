import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { CompanyManageModel, CompanyManageSearchInfo } from 'src/app/view-model/company-manage.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
import { CompanyManageBusiness } from './company-manage.business';
import { CompanyManageConf } from './company-manage.config';

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


  constructor(private _business: CompanyManageBusiness, private _router: Router,) {
  }

  ngOnInit() {

    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSource = res.data;
    this.page = res.page
    console.log('res', res)
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
  register() {
    this._router.navigate(['/neoballoon/neoballoon-manage/register-company'], {
      queryParams: {
        id: this.id
      }
    })
  }
  private _clickEditBtn(row: CompanyManageModel) {
    console.log(row)
    // this.id = row.Id;
  }

}
