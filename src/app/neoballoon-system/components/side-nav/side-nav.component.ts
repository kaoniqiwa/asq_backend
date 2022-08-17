import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { SidenavModel } from 'src/app/view-model/sidenav.model';
import Conf from 'src/assets/json/side-nav.json'


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.less'],
  animations: [
    trigger("growShrink", [
      state(
        'grow', style({
          height: '*'
        })
      ),
      state(
        'shrink', style({
          height: 0
        })
      ),
      transition('grow<=>shrink', [animate(100)])
    ])
  ]
})
export class SideNavComponent implements OnInit {

  state = 'shrink';

  models: Array<SidenavModel> = Conf.data;


  constructor() { }

  ngOnInit(): void {
  }
  toggle(model: SidenavModel) {
    if (model.state == 'shrink') {
      model.state = 'grow';
    } else if (model.state == 'grow') {
      model.state = 'shrink';
    }
  }

}
