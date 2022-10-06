import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidPhone } from 'src/app/common/tools/tool';
import { FormState } from 'src/app/enum/form-state.enum';
import { Doctor } from 'src/app/network/model/doctor.model';
import { DoctorOperateBusiness } from './doctor-operate.business';

@Component({
  selector: 'app-doctor-operate',
  templateUrl: './doctor-operate.component.html',
  styleUrls: ['./doctor-operate.component.less'],
  providers: [
    DoctorOperateBusiness
  ]
})
export class DoctorOperateComponent implements OnInit {

  doctorModel: Doctor | null = null;
  FormState = FormState

  state: FormState = FormState.add;


  did: string = '';
  cid: string = '';


  myForm = this._fb.group({
    name: ['', Validators.required],
    level: "",
    dept: "",
    phone: ['', Validators.pattern(ValidPhone)]
  });


  constructor(private _business: DoctorOperateBusiness, private _fb: FormBuilder, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {

    this._activeRoute.params.subscribe((params: Params) => {
      this.cid = params['cid'];
      this.did = params['did']
    })

    this._activeRoute.queryParams.subscribe(params => {
      let type = params['type'];
      if (type == 'add') {
        this.state = FormState.add;
      } else if (type == 'edit') {
        this.state = FormState.edit;
      }
    })
  }

  async ngOnInit() {
    if (this.state == FormState.edit) {
      this.doctorModel = await this._business.get(this.did);
      if (this.doctorModel) {
        this.myForm.patchValue(
          {
            name: this.doctorModel.Name,
            level: this.doctorModel.Level,
            dept: this.doctorModel.Dept,
            phone: this.doctorModel.Phone,
          }
        )
      }
    }

  }
  async submit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new Doctor();
        model.Id = '';
        model.Cid = this.cid;
        model.Name = this.myForm.value.name ?? "";
        model.Level = this.myForm.value.level ?? ""
        model.Dept = this.myForm.value.dept ?? "";
        model.Phone = this.myForm.value.phone ?? "";
        model.Flow = 'addDoctor';

        let res = await this._business.create(model);

        this._toastrService.success('操作成功');

        this.reset();
      }
      else if (this.state == FormState.edit) {
        if (this.doctorModel) {
          this.doctorModel.Name = this.myForm.value.name ?? "";
          this.doctorModel.Level = this.myForm.value.level ?? ""
          this.doctorModel.Dept = this.myForm.value.dept ?? "";
          this.doctorModel.Phone = this.myForm.value.phone ?? "";
          this.doctorModel.Flow = 'editDoctor';
          let res = await this._business.update(this.doctorModel);
          if (res) {
            this._toastrService.success('编辑成功');

            this.reset();
          }
        }
      }
    }

  }
  reset() {
    this._router.navigate(["/neoballoon/neoballoon-manage/doctor-manage", this.cid])
  }
  private _checkForm() {
    if (this.myForm.invalid) {
      if (this.myForm.get('name')?.invalid) {
        this._toastrService.warning('请输入医生姓名');
        return;
      }
      if (this.myForm.get('phone')?.invalid) {
        this._toastrService.warning('请填写正确的手机号');
        return;
      }
    }
    return true;
  }

}
