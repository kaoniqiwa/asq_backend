import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {


  myForm = this._fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }
  login() {

  }

}
