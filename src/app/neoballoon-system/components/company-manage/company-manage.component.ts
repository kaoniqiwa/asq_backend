import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Page } from 'src/app/network/model/page_list.model';
import { CompanyManageModel } from 'src/app/view-model/company-manage.model';
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
  dataSubject = new BehaviorSubject<CompanyManageModel[]>([]);
  columnModel: TableColumnModel[] = [...CompanyManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id
  tableOperates: TableOperateModel[] = []


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;


  constructor(private _business: CompanyManageBusiness, private _router: Router, ) { }

  ngOnInit(): void {
    let res = this._business.init()
    this.dataSubject.next(res.Data)
    this.page = res.Page
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
