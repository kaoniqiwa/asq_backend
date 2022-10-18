import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { FormState } from 'src/app/enum/form-state.enum';
import { Doctor } from 'src/app/network/model/doctor.model';

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
  doctor: Doctor | null = null;

  @Output()
  closeDoctorOperate = new EventEmitter<any>()

  get title() {
    if (this.state == FormState.add) {
      return '添加子账号'
    } else {
      return '编辑子账号'
    }
  }


  ValidPhone = /^(((1[3-9][0-9]{1}))+\d{8})$/
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
        name: this.doctor?.Name,
        level: this.doctor?.Level,
        dept: this.doctor?.Dept,
        phone: this.doctor?.Phone
      })
    }
  }
  submit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new Doctor();
        model.Id = '';
        model.Cid = this.cid;
        model.Name = this.myForm.value.name ?? "";
        model.Level = this.myForm.value.level ?? ""
        model.Dept = this.myForm.value.dept ?? "";
        model.Phone = this.myForm.value.phone ?? "";


        this.closeDoctorOperate.emit({
          data: model,
          type: this.state
        });
      }
      else if (this.state == FormState.edit) {

        if (this.doctor) {
          this.doctor.Name = this.myForm.value.name ?? "";
          this.doctor.Level = this.myForm.value.level ?? ""
          this.doctor.Dept = this.myForm.value.dept ?? "";
          this.doctor.Phone = this.myForm.value.phone ?? "";
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
