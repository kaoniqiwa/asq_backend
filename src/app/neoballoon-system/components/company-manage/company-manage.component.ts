import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';
import { Page, PagedList } from 'src/app/network/model/page_list.model';
import { CompanyManageModel, CompanyManageSearchInfo } from 'src/app/view-model/company-manage.model';
import { TableColumnModel, TableOperateModel } from 'src/app/view-model/table.model';
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
  dataSubject = new BehaviorSubject<CompanyManageModel[]>([]);
  tableOperates: TableOperateModel[] = []


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 2;

  searchInfo: CompanyManageSearchInfo = {
    Name: "",
    AccountName: ''
  }

  constructor(private _business: CompanyManageBusiness, private _router: Router,) { }

  async ngOnInit() {
    // let res = this._business.init()
    // this.dataSubject.next(res.Data)
    // this.page = res.Page
    // let res =await lastValueFrom<PagedList<CompanyManageModel>, any>(this._business.init())
    this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
  }

  pageEvent(pageInfo: PageEvent) {
    // if (this.pageIndex == pageInfo.pageIndex + 1) return;
    // this.pageIndex = pageInfo.pageIndex + 1;
    // this._init();
    console.log(pageInfo)
  }
  register() {
    this._router.navigateByUrl('neoballoon/neoballoon-manage/register-company')
  }
}
