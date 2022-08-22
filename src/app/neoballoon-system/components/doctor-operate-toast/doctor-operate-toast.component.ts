import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import { DoctorModel } from 'src/app/network/model/doctor.model';

@Component({
  selector: 'app-doctor-operate-toast',
  templateUrl: './doctor-operate-toast.component.html',
  styleUrls: ['./doctor-operate-toast.component.less']
})
export class DoctorOperateToastComponent implements OnInit {

  FormState = FormState;

  @Input()
  cid: string = '';

  @Input()
  state: FormState = FormState.add;

  @Input()
  doctor: DoctorModel | null = null;

  @Output()
  closeDoctorOperate = new EventEmitter<any>()

  get title() {
    if (this.state == FormState.add) {
      return '添加子账号'
    } else {
      return '编辑子账号'
    }
  }


  ValidPhone = /^((13[0-9])|(14[5|7])|(15([0-3]|[5-9]))|(18[0,2,3,5-9])|19[0-9])\d{8}$/
  myForm = this._fb.group({
    name: ['', Validators.required],
    level: "",
    dept: "",
    phone: ['', Validators.pattern(this.ValidPhone)]
  });

  constructor(private _fb: FormBuilder, private _toastrService: ToastrService) { }

  ngOnInit(): void {
    if (this.state == FormState.edit) {
      this.myForm.patchValue({
        name: this.doctor?.name,
        level: this.doctor?.level,
        dept: this.doctor?.dept,
        phone: this.doctor?.phone
      })
    }
  }
  submit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new DoctorModel();
        model.id = '';
        model.cid = this.cid;
        model.name = this.myForm.value.name ?? "";
        model.level = this.myForm.value.level ?? ""
        model.dept = this.myForm.value.dept ?? "";
        model.phone = this.myForm.value.phone ?? "";


        this.closeDoctorOperate.emit({
          data: model,
          type: this.state
        });
      }
      else if (this.state == FormState.edit) {

        if (this.doctor) {
          this.doctor.name = this.myForm.value.name ?? "";
          this.doctor.level = this.myForm.value.level ?? ""
          this.doctor.dept = this.myForm.value.dept ?? "";
          this.doctor.phone = this.myForm.value.phone ?? "";
          this.closeDoctorOperate.emit({
            data: this.doctor,
            type: this.state
          });
        }


      }
    }

  }
  reset() {
    this.closeDoctorOperate.emit(null)
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
