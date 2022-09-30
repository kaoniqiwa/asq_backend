import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidIP, ValidPhone } from 'src/app/common/tools/tool';
import { FormState } from 'src/app/enum/form-state.enum';
import { MemberModel } from 'src/app/network/model/member.model';
import { MemberOperateBusiness } from './member-operate.business';

@Component({
  selector: 'app-member-operate',
  templateUrl: './member-operate.component.html',
  styleUrls: ['./member-operate.component.less'],
  providers: [
    MemberOperateBusiness
  ]
})
export class MemberOperateComponent implements OnInit {
  FormState = FormState
  state: FormState = FormState.add;
  mid: string = '';
  // 根据id查询到的model
  memberModel: MemberModel | null = null;

  // 表单数据
  myForm = this._fb.group({
    name: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(ValidPhone)]],
    address: ['', Validators.required],
    email: ['', [Validators.email]],
    postCode: '',
  });

  get title() {
    if (this.state == FormState.add) {
      return '注册会员信息'
    } else {
      return '编辑会员信息'
    }
  }

  constructor(private _business: MemberOperateBusiness, private _fb: FormBuilder,
    private _activeRoute: ActivatedRoute, private _router: Router, private _toastrService: ToastrService) {


    this._activeRoute.params.subscribe((params: Params) => {
      this.mid = params['mid'];
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
      this.memberModel = await this._business.get(this.mid);
      console.log(this.memberModel)
      if (this.memberModel) {
        this.myForm.disable();
        this.myForm.get('surveyLeft')?.enable();
        this.myForm.patchValue(
          {
            name: this.memberModel.Name,
            phone: this.memberModel.Phone,
            address: this.memberModel.Address,
            email: this.memberModel.Email,
            postCode: this.memberModel.PostCode,
          }
        )
      }
    } else {
      this.myForm.enable();
    }

  }

  async submit() {
    if (this._checkForm()) {
      if (this.state == FormState.add) {
        let model = new MemberModel();
        model.Id = '';
        model.Did = "70f1c13a-b1c7-4160-ab70-03cd1593399e";

        model.Name = this.myForm.value.name ?? "";
        model.Phone = this.myForm.value.phone ?? '';
        model.Email = this.myForm.value.email ?? '';
        model.PostCode = this.myForm.value.postCode ?? '';
        model.Address = this.myForm.value.address ?? '';


        let res = await this._business.create(model);
        if (res) {
          console.log(res);
          this._toastrService.success('操作成功');
          this.reset();
        }

      }
      else if (this.state == FormState.edit) {
        if (this.memberModel) {
          this.memberModel.Name = this.myForm.value.name ?? "";
          this.memberModel.Phone = this.myForm.value.phone ?? '';
          this.memberModel.Email = this.myForm.value.email ?? '';
          this.memberModel.PostCode = this.myForm.value.postCode ?? '';
          this.memberModel.Address = this.myForm.value.address ?? '';

          let res = await this._business.update(this.memberModel)
          if (res) {
            this._toastrService.success('编辑成功');
            this.reset();
          }

        }
      }
    }

  }

  reset() {
    this._router.navigateByUrl(`/neoballoon/neoballoon-manage/member-manage`)
  }

  private _checkForm() {
    if (this.myForm.invalid) {
      if (this.myForm.get('name')?.invalid) {
        this._toastrService.warning('请输入会员姓名');
        return;
      }
      if (this.myForm.get('phone')?.invalid) {
        if ('required' in this.myForm.get('phone')?.errors!) {
          this._toastrService.warning('请填写手机号');
        } if ("pattern" in this.myForm.get('phone')?.errors!) {
          this._toastrService.warning('手机号格式不对');
        }

        return;
      }
      if (this.myForm.get('email')?.invalid) {
        this._toastrService.warning('请填写正确的邮箱');
        return;
      }
    }
    return true;
  }

}
