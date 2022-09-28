import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountStatisticComponent } from "./components/account-statistic/account-statistic.component";
import { BabyManageComponent } from "./components/baby-manage/baby-manage.component";
import { CompanyListComponent } from "./components/company-list/company-list.component";
import { DoctorManageComponent } from "./components/doctor-manage/doctor-manage.component";
import { DoctorOperateComponent } from "./components/doctor-operate/doctor-operate.component";
import { HospitalInfoComponent } from "./components/hospital-info/hospital-info.component";
import { MemberManageComponent } from "./components/member-manage/member-manage.component";
import { MemberOperateComponent } from "./components/member-operate/member-operate.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
import { OrderManageComponent } from "./components/order-manage/order-manage.component";
import { QuestListComponent } from "./components/quest-list/quest-list.component";
import { CompanyOperateComponent } from "./components/company-operate/company-operate.component";
import { InformManage } from "./components/inform-manage/inform-manage.component";
import { NeoballoonComponent } from "./neoballoon.component";
import { BabyOperateComponent } from "./components/baby-operate/baby-operate.component";
import { CompanyManageComponent } from "./components/company-manage/company-manage.component";

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
        component: CompanyManageComponent,
        children: [
          {
            path: "",
            redirectTo: "company-list", pathMatch: 'full'

          },
          {
            path: "company-list",
            component: CompanyListComponent
          }, {
            path: "company-operate/:cid",
            component: CompanyOperateComponent
          }
        ]
      },
      {
        path: "company-operate/:cid",
        component: CompanyOperateComponent
      },
      {
        path: "member-manage",
        component: MemberManageComponent
      },
      {
        path: "member-operate/:mid",
        component: MemberOperateComponent
      },
      {
        path: "baby-manage/:mid",
        component: BabyManageComponent
      },
      {
        path: "baby-operate",
        component: BabyOperateComponent
      },


      {
        path: "order-manage",
        component: OrderManageComponent
      },


      {
        path: "quest-list",
        component: QuestListComponent
      },

      {
        path: "hospital-info",
        component: HospitalInfoComponent
      },
      {
        path: 'doctor-manage/:cid',
        component: DoctorManageComponent
      },
      {
        path: 'doctor-operate/:cid/:did',
        component: DoctorOperateComponent
      },
      {
        path: 'inform-manage',
        component: InformManage
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