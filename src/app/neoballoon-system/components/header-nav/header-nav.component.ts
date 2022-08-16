import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/common/service/local-storage.service';
import { SessionStorageService } from 'src/app/common/service/session-storage.service';
import { GlobalStoreService } from 'src/app/common/service/store.service';
import { RoutePath } from 'src/app/enum/route-path.enum';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.less']
})
export class HeaderNavComponent implements OnInit {

  constructor(private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _store: GlobalStoreService,
    private _cookieService: CookieService,
    private _router: Router) { }

  ngOnInit(): void {
  }
  logoOut() {
    this._sessionStorageService.clear();
    this._localStorageService.clear();

    this._router.navigateByUrl(RoutePath.login)
  }

}
