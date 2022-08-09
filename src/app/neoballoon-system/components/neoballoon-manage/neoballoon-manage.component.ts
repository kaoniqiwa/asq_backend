import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-neoballoon-manage',
  templateUrl: './neoballoon-manage.component.html',
  styleUrls: ['./neoballoon-manage.component.less']
})
export class NeoballoonManageComponent implements OnInit {


  constructor(private _title: Title) {
    this._title.setTitle('在线筛查管理系统')
  }

  ngOnInit(): void {
  }

}
