import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Page } from 'src/app/network/model/page-list.model';
import { CompanyListSearchInfo } from 'src/app/view-model/company-manage.model';
import { DoctorManageModel, DoctorManageSearchInfo } from 'src/app/view-model/doctor-manage.model';
import { DoctorManageBusiness } from './doctor-manage.business';

@Component({
  selector: 'app-doctor-manage',
  templateUrl: './doctor-manage.component.html',
  styleUrls: ['./doctor-manage.component.less'],
  providers: [
    DoctorManageBusiness
  ]
})
export class DoctorManageComponent implements OnInit {
  dataSource: DoctorManageModel[] = [];

  searchInfo: DoctorManageSearchInfo = {
    name: "",
    cid: ""
  }


  constructor(private _business: DoctorManageBusiness, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {
    this._activeRoute.params.subscribe((params: Params) => {
      this.searchInfo.cid = params['cid'];
    })
  }

  ngOnInit(): void {

    this._init();
  }

  private async _init() {
    let res = await this._business.init(this.searchInfo)

    this.dataSource = res;
  }
  async deleteDoctor(model: DoctorManageModel) {
    let res = await this._business.delete(this.searchInfo.cid, model.id);
    this._toastrService.success('删除成功');
    this._init();
  }
  addDoctor() {
    this._router.navigate(["/neoballoon/neoballoon-manage/company-manage/doctor-operate", this.searchInfo.cid, ""], {
      queryParams: {
        type: 'add'
      }
    })
  }
  editDoctor(model: DoctorManageModel) {
    this._router.navigate(["/neoballoon/neoballoon-manage/company-manage/doctor-operate", this.searchInfo.cid, model.id], {
      queryParams: {
        type: 'edit'
      }
    })
  }
  backCompany() {
    this._router.navigate(["/neoballoon/neoballoon-manage/company-manage"], {})
  }

}

