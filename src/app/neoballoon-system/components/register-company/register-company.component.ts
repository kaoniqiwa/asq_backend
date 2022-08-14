import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Component({
  selector: 'app-register-company',
  templateUrl: './register-company.component.html',
  styleUrls: ['./register-company.component.less']
})
export class RegisterCompanyComponent implements OnInit {

  constructor(private _activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this._activeRoute)
  }

}
