import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BabyManageModel, BabyManageSearchInfo } from 'src/app/view-model/baby-manage.model';
import { BabyManageBusiness } from './baby-manage.business';

@Component({
  selector: 'app-baby-manage',
  templateUrl: './baby-manage.component.html',
  styleUrls: ['./baby-manage.component.less'],
  providers: [
    BabyManageBusiness
  ]
})
export class BabyManageComponent implements OnInit {

  dataSource: BabyManageModel[] = [];

  searchInfo: BabyManageSearchInfo = {
    name: "",
    mid: ""
  }


  constructor(private _business: BabyManageBusiness, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {

    this._activeRoute.params.subscribe((params: Params) => {
      this.searchInfo.mid = params['mid'];
    })
  }

  ngOnInit(): void {
    this._init();

  }

  private async _init() {
    let res = await this._business.init(this.searchInfo)
    this.dataSource = res;
  }
  addBaby() {
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-operate"], {
      queryParams: {
        mid: this.searchInfo.mid,
        type: 'add'
      }
    })
  }
  editDoctor(model: BabyManageModel) {
    this._router.navigate(["/neoballoon/neoballoon-manage/baby-operate"], {
      queryParams: {
        id: model.id,
        mid: this.searchInfo.mid,
        type: 'edit'
      }
    })
  }
  backMember() {
    this._router.navigate(["/neoballoon/neoballoon-manage/member-manage"], {})
  }

}
