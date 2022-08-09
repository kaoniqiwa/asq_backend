import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RoutePath } from '../enum/route-path.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  host: {
    "class": "login-content"
  }
})
export class LoginComponent implements OnInit {
  myForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })
  constructor(private _title: Title, private _fb: FormBuilder, private _router: Router) {
    this._title.setTitle('登录')
  }

  ngOnInit(): void {
  }
  login() {
    this._router.navigateByUrl(RoutePath.neoballoon)
  }

}
