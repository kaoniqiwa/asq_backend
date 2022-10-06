import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidPhone } from 'src/app/common/tools/tool';
import { FormState } from 'src/app/enum/form-state.enum';
import { Baby } from 'src/app/network/model/baby.model';
import { BabyOperateBusiness } from './baby-operate.business';

@Component({
  selector: 'app-baby-operate',
  templateUrl: './baby-operate.component.html',
  styleUrls: ['./baby-operate.component.less'],
  providers: [
    BabyOperateBusiness
  ]
})
export class BabyOperateComponent implements OnInit {



  doctorModel: Baby | null = null;
  FormState = FormState

  state: FormState = FormState.add;


  id: string = '';
  mid: string = '';


  myForm = this._fb.group({
    name: ['', Validators.required],
    gender: ['男', Validators.required],
    birthday: ['', Validators.required],
    survey: ['', Validators.required],
    premature: ['', Validators.required],
  });


  constructor(private _business: BabyOperateBusiness, private _fb: FormBuilder, private _router: Router, private _activeRoute: ActivatedRoute, private _toastrService: ToastrService) {

    this._activeRoute.queryParams.subscribe(params => {
      let type = params['type'];
      this.mid = params['mid'];
      this.id = params['id'];

      if (type == 'add') {
        this.state = FormState.add;
      } else if (type == 'edit') {
        this.state = FormState.edit;
      }
    })

  }

  ngOnInit(): void {

    if (this.state == FormState.edit) {
      // this.doctorModel = await this._business.get(this.id);
      // if (this.doctorModel) {
      //   this.myForm.patchValue(
      //     {
      //       name: this.doctorModel.name,
      //       level: this.doctorModel.level,
      //       dept: this.doctorModel.dept,
      //       phone: this.doctorModel.phone,
      //     }
      //   )
      // }
    }

  }
  submit() {

  }
  reset() {
    this._router.navigateByUrl(`/neoballoon/neoballoon-manage/baby-manage?mid=${this.mid}`)

  }

}
