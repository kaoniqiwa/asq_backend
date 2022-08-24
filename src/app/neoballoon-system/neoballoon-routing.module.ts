import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountStatisticComponent } from "./components/account-statistic/account-statistic.component";
import { BabyManageComponent } from "./components/baby-manage/baby-manage.component";
import { CompanyManageComponent } from "./components/company-manage/company-manage.component";
import { DoctorManageComponent } from "./components/doctor-manage/doctor-manage.component";
import { DoctorOperateComponent } from "./components/doctor-operate/doctor-operate.component";
import { HospitalInfoComponent } from "./components/hospital-info/hospital-info.component";
import { MemberManageComponent } from "./components/member-manage/member-manage.component";
import { MemberOperateComponent } from "./components/member-operate/member-operate.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
import { OrderManageComponent } from "./components/order-manage/order-manage.component";
import { QuestListComponent } from "./components/quest-list/quest-list.component";
import { CompanyOperateComponent } from "./components/company-operate/company-operate.component";
import { SendNotifyComponent } from "./components/send-notify/send-notify.component";
import { NeoballoonComponent } from "./neoballoon.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "neoballoon-manage",
    pathMatch: 'full'
  },
  {
    path: "neoballoon-manage",
    component: NeoballoonManageComponent,
    children: [
      {
        path: "",
        redirectTo: "account-statistic",
        pathMatch: 'full'
      },
      {
        path: "account-statistic",
        component: AccountStatisticComponent
      },
      {
        path: 'company-manage',
        component: CompanyManageComponent
      },
      {
        path: "member-list",
        component: MemberManageComponent
      },
      {
        path: "member-operate",
        component: MemberOperateComponent
      },
      {
        path: "order-manage",
        component: OrderManageComponent
      },

      {
        path: "baby-manage",
        component: BabyManageComponent
      },
      {
        path: "quest-list",
        component: QuestListComponent
      },
      {
        path: "company-operate",
        component: CompanyOperateComponent
      },
      {
        path: "hospital-info",
        component: HospitalInfoComponent
      },
      {
        path: 'doctor-manage',
        component: DoctorManageComponent
      },
      {
        path: 'doctor-operate',
        component: DoctorOperateComponent
      },
      {
        path: 'send-notify',
        component: SendNotifyComponent
      },

    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeoballoonRoutingModule {

}