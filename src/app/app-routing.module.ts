import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RoutePath } from './enum/route-path.enum';
import { LoginComponent } from './login/login2/login.component';
import { LoginManageComponent } from './login/login-manage/login-manage.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: RoutePath.login,
    pathMatch: 'full'
  },
  {
    path: RoutePath.login,
    component: LoginManageComponent
  },
  {
    path: RoutePath.neoballoon,
    loadChildren: () =>
      import('./neoballoon-system/neoballoon.module').then((mod) => mod.NeoballoonModule),
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }