import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoutePath } from 'src/app/enum/route-path.enum';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.less']
})
export class HeaderNavComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
  }
  logoOut() {
    this._router.navigateByUrl(RoutePath.login)
  }

}
