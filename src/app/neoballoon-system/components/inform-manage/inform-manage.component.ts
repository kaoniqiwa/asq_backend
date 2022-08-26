import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { InformModel } from 'src/app/network/model/inform.model';
import { InformManageModel } from 'src/app/view-model/inform-manage.model';
import { InformManageBusiness } from './inform-manage.business';

@Component({
  selector: 'app-inform-manage',
  templateUrl: './inform-manage.component.html',
  styleUrls: ['./inform-manage.component.less'],
  providers: [
    InformManageBusiness
  ]
})
export class InformManage implements OnInit {


  messageToShow = "";
  messageToSubmit = "";

  model: InformModel | null = null;



  constructor(private _business: InformManageBusiness, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    this._init();
  }

  private async _init() {
    let res = await this._business.init();
    console.log('inform-manage: ', res);
    if (res) {
      this.messageToShow = res.content;
      this.model = res;
    } else {
      this.messageToShow = '';
    }
  }
  async deleteInform() {
    if (this.model) {
      await this._business.delete(this.model.id);
      this.model = null;
      this._init();
    }
  }
  async submit() {
    if (this.messageToSubmit == '') {
      this._toastrService.warning('请填写字段');
      return;
    }
    let model = new InformModel();
    model.content = this.messageToSubmit;
    let res = await this._business.create(model);
    console.log(res)
    if (res) {
      this.messageToSubmit = "";
      this._init();
    }
  }

}
