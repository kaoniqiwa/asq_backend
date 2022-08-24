import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  mid: string = '';

  constructor(private _business: BabyManageBusiness, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {
    this._activeRoute.queryParams.subscribe(params => {
      this.mid = params['cid']
    })
  }

  ngOnInit(): void {
  }

}
