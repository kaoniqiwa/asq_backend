import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RoutePath } from '../enum/route-path.enum';
import { AuthorizationService } from '../network/request/auth/auth-request.service';
import { AxiosError } from 'axios';
import { User } from '../network/model/user.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  host: {
    "class": "login-content"
  }
})
export class LoginComponent implements OnInit {
  formGroup = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private _title: Title, private _fb: FormBuilder, private _authorizationService: AuthorizationService,
    private _toastrService: ToastrService,
    private _router: Router
  ) {
    this._title.setTitle('登录')
  }

  ngOnInit(): void {
  }
  async login() {
    if (this._checkForm()) {
      try {
        let result: any = await this._authorizationService.login(
          this.formGroup.get('username')?.value ?? '',
          this.formGroup.get('password')?.value ?? ''
        );
        if (result instanceof User) {
          this._router.navigateByUrl(RoutePath.neoballoon)

        }

      } catch (e) {
        if (this._isAxiosError(e)) {
          if (e.response?.status == 403 || e.response?.status == 500) {
            this._toastrService.error('账号或密码错误');
          }
        }
      }
    }
  }
  private _checkForm() {
    if (this.formGroup.get('username')?.invalid) {
      this._toastrService.warning('请输入账号');
      return;
    }
    if (this.formGroup.get('password')?.invalid) {
      this._toastrService.warning('请输入密码');
      return;
    }
    return true;
  }
  private _isAxiosError(cadidate: any): cadidate is AxiosError {
    return cadidate.isAxiosError === true;
  }
}
