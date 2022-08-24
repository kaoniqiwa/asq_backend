import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidIP } from 'src/app/common/tools/tool';
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
    gender: ["男", Validators.required],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    email: ['', [Validators.email]],
    postCode: '',
    surveyLeft: 0
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

    this._activeRoute.queryParams.subscribe((queryParams: Params) => {
      let type = queryParams['type'];
      this.mid = queryParams['mid'];

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
            name: this.memberModel.name,
            gender: this.memberModel.gender,
            phone: this.memberModel.phone,
            address: this.memberModel.address,
            email: this.memberModel.email,
            postCode: this.memberModel.post_code,
            surveyLeft: this.memberModel.survey_left,
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
        model.id = '';
        model.name = this.myForm.value.name ?? "";
        model.gender = this.myForm.value.gender ?? "";
        model.phone = this.myForm.value.phone ?? '';
        model.email = this.myForm.value.email ?? '';
        model.post_code = this.myForm.value.postCode ?? '';
        model.address = this.myForm.value.address ?? '';
        model.survey_left = this.myForm.value.surveyLeft ?? 0;


        let res = await this._business.create(model);
        if (res) {
          console.log(res);
          this._toastrService.success('操作成功');
          this.reset();
        }

      }
      else if (this.state == FormState.edit) {
        if (this.memberModel) {
          this.memberModel.name = this.myForm.value.name ?? "";
          this.memberModel.gender = this.myForm.value.gender ?? "";
          this.memberModel.phone = this.myForm.value.phone ?? '';
          this.memberModel.email = this.myForm.value.email ?? '';
          this.memberModel.post_code = this.myForm.value.postCode ?? '';
          this.memberModel.address = this.myForm.value.address ?? '';
          this.memberModel.survey_left = this.myForm.value.surveyLeft ?? 0;

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
    this._router.navigateByUrl(`/neoballoon/neoballoon-manage/member-list`)
  }

  private _checkForm() {
    if (this.myForm.invalid) {
      if (this.myForm.get('name')?.invalid) {
        this._toastrService.warning('请输入医生姓名');
        return;
      }
      if (this.myForm.get('phone')?.invalid) {
        this._toastrService.warning('请填写手机号');
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
