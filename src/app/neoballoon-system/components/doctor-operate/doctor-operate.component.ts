import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidPhone } from 'src/app/common/tools/tool';
import { FormState } from 'src/app/enum/form-state.enum';
import { DoctorModel } from 'src/app/network/model/doctor.model';
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

  doctorModel: DoctorModel | null = null;
  FormState = FormState

  state: FormState = FormState.add;


  id: string = '';
  cid: string = '';


  myForm = this._fb.group({
    name: ['', Validators.required],
    level: "",
    dept: "",
    phone: ['', Validators.pattern(ValidPhone)]
  });


  constructor(private _business: DoctorOperateBusiness, private _fb: FormBuilder, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {

    this._activeRoute.queryParams.subscribe(params => {
      let type = params['type'];
      this.cid = params['cid'];
      this.id = params['id'];

      if (type == 'add') {
        this.state = FormState.add;
      } else if (type == 'edit') {
        this.state = FormState.edit;
      }
    })
  }

  async ngOnInit() {
    if (this.state == FormState.edit) {
      this.doctorModel = await this._business.get(this.id);
      if (this.doctorModel) {
        this.myForm.patchValue(
          {
            name: this.doctorModel.name,
            level: this.doctorModel.level,
            dept: this.doctorModel.dept,
            phone: this.doctorModel.phone,
          }
        )
      }
    }

  }
  async submit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new DoctorModel();
        model.id = '';
        model.cid = this.cid;
        model.name = this.myForm.value.name ?? "";
        model.level = this.myForm.value.level ?? ""
        model.dept = this.myForm.value.dept ?? "";
        model.phone = this.myForm.value.phone ?? "";
        model.flow = 'addDoctor';

        let res = await this._business.create(model);

        this._toastrService.success('操作成功');

        this.reset();
      }
      else if (this.state == FormState.edit) {
        if (this.doctorModel) {
          this.doctorModel.name = this.myForm.value.name ?? "";
          this.doctorModel.level = this.myForm.value.level ?? ""
          this.doctorModel.dept = this.myForm.value.dept ?? "";
          this.doctorModel.phone = this.myForm.value.phone ?? "";
          this.doctorModel.flow = 'editDoctor';
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
    this._router.navigateByUrl(`/neoballoon/neoballoon-manage/doctor-manage?cid=${this.cid}`)
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
