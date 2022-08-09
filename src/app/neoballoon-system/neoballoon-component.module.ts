import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HowellModule } from 'src/app/common/howell.module';
import { MaterialModule } from 'src/app/material.module';
import { NeoballoonManageComponent } from './components/neoballoon-manage/neoballoon-manage.component';
import { HeaderNavComponent } from './components/header-nav/header-nav.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { AccountStatisticComponent } from './components/account-statistic/account-statistic.component';



@NgModule({
  declarations: [
    NeoballoonManageComponent,
    HeaderNavComponent,
    SideNavComponent,
    AccountStatisticComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HowellModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class NeoballoonComponentModule { }
