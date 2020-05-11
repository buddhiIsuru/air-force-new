import {Route, RouterModule, Routes} from '@angular/router';
import {DashbordComponent} from '../view/dashbord/dashbord.component';
import {NgModule} from '@angular/core';
import {MainComponent} from '../view/main/main.component';
import {ToolInComponent} from '../view/tool-in/tool-in.component';
import {ToolOutComponent} from '../view/tool-out/tool-out.component';
import {ToolAvailableComponent} from '../view/tool-available/tool-available.component';
import {ToolAddComponent} from '../view/tool-add/tool-add.component';
import {ToolTransactionComponent} from '../view/tool-transaction/tool-transaction.component';
import {ToolHistoryComponent} from '../view/tool-history/tool-history.component';
import {ToolComponent} from '../view/tool/tool.component';
import {LoginComponent} from '../view/login/login.component';
import {AuthGuard} from '../guards/auth.guard';
import {AddUserComponent} from '../view/add-user/add-user.component';
import {TechnicianComponent} from '../view/technician/technician.component';
import {SettingsComponent} from '../view/settings/settings.component';
import {CategoryComponent} from '../view/category/category.component';
import {DepatmentService} from '../service/depatment.service';
import {DepatmentComponent} from '../view/depatment/depatment.component';
import {ItemComponent} from '../view/item/item.component';
import {AdminComponent} from '../view/admin/admin-dashboard/admin.component';
import {AdminMainComponent} from '../view/admin/admin-main/admin-main.component';
import {AdminTechnicianComponent} from '../view/admin/admin-technician/admin-technician.component';
import {AdminDepatmentComponent} from '../view/admin/admin-depatment/admin-depatment.component';
import {AdminItemComponent} from '../view/admin/admin-item/admin-item.component';
import {AdminTransactionComponent} from '../view/admin/admin-transaction/admin-transaction.component';

const appRoutes: Routes = [
  {
    path: 'main',
    component: MainComponent,
    //canActivate: [AuthGuard],
    children: [
      {path: 'dashboard', component: DashbordComponent},
      {path: 'tool-in', component: ToolInComponent},
      {path: 'tool-out', component: ToolOutComponent},
      {path: 'tool-available', component: ToolAvailableComponent},
      {path: 'tool-add', component: ToolAddComponent},
      {path: 'tool-transaction', component: ToolTransactionComponent},
      {path: 'tool-history', component: ToolHistoryComponent},
      {
        path: 'settings',
        component: SettingsComponent,
        children: [
          {path: 'technician', component: TechnicianComponent},
          {path: 'category', component: CategoryComponent},
          {path: 'department', component: DepatmentComponent},
          {path: 'tool', component: ItemComponent},
        ]
      },
    ]
  },
  {
    path: 'admin-main',
    component: AdminMainComponent,
    //canActivate: [AuthGuard],
    children: [
      {path: 'admin-dashboard', component: AdminComponent},
      {path: 'admin-technician', component: AdminTechnicianComponent},
      {path: 'admin-transaction', component: AdminTransactionComponent},
      {path: 'admin-department', component: AdminDepatmentComponent},
      {path: 'admin-tool', component: AdminItemComponent},
      {path: 'add-user', component: AddUserComponent},
    ]
  },
  // {path: '', pathMatch: 'full', redirectTo: '/main/dashboard'},
  {path: 'login', component: LoginComponent},
  {path: '', pathMatch: 'full', redirectTo: '/login'}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
