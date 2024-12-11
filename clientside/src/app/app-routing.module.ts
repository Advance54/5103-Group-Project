import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LogoutpageComponent} from "./loginpage/logoutpage.component"
import {CreateHomeComponent} from "./employee/create-home/create-home.component"
import { LoginHomeComponent } from './employee/login-home/login-home.component';
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { AddEmployeeComponent } from './addemployee/add-employee.component';

const routes: Routes = [
 { path: 'home', component: HomeComponent, title: ' Home' },
 { path: 'employees', component: LogoutpageComponent, title: ' Employees' },
 { path: 'create', component: CreateHomeComponent, title: 'create' },
 { path: '', component: LoginHomeComponent, title: 'login' },
 { path: 'orders', component: OrdersComponent },
 { path: 'menu', component: MenuComponent },
 { path: 'add-employee', component: AddEmployeeComponent },
 { path: '', redirectTo: '/orders', pathMatch: 'full' } // default route
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
