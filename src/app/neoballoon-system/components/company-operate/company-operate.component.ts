
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import $ from 'jquery';

import { CompanyModel } from 'src/app/network/model/company.model';
import { CompanyOperateModel } from 'src/app/view-model/company-operate.model';
import { CompanyOperateBusiness } from './company-operate.business';
import { fromEvent } from 'rxjs';
import { FormState } from 'src/app/enum/form-state.enum';
import { DoctorModel } from 'src/app/network/model/doctor.model';


@Component({
  selector: 'app-company-operate',
  templateUrl: './company-operate.component.html',
  styleUrls: ['./company-operate.component.less'],
  providers: [
    CompanyOperateBusiness
  ]
})
export class CompanyOperateComponent implements OnInit, AfterViewInit {

  /**
   * Company
   */
  FormState = FormState
  state: FormState = FormState.add;
  cid: string = '';
  // 根据id查询到的model
  companyModel: CompanyModel | null = null;

  /**
   *  Doctor
   */
  subState = FormState.add;

  doctorsToBeAdd: DoctorModel[] = [];
  doctorsToBeDelete: DoctorModel[] = [];
  doctorsInModel: DoctorModel[] = [];
  curDoctor: DoctorModel | null = null;

  get doctorsTotal() {
    return [...this.doctorsInModel, ...this.doctorsToBeAdd];
  }



  // 表单数据
  myForm = this._fb.group({
    name: ['', Validators.required],
    accountName: ['', Validators.required],
    accountPass: ['', Validators.required],
    asqTotal: [2000, Validators.required],
    asqLeft: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSETotal: [2000, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSELeft: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSE2Total: [2000, [Validators.required, Validators.min(0), Validators.max(100000)]],
    asqSE2Left: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
  });

  // 添加子账号弹框
  showToast = false;

  get title() {
    if (this.state == FormState.add) {
      return '开通机构账号'
    } else {
      return '编辑机构账号'
    }
  }

  constructor(private _business: CompanyOperateBusiness, private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute, private _router: Router, private _toastrService: ToastrService) {

    this._activeRoute.params.subscribe((params: Params) => {
      this.cid = params['cid'];
    })
    this._activeRoute.queryParams.subscribe((queryParams: Params) => {
      let type = queryParams['type'];

      if (type == 'add') {
        this.state = FormState.add;
      } else if (type == 'edit') {
        this.state = FormState.edit;
      }
    })
  }

  async ngOnInit() {
    if (this.state == FormState.edit) {
      this.companyModel = await this._business.get(this.cid);
      if (this.companyModel) {
        this.doctorsInModel = [...this.companyModel.doctors];
        this.myForm.patchValue(
          {
            name: this.companyModel.name,
            accountName: this.companyModel.username,
            accountPass: this.companyModel.password,
            asqTotal: this.companyModel.asq_total,
            asqLeft: this.companyModel.asq_left,
            asqSETotal: this.companyModel.asq_se_total,
            asqSELeft: this.companyModel.asq_se_left,
            asqSE2Total: this.companyModel.asq_se_2_total,
            asqSE2Left: this.companyModel.asq_se_2_left
          }
        )
      }
    }

  }
  ngAfterViewInit(): void {

  }

  addDoctor() {
    this.showToast = true;
    this.subState = FormState.add;
  }


  editDoctor(doctor: DoctorModel) {
    this.showToast = true;
    this.subState = FormState.edit;
    this.curDoctor = doctor;

  }

  removeDoctor(doctor: DoctorModel) {

    let index = this.doctorsInModel.findIndex(model => model.id == doctor.id);
    if (index != -1) {
      // 删除服务器上现有的doctor
      this.doctorsInModel.splice(index, 1)
      this.doctorsToBeDelete.push(doctor);
    } else {
      // 删除缓存中的 doctor,不会创建该doctor
      let index = this.doctorsToBeAdd.findIndex(model => model.name == doctor.name)
      if (index != -1) {
        this.doctorsToBeAdd.splice(index, 1);
      }
    }
  }
  closeDoctorOperate(data: { data: DoctorModel, type: FormState } | null) {
    this.showToast = false;
    if (data) {
      if (data.type == FormState.add) {
        this.doctorsToBeAdd.push(data.data);
      } else if (data.type == FormState.edit) {
        this.curDoctor = data.data;
      }
    }
  }

  closeToast() {
    this.showToast = false;
  }



  async onSubmit() {

    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new CompanyModel();
        model.id = "";
        model.name = this.myForm.value.name?.trim() ?? "";
        model.username = this.myForm.value.accountName?.trim() ?? "";
        model.password = this.myForm.value.accountPass?.trim() ?? "";
        model.asq_total = this.myForm.value.asqTotal ?? 0;
        model.asq_left = this.myForm.value.asqLeft ?? 0;
        model.asq_se_total = this.myForm.value.asqSETotal ?? 0;
        model.asq_se_left = this.myForm.value.asqSELeft ?? 0;
        model.asq_se_2_total = this.myForm.value.asqSE2Total ?? 0;
        model.asq_se_2_left = this.myForm.value.asqSE2Left ?? 0;

        model.create_time = new Date().toISOString();

        let res = await this._business.create(model);
        if (res) {
          if (this.doctorsToBeAdd.length) {
            let doctors = await this._business.addDoctor(res.id, this.doctorsToBeAdd);

          }
          this._toastrService.success('操作成功');
          this.onReset();

        }
      } else if (this.state == FormState.edit) {
        if (this.companyModel) {
          this.companyModel.name = this.myForm.value.name?.trim() ?? "";
          this.companyModel.username = this.myForm.value.accountName?.trim() ?? "";
          this.companyModel.password = this.myForm.value.accountPass?.trim() ?? "";
          this.companyModel.asq_total = this.myForm.value.asqTotal ?? 0;
          this.companyModel.asq_left = this.myForm.value.asqLeft ?? 0;
          this.companyModel.asq_se_total = this.myForm.value.asqSETotal ?? 0;
          this.companyModel.asq_se_left = this.myForm.value.asqSELeft ?? 0;
          this.companyModel.asq_se_2_total = this.myForm.value.asqSE2Total ?? 0;
          this.companyModel.asq_se_2_left = this.myForm.value.asqSE2Left ?? 0;

          let res = await this._business.update(this.companyModel)
          if (res) {

            if (this.doctorsToBeDelete.length) {
              await this._business.deleteDoctor(res.id, this.doctorsToBeDelete);
            }
            if (this.doctorsToBeAdd.length) {
              await this._business.addDoctor(res.id, this.doctorsToBeAdd)
            }
            if (this.doctorsInModel.length) {
              await this._business.editDoctor(this.doctorsInModel)
            }

            this._toastrService.success('编辑成功');
            this.onReset();
          }

        }
      }
    }
  }

  onReset() {
    this._router.navigate(["/neoballoon/neoballoon-manage/company-manage"])
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
