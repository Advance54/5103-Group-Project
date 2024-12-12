import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LogoutpageComponent } from './loginpage/logoutpage.component';
import { CreateHomeComponent } from './employee/create-home/create-home.component';
import { LoginHomeComponent } from './employee/login-home/login-home.component';

import { ItemStockComponent } from './item/item-stock/item-stock.component';
import { EmployeeSelfEditComponent } from './employee/employee-self-edit/employee-self-edit.component';
const routes: Routes = [
 { path: 'home', component: HomeComponent, title: ' Home' },
 { path: 'employees', component: LogoutpageComponent, title: ' Employees' },
 { path: 'items', component: ItemStockComponent, title: ' Items' },
 { path: 'create', component: CreateHomeComponent, title: 'create' },
 { path: 'profile', component: EmployeeSelfEditComponent, title: 'profile' },
 { path: '', component: LoginHomeComponent, title: 'login' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
