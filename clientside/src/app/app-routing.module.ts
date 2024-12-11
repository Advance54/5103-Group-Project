import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {LogoutpageComponent} from "./loginpage/logoutpage.component"
import {CreateHomeComponent} from "./employee/create-home/create-home.component"
import { LoginHomeComponent } from './employee/login-home/login-home.component';
<<<<<<< HEAD
import { MenuComponent } from './menu/menu.component';
import { OrdersComponent } from './orders/orders.component';
import { AddEmployeeComponent } from './addemployee/add-employee.component';

=======
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
const routes: Routes = [
 { path: 'home', component: HomeComponent, title: ' Home' },
 { path: 'employees', component: LogoutpageComponent, title: ' Employees' },
 { path: 'create', component: CreateHomeComponent, title: 'create' },
<<<<<<< HEAD
 { path: '', component: LoginHomeComponent, title: 'login' },
 { path: 'orders', component: OrdersComponent },
 { path: 'menu', component: MenuComponent },
 { path: 'add-employee', component: AddEmployeeComponent },
 { path: '', redirectTo: '/orders', pathMatch: 'full' } // default route
=======
 { path: '', component: LoginHomeComponent, title: 'login' }
>>>>>>> a05599c3a481d7126339e25520bf9d17c2949b62
];
@NgModule({
 imports: [RouterModule.forRoot(routes)],
 exports: [RouterModule]
})
export class AppRoutingModule { }
