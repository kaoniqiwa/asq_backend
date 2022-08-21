import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Page } from 'src/app/network/model/page_list.model';

@Component({
  selector: 'app-member-manage',
  templateUrl: './member-manage.component.html',
  styleUrls: ['./member-manage.component.less']
})
export class MemberManageComponent implements OnInit {


  // Paginator
  page: Page | null = null;
  pagerCount: number = 4;
  pageIndex = 1;

  constructor() { }

  ngOnInit(): void {
  }

  pageEvent(pageInfo: PageEvent) {
    // if (this.pageIndex == pageInfo.pageIndex + 1) return;
    // this.pageIndex = pageInfo.pageIndex + 1;
    // this._init();
    console.log(pageInfo)
  }
}