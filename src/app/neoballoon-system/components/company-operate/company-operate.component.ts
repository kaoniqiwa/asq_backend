import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';

@Component({
  selector: 'app-company-operate',
  templateUrl: './company-operate.component.html',
  styleUrls: ['./company-operate.component.less']
})
export class CompanyOperateComponent implements OnInit {

  showToast = false;
  constructor(private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this._activeRoute)
  }

}
