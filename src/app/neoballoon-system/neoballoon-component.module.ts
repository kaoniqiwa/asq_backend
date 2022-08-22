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
import { MemberManageComponent } from './components/member-manage/member-manage.component';
import { CompanyManageComponent } from './components/company-manage/company-manage.component';
import { CompanyOperateComponent } from './components/company-operate/company-operate.component';
import { HospitalInfoComponent } from './components/hospital-info/hospital-info.component';
import { DoctorManageComponent } from './components/doctor-manage/doctor-manage.component';
import { DoctorOperateComponent } from './components/doctor-operate/doctor-operate.component';
import { MemberOperateComponent } from './components/member-operate/member-operate.component';
import { BabyListComponent } from './components/baby-list/baby-list.component';
import { OrderManageComponent } from './components/order-manage/order-manage.component';
import { SendNotifyComponent } from './components/send-notify/send-notify.component';
import { DoctorOperateToastComponent } from './components/doctor-operate-toast/doctor-operate-toast.component';



@NgModule({
  declarations: [
    NeoballoonManageComponent,
    HeaderNavComponent,
    SideNavComponent,
    AccountStatisticComponent,
    MemberManageComponent,
    CompanyManageComponent,
    CompanyOperateComponent,
    HospitalInfoComponent,
    DoctorManageComponent,
    DoctorOperateComponent,
    MemberOperateComponent,
    BabyListComponent,
    OrderManageComponent,
    SendNotifyComponent,
    DoctorOperateToastComponent
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
