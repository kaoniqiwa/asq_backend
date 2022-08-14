import { Component, OnInit } from '@angular/core';
import { SidenavModel } from 'src/app/view-model/sidenav.model';
import Conf from 'src/assets/json/side-nav.json'


console.log(Conf);

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less']
})
export class SideNavComponent implements OnInit {

  models: Array<SidenavModel> = Conf.data;


  constructor() { }

  ngOnInit(): void {
  }

}
