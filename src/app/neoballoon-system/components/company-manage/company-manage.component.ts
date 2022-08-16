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
  tableOperates: TableOperateModel[] = []
  // Table
  dataSubject = new BehaviorSubject<CompanyManageModel[]>([]);
  columnModel: TableColumnModel[] = [...CompanyManageConf]; // 表格列配置详情
  displayedColumns: string[] = this.columnModel.map((model) => model.columnDef); // 表格列 id

  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;
  pageSize = 5;

  searchInfo: CompanyManageSearchInfo = {
    Name: "",
  }
  id: string = '';


  constructor(private _business: CompanyManageBusiness, private _router: Router,) {
    this.tableOperates.push(
      new TableOperateModel(
        'edit',
        ['howell-icon-modification'],
        '编辑',
        this._clickEditBtn.bind(this)
      ),

    );
  }

  ngOnInit() {

    this._init();
  }
  private async _init() {
    let res = await this._business.init(this.searchInfo, this.pageIndex, this.pageSize);
    this.dataSubject.next(res.Data);
    this.page = res.Page
    console.log(res)
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
    this.id = row.Id;
  }

}
