import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quest-list',
  templateUrl: './quest-list.component.html',
  styleUrls: ['./quest-list.component.less']
})
export class QuestListComponent implements OnInit {


  cid: string = '';
  id: string = '';


  constructor() {
  }

  ngOnInit(): void {
  }

}
