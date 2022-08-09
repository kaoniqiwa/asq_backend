import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountStatisticComponent } from "./components/account-statistic/account-statistic.component";
import { NeoballoonManageComponent } from "./components/neoballoon-manage/neoballoon-manage.component";
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
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NeoballoonRoutingModule {

}