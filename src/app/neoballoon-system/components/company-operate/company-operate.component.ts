import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import $ from 'jquery';

import { CompanyModel } from 'src/app/network/model/company.model';
import { CompanyOperateModel } from 'src/app/view-model/company-operate.model';
import { CompanyOperateBusiness } from './company-operate.business';
import { fromEvent } from 'rxjs';
import { FormState } from 'src/app/enum/form-state.enum';


@Component({
  selector: 'app-company-operate',
  templateUrl: './company-operate.component.html',
  styleUrls: ['./company-operate.component.less'],
  providers: [
    CompanyOperateBusiness
  ]
})
export class CompanyOperateComponent implements OnInit, AfterViewInit {

  FormState = FormState

  state: FormState = FormState.add;

  myForm = this._fb.group({
    name: ['', Validators.required],
    accountName: ['', Validators.required],
    accountPass: ['', Validators.required],
    asqTotal: [2000, Validators.required],
    asqLeft: [1000, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSETotal: [2000, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSELeft: [1000, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSE2Total: [2000, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSE2Left: [1000, [Validators.required, Validators.min(0), Validators.max(100000)]],
  });
  showToast = false;

  @ViewChildren('num') nums?: QueryList<ElementRef<HTMLInputElement>>;


  constructor(private _business: CompanyOperateBusiness, private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    // console.log(this._activeRoute)
  }
  ngAfterViewInit(): void {


  }
  onSubmit() {

    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new CompanyModel();
        model.guid = '';
        model.flow = 'addCompany';
        model.name = this.myForm.value.name ?? "";
        model.account_name = this.myForm.value.accountName ?? "";
        model.account_pass = this.myForm.value.accountPass ?? "";
        model.asq_total = this.myForm.value.asqTotal ?? 0;
        model.asq_left = this.myForm.value.asqLeft ?? 0;
        model.asq_se_total = this.myForm.value.asqSETotal ?? 0;
        model.asq_se_left = this.myForm.value.asqSELeft ?? 0;
        model.asq_se_2_total = this.myForm.value.asqSE2Total ?? 0;
        model.asq_se_2_left = this.myForm.value.asqSE2Left ?? 0;

        this._business.create(model)
      }
    }
  }
  onReset() {

  }
  private _checkForm() {
    if (this.myForm.get('name')?.invalid) {
      this._toastrService.warning('请输入机构名称');
      return;
    }

    if (this.myForm.get('accountName')?.invalid) {
      this._toastrService.warning('请输入机构账号');
      return;
    }
    if (this.myForm.get('accountPass')?.invalid) {
      this._toastrService.warning('请输入机构密码');
      return;
    }

    return true;
  }

}
